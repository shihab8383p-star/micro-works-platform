const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Request withdrawal
// @route   POST /api/withdrawals
exports.requestWithdrawal = async (req, res) => {
  try {
    const { amount, method, accountNumber, accountName } = req.body;

    const user = await User.findById(req.user.id);

    // Validate amount (minimum 500 TK)
    const minWithdrawal = parseInt(process.env.MIN_WITHDRAWAL) || 500;
    if (amount < minWithdrawal) {
      return res.status(400).json({ success: false, message: `Minimum withdrawal amount is ৳${minWithdrawal}` });
    }

    if (amount > user.balance) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Validate payment method
    const validMethods = ['bkash', 'nagad', 'rocket', 'paypal', 'payoneer', 'bank', 'bitcoin', 'ethereum', 'usdt', 'bnb'];
    if (!validMethods.includes(method)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }

    // Calculate fee (2% fee, minimum ৳10)
    const fee = Math.max(amount * 0.02, 10);
    const netAmount = amount - fee;

    // Create withdrawal request
    const withdrawal = await Withdrawal.create({
      user: req.user.id,
      amount,
      method,
      accountNumber,
      accountName,
      fee,
      netAmount,
      status: 'pending'
    });

    // Deduct from user balance (held until processed)
    user.balance -= amount;
    await user.save();

    // Create transaction
    await Transaction.create({
      user: req.user.id,
      type: 'withdrawal',
      amount: -amount,
      balanceBefore: user.balance + amount,
      balanceAfter: user.balance,
      description: `Withdrawal request via ${method}`,
      paymentMethod: method,
      paymentDetails: {
        accountNumber
      },
      status: 'pending'
    });

    res.status(201).json({ success: true, data: withdrawal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my withdrawals
// @route   GET /api/withdrawals/my-withdrawals
exports.getMyWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: withdrawals.length, data: withdrawals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all withdrawals (Admin only)
// @route   GET /api/withdrawals
exports.getAllWithdrawals = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    const withdrawals = await Withdrawal.find({ status })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: withdrawals.length, data: withdrawals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Process withdrawal (Admin only)
// @route   PUT /api/withdrawals/:id/process
exports.processWithdrawal = async (req, res) => {
  try {
    const { status, transactionId, notes } = req.body;
    
    const withdrawal = await Withdrawal.findById(req.params.id).populate('user');

    if (!withdrawal) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    if (withdrawal.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Withdrawal already processed' });
    }

    withdrawal.status = status;
    withdrawal.processedBy = req.user.id;
    withdrawal.processedAt = Date.now();
    withdrawal.transactionId = transactionId;
    withdrawal.notes = notes;

    if (status === 'rejected') {
      // Refund to user balance
      const user = await User.findById(withdrawal.user._id);
      user.balance += withdrawal.amount;
      await user.save();

      // Update transaction
      await Transaction.findOneAndUpdate(
        {
          user: withdrawal.user._id,
          type: 'withdrawal',
          amount: -withdrawal.amount,
          status: 'pending'
        },
        {
          status: 'failed'
        }
      );
    } else if (status === 'completed') {
      // Update transaction
      await Transaction.findOneAndUpdate(
        {
          user: withdrawal.user._id,
          type: 'withdrawal',
          amount: -withdrawal.amount,
          status: 'pending'
        },
        {
          status: 'completed',
          processedAt: Date.now(),
          'paymentDetails.transactionId': transactionId
        }
      );
    }

    await withdrawal.save();

    res.json({ success: true, data: withdrawal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

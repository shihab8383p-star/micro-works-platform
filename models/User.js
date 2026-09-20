const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['worker', 'employer', 'admin'],
    default: 'worker'
  },
  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  balance: {
    type: Number,
    default: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  completedJobs: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  paymentMethods: [{
    method: {
      type: String,
      enum: ['bkash', 'nagad', 'rocket', 'bank', 'bitcoin', 'ethereum', 'usdt', 'binance', 'paypal', 'payoneer']
    },
    accountNumber: String,
    accountName: String,
    walletAddress: String, // For crypto
    network: String, // For crypto (ERC20, TRC20, BEP20, etc.)
    isDefault: Boolean
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  // Referral System
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referralEarnings: {
    type: Number,
    default: 0
  },
  totalReferrals: {
    type: Number,
    default: 0
  },
  // Daily Work Tracking
  lastJobCompletedDate: {
    type: Date
  },
  dailyJobsCompleted: {
    type: Number,
    default: 0
  },
  dailyEarnings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate unique referral code
userSchema.methods.generateReferralCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Check if daily limit needs reset
userSchema.methods.checkDailyReset = function() {
  if (!this.lastJobCompletedDate) return true;
  
  const lastDate = new Date(this.lastJobCompletedDate);
  const today = new Date();
  
  // Reset if it's a new day
  if (lastDate.toDateString() !== today.toDateString()) {
    this.dailyJobsCompleted = 0;
    this.dailyEarnings = 0;
    return true;
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);

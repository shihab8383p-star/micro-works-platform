const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  method: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'bank'],
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: {
    type: Date
  },
  transactionId: {
    type: String
  },
  rejectionReason: {
    type: String
  },
  fee: {
    type: Number,
    default: 0
  },
  netAmount: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

withdrawalSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: String,
    default: '1-3 days'
  },
  requirements: {
    type: String
  },
  skills: [{
    type: String,
    trim: true
  }],
  proofRequired: {
    type: Boolean,
    default: true
  },
  proofInstructions: {
    type: String
  },
  maxWorkers: {
    type: Number,
    default: 1,
    min: 1
  },
  currentWorkers: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed', 'cancelled'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['normal', 'featured', 'urgent'],
    default: 'normal'
  },
  expiresAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  applicants: {
    type: Number,
    default: 0
  },
  approvalRequired: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Auto-complete job fields
  autoComplete: {
    type: Boolean,
    default: false
  },
  taskUrl: {
    type: String
  },
  requiredDuration: {
    type: Number,
    default: 10 // Seconds required on page
  },
  isDailyRepeatable: {
    type: Boolean,
    default: false // Can users do this job daily?
  },
  dayRotation: {
    type: Number,
    min: 1,
    max: 3 // Which day in the 3-day rotation (1, 2, or 3)
  }
}, {
  timestamps: true
});

// Index for better search performance
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ category: 1, status: 1 });
jobSchema.index({ employer: 1 });

module.exports = mongoose.model('Job', jobSchema);

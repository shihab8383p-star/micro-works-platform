const Job = require('../models/Job');
const Category = require('../models/Category');
const Application = require('../models/Application');

// @desc    Get all jobs
// @route   GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true, status: 'active' };

    // Filter by day rotation for auto-complete jobs
    if (req.query.autoComplete === 'true' || req.query.dayRotation) {
      // Calculate current day in 3-day rotation
      const startDate = new Date('2026-01-01'); // Reference start date
      const today = new Date();
      const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const currentDay = (daysSinceStart % 3) + 1; // Returns 1, 2, or 3

      query.dayRotation = currentDay;
      query.autoComplete = true;
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Sort
    let sortBy = { createdAt: -1 };
    if (req.query.sort === 'price_low') sortBy = { price: 1 };
    if (req.query.sort === 'price_high') sortBy = { price: -1 };
    if (req.query.sort === 'popular') sortBy = { views: -1 };

    const jobs = await Job.find(query)
      .populate('category', 'name slug icon')
      .populate('employer', 'name avatar rating')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments(query);

    // Add current day info to response
    const startDate = new Date('2026-01-01');
    const today = new Date();
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const currentDay = (daysSinceStart % 3) + 1;

    res.json({
      success: true,
      data: jobs,
      currentDay: currentDay, // Tell frontend which day it is
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('category', 'name slug icon')
      .populate('employer', 'name avatar rating reviewCount completedJobs');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    // Add employer to req.body
    req.body.employer = req.user.id;

    // Check if employer has enough balance
    if (req.user.balance < req.body.price * req.body.maxWorkers) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance. Please add funds to post this job.'
      });
    }

    const job = await Job.create(req.body);

    // Update category job count
    await Category.findByIdAndUpdate(req.body.category, {
      $inc: { jobCount: 1 }
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership
    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership
    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();

    // Update category job count
    await Category.findByIdAndUpdate(job.category, {
      $inc: { jobCount: -1 }
    });

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get jobs posted by logged in employer
// @route   GET /api/jobs/my-jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auto-complete job after user stays required duration
// @route   POST /api/jobs/:id/auto-complete
exports.autoCompleteJob = async (req, res) => {
  try {
    const User = require('../models/User');
    const Transaction = require('../models/Transaction');
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (!job.autoComplete) {
      return res.status(400).json({ success: false, message: 'This is not an auto-complete job' });
    }

    // Get user
    const user = await User.findById(req.user.id);
    
    // Check if user has done this job today already
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingApplication = await Application.findOne({
      job: job._id,
      worker: user._id,
      status: 'completed',
      updatedAt: { $gte: today }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already completed this job today. Come back tomorrow!'
      });
    }

    // Create or update application
    let application = await Application.findOne({
      job: job._id,
      worker: user._id
    });

    if (!application) {
      application = new Application({
        job: job._id,
        worker: user._id,
        employer: job.employer,
        status: 'accepted' // Auto-accept
      });
    }

    // Mark as completed
    application.status = 'completed';
    application.submittedAt = new Date();
    application.submittedProof = 'Auto-completed: User stayed on page for required duration';
    application.approvedAt = new Date();
    application.rating = 5;
    await application.save();

    // Pay the user
    user.balance += job.price;
    user.totalEarned += job.price;
    user.completedJobs += 1;
    user.dailyJobsCompleted += 1;
    user.dailyEarnings += job.price;
    user.lastJobCompletedDate = new Date();
    await user.save();

    // Pay referrer if exists (10% commission)
    if (user.referredBy) {
      const referrer = await User.findById(user.referredBy);
      if (referrer) {
        const commission = job.price * 0.10; // 10% commission
        referrer.balance += commission;
        referrer.referralEarnings += commission;
        await referrer.save();

        // Create transaction for referrer
        await Transaction.create({
          user: referrer._id,
          type: 'referral_commission',
          amount: commission,
          description: `Referral commission from ${user.name}'s job completion`,
          status: 'completed',
          relatedJob: job._id
        });
      }
    }

    // Create transaction
    await Transaction.create({
      user: user._id,
      type: 'earning',
      amount: job.price,
      description: `Job completed: ${job.title}`,
      status: 'completed',
      relatedJob: job._id
    });

    // Update job stats
    job.currentWorkers += 1;
    job.applicants += 1;
    await job.save();

    res.json({
      success: true,
      message: 'Job completed successfully!',
      earned: job.price,
      newBalance: user.balance,
      data: {
        application,
        transaction: {
          amount: job.price,
          newBalance: user.balance
        }
      }
    });
  } catch (error) {
    console.error('Auto-complete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

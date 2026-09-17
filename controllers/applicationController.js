const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Apply for a job
// @route   POST /api/applications
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Job is not active' });
    }

    if (job.currentWorkers >= job.maxWorkers) {
      return res.status(400).json({ success: false, message: 'Job is full' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      worker: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      job: jobId,
      worker: req.user.id,
      employer: job.employer,
      coverLetter,
      status: job.approvalRequired ? 'pending' : 'accepted'
    });

    // Update job
    job.applicants += 1;
    if (!job.approvalRequired) {
      job.currentWorkers += 1;
    }
    await job.save();

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my applications (worker)
// @route   GET /api/applications/my-applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ worker: req.user.id })
      .populate('job', 'title price category status')
      .populate('employer', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications for my jobs (employer)
// @route   GET /api/applications/job/:jobId
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('worker', 'name avatar rating completedJobs')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Accept/Reject application
// @route   PUT /api/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.employer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = status;
    if (status === 'rejected') {
      application.rejectionReason = req.body.rejectionReason;
    }

    await application.save();

    // Update job current workers
    if (status === 'accepted') {
      await Job.findByIdAndUpdate(application.job._id, {
        $inc: { currentWorkers: 1 }
      });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit work
// @route   PUT /api/applications/:id/submit
exports.submitWork = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.worker.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (application.status !== 'accepted' && application.status !== 'in-progress') {
      return res.status(400).json({ success: false, message: 'Cannot submit work for this application' });
    }

    application.submittedWork = {
      description: req.body.description,
      files: req.body.files || [],
      submittedAt: Date.now()
    };
    application.status = 'submitted';

    await application.save();

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Review and complete application
// @route   PUT /api/applications/:id/review
exports.reviewApplication = async (req, res) => {
  try {
    const { rating, comment, approved } = req.body;
    const application = await Application.findById(req.params.id).populate('job worker');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.employer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (approved) {
      // Complete the application
      application.status = 'completed';
      application.review = {
        rating,
        comment,
        reviewedAt: Date.now()
      };
      application.completedAt = Date.now();

      // Pay the worker
      const worker = await User.findById(application.worker._id);
      const jobPrice = application.job.price;

      worker.balance += jobPrice;
      worker.totalEarned += jobPrice;
      worker.completedJobs += 1;

      // Update rating
      const totalRating = (worker.rating * worker.reviewCount + rating);
      worker.reviewCount += 1;
      worker.rating = totalRating / worker.reviewCount;

      await worker.save();

      // Create transaction
      await Transaction.create({
        user: worker._id,
        type: 'earning',
        amount: jobPrice,
        balanceBefore: worker.balance - jobPrice,
        balanceAfter: worker.balance,
        description: `Payment for job: ${application.job.title}`,
        relatedJob: application.job._id,
        relatedApplication: application._id,
        status: 'completed',
        processedAt: Date.now()
      });

      application.payment = {
        amount: jobPrice,
        status: 'completed',
        paidAt: Date.now()
      };
    } else {
      application.status = 'rejected';
      application.rejectionReason = comment;
    }

    await application.save();

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

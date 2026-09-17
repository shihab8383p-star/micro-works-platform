const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  submitWork,
  reviewApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('worker', 'admin'), applyForJob);
router.get('/my-applications', protect, authorize('worker', 'admin'), getMyApplications);
router.get('/job/:jobId', protect, getJobApplications);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);
router.put('/:id/submit', protect, authorize('worker', 'admin'), submitWork);
router.put('/:id/review', protect, authorize('employer', 'admin'), reviewApplication);

module.exports = router;

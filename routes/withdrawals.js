const express = require('express');
const router = express.Router();
const {
  requestWithdrawal,
  getMyWithdrawals,
  getAllWithdrawals,
  processWithdrawal
} = require('../controllers/withdrawalController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, requestWithdrawal);
router.get('/my-withdrawals', protect, getMyWithdrawals);
router.get('/', protect, authorize('admin'), getAllWithdrawals);
router.put('/:id/process', protect, authorize('admin'), processWithdrawal);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getMyTransactions,
  getAllTransactions
} = require('../controllers/transactionController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getMyTransactions);
router.get('/all', protect, authorize('admin'), getAllTransactions);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllHistory,
  getHistoryByTaskId,
} = require('../controllers/historyController');

// All routes are protected
router.use(protect);

// Routes
router.get('/', getAllHistory);
router.get('/:taskId', getHistoryByTaskId);

module.exports = router;

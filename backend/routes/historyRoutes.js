const express = require('express');
const router = express.Router();
const {
  getAllHistory,
  getHistoryByTaskId,
} = require('../controllers/historyController');

// Routes
router.get('/', getAllHistory);
router.get('/:taskId', getHistoryByTaskId);

module.exports = router;

const History = require('../models/History');

// Get all history records
exports.getAllHistory = async (req, res, next) => {
  try {
    const history = await History.find()
      .populate('taskId', 'title description status')
      .sort({ actionDate: -1 });

    res.status(200).json({
      success: true,
      message: 'History retrieved successfully',
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

// Get history by task ID
exports.getHistoryByTaskId = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const history = await History.find({ taskId })
      .populate('taskId', 'title description status')
      .sort({ actionDate: -1 });

    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No history found for this task',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task history retrieved successfully',
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

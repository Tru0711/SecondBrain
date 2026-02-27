const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    action: {
      type: String,
      enum: ['Created', 'Updated', 'Completed', 'Deleted'],
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    actionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('History', historySchema);

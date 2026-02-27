const Task = require('../models/Task');
const History = require('../models/History');

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const task = new Task({
      title,
      description,
      category,
      priority,
      dueDate,
    });

    const savedTask = await task.save();

    // Create history record
    await History.create({
      taskId: savedTask._id,
      action: 'Created',
      details: `Task "${title}" created`,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks (excluding deleted ones)
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ isDeleted: false }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, priority, status, dueDate, completedAt } = req.body;

    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const oldStatus = task.status;

    // Update task fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (category) task.category = category;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    if (completedAt) task.completedAt = completedAt;

    const updatedTask = await task.save();

    // Create history record
    let action = 'Updated';
    let details = `Task "${title || updatedTask.title}" updated`;

    if (status && status === 'Completed' && oldStatus !== 'Completed') {
      action = 'Completed';
      details = `Task "${title || updatedTask.title}" marked as completed`;
    }

    await History.create({
      taskId: updatedTask._id,
      action,
      details,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    task.isDeleted = true;
    const deletedTask = await task.save();

    // Create history record
    await History.create({
      taskId: deletedTask._id,
      action: 'Deleted',
      details: `Task "${deletedTask.title}" deleted`,
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

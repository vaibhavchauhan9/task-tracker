const Task = require('../models/Task');

// GET /api/tasks
const getAllTasks = async (req, res) => {
  const { status, priority, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  res.json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: tasks,
  });
};

// GET /api/tasks/stats
const getTaskStats = async (req, res) => {
  const [byStatus, byPriority, total, overdue] = await Promise.all([
    Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Task.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]),
    Task.countDocuments(),
    Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $ne: 'done' } }),
  ]);

  res.json({ success: true, data: { total, overdue, byStatus, byPriority } });
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.json({ success: true, data: task });
};

// POST /api/tasks
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, message: 'Task created', data: task });
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  const { _id, createdAt, __v, ...updateData } = req.body;
  const updated = await Task.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  res.json({ success: true, message: 'Task updated', data: updated });
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted' });
};

module.exports = {
  getAllTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

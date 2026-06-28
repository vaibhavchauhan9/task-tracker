const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { taskValidationRules, validate } = require('../middleware/validateTask');

// Sab routes protected hain
router.use(protect);

router.get('/stats', getTaskStats);
router.route('/')
  .get(getAllTasks)
  .post(taskValidationRules, validate, createTask);
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;

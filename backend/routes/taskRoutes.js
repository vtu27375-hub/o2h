const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes mapping as required
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

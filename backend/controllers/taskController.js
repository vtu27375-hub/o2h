const Task = require('../models/Task');

// GET /tasks - Fetch all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['created_at', 'DESC']]
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /tasks - Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!description || typeof description !== 'string' || description.trim().length < 20) {
      return res.status(400).json({ error: 'Description must be at least 20 characters long' });
    }

    const taskStatus = status || 'Pending';
    if (!['Pending', 'In Progress', 'Completed'].includes(taskStatus)) {
      return res.status(400).json({ error: 'Status must be Pending, In Progress, or Completed' });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: taskStatus
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /tasks/:id - Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be Pending, In Progress, or Completed' });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;
    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /tasks/:id - Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

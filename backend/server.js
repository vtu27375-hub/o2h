const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase, sequelize } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Initialize database and start server
async function startServer() {
  try {
    // 1. Establish DB Connection & auto-create schema if it does not exist
    await initializeDatabase();
    
    // 2. Sync database schema (create tables if they do not exist)
    await sequelize.sync();
    console.log('Database tables synchronized.');

    // 3. Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

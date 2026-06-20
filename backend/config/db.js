const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false, // Keep logs clean
  define: {
    timestamps: false // Handled manually
  }
});

async function initializeDatabase() {
  try {
    // Authenticate SQLite connection
    await sequelize.authenticate();
    console.log('SQLite Database connected and verified successfully.');
  } catch (error) {
    console.error('SQLite database connection failed:', error.message);
    throw error;
  }
}

module.exports = { sequelize, initializeDatabase };

import React from 'react';
import { CheckSquare, LayoutDashboard, PlusCircle, Sun, Moon } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setCurrentPage('dashboard')}>
          <CheckSquare className="navbar-logo" />
          <span className="brand-text">TaskFlow</span>
        </div>
        
        <div className="navbar-menu">
          <button 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
            id="nav-dashboard"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-link ${currentPage === 'add-task' ? 'active' : ''}`}
            onClick={() => setCurrentPage('add-task')}
            id="nav-add-task"
          >
            <PlusCircle size={18} />
            <span>Add Task</span>
          </button>

          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            id="theme-toggle-btn"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="app-layout">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      <main className="main-content">
        {currentPage === 'dashboard' ? (
          <Dashboard setCurrentPage={setCurrentPage} />
        ) : (
          <AddTask setCurrentPage={setCurrentPage} />
        )}
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} TaskFlow. Developed as a student project.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

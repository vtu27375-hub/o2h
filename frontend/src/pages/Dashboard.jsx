import React, { useState, useEffect } from 'react';
import { getTasks, updateTaskStatus, deleteTask } from '../services/api';
import { CheckCircle, Trash2, Calendar, ClipboardList, AlertCircle, RefreshCw } from 'lucide-react';

const Dashboard = ({ setCurrentPage }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not retrieve tasks. Please ensure the backend server is running and database is active.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (id) => {
    try {
      await updateTaskStatus(id, 'Completed');
      // Optimistic local state update
      setTasks(prev => 
        prev.map(task => task.id === id ? { ...task, status: 'Completed' } : task)
      );
    } catch (err) {
      console.error('Error completing task:', err);
      alert('Failed to mark task as completed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('Failed to delete the task. Please try again.');
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'badge badge-completed';
      case 'In Progress': return 'badge badge-in-progress';
      case 'Pending':
      default:
        return 'badge badge-pending';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Project Tasks</h1>
          <p className="subtitle">Manage and track your project tasks and milestones</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setCurrentPage('add-task')}
          id="btn-add-new-task"
        >
          + Add New Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-group">
        {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
            id={`filter-btn-${status.toLowerCase().replace(' ', '-')}`}
          >
            {status}
          </button>
        ))}
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={fetchTasks}>
            <RefreshCw size={14} className="icon-spin-hover" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching your tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={64} className="empty-icon" />
          <h3>No Tasks Found</h3>
          <p>
            {filter === 'All' 
              ? "You don't have any tasks right now. Create a new task to get started!" 
              : `There are no tasks with status "${filter}".`}
          </p>
          {filter === 'All' && (
            <button 
              className="btn btn-primary" 
              onClick={() => setCurrentPage('add-task')}
              id="empty-create-btn"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <span className={getStatusBadgeClass(task.status)}>
                  {task.status}
                </span>
                <span className="task-date">
                  <Calendar size={13} />
                  {new Date(task.created_at).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              
              <div className="task-card-actions">
                {task.status !== 'Completed' && (
                  <button 
                    className="btn btn-success btn-icon"
                    onClick={() => handleComplete(task.id)}
                    id={`btn-complete-${task.id}`}
                    title="Mark Completed"
                  >
                    <CheckCircle size={16} />
                    <span>Complete</span>
                  </button>
                )}
                <button 
                  className="btn btn-danger btn-icon"
                  onClick={() => handleDelete(task.id)}
                  id={`btn-delete-${task.id}`}
                  title="Delete Task"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

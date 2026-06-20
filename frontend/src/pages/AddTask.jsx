import React, { useState } from 'react';
import { createTask } from '../services/api';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

const AddTask = ({ setCurrentPage }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) {
      tempErrors.title = 'Title is required.';
    }
    if (!description.trim()) {
      tempErrors.description = 'Description is required.';
    } else if (description.trim().length < 20) {
      tempErrors.description = `Description must be at least 20 characters (current: ${description.trim().length}).`;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setSubmitError('');
      await createTask({
        title: title.trim(),
        description: description.trim(),
        status
      });
      // Redirect to dashboard page
      setCurrentPage('dashboard');
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(err.response?.data?.error || 'Failed to create task. Please verify backend service connectivity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button 
          className="btn-back" 
          onClick={() => setCurrentPage('dashboard')}
          id="btn-back-to-dashboard"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1>Create New Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        {submitError && (
          <div className="error-alert" id="form-error-alert">
            <AlertCircle size={18} />
            <span>{submitError}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="task-title">
            Task Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
            }}
            placeholder="e.g. Build Login Page"
            className={errors.title ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.title && <span className="error-text" id="title-error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
            }}
            placeholder="Describe the task details (minimum 20 characters)..."
            rows="5"
            className={errors.description ? 'input-error' : ''}
            disabled={loading}
          ></textarea>
          {errors.description && <span className="error-text" id="desc-error-msg">{errors.description}</span>}
          <div className="char-counter">
            Character count: <span className={description.trim().length >= 20 ? 'text-success' : 'text-warning'}>{description.trim().length}</span> / 20 minimum
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCurrentPage('dashboard')}
            disabled={loading}
            id="btn-cancel-task"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-icon"
            disabled={loading}
            id="btn-submit-task"
          >
            <Save size={18} />
            <span>{loading ? 'Creating...' : 'Create Task'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;

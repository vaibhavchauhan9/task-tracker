import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const empty = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

const TaskForm = ({ existing, onDone }) => {
  const { addTask, editTask } = useTasks();
  const [form, setForm] = useState(existing || empty);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      if (existing) {
        await editTask(existing._id, form);
      } else {
        await addTask(form);
      }
      setForm(empty);
      setError('');
      if (onDone) onDone();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>{existing ? 'Edit Task' : 'Add New Task'}</h2>
      {error && <p style={styles.error}>{error}</p>}

      <input
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        style={styles.input}
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        style={styles.textarea}
      />

      <div style={styles.row}>
        <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange} style={styles.select}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate ? form.dueDate.slice(0, 10) : ''}
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.btn}>
        {existing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '24px',
    background: '#1e1e2e',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '100%',
  },
  heading: { color: '#cdd6f4', marginBottom: '4px' },
  error: { color: '#f38ba8', fontSize: '14px' },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #45475a',
    background: '#313244',
    color: '#cdd6f4',
    fontSize: '14px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #45475a',
    background: '#313244',
    color: '#cdd6f4',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #45475a',
    background: '#313244',
    color: '#cdd6f4',
    fontSize: '14px',
    flex: 1,
  },
  row: { display: 'flex', gap: '12px' },
  btn: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#7c3aed',
    color: '#fff',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default TaskForm;

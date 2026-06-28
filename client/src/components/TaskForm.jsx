import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const EMPTY = {
  title:       '',
  description: '',
  status:      'todo',
  priority:    'medium',
  dueDate:     '',
};

export default function TaskForm({ existing, onDone }) {
  const { addTask, editTask } = useTasks();
  const [form, setForm]       = useState(existing
    ? { ...existing, dueDate: existing.dueDate?.slice(0, 10) || '' }
    : EMPTY
  );
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null,
      };
      if (existing) {
        await editTask(existing._id, payload);
      } else {
        await addTask(payload);
      }
      setForm(EMPTY);
      if (onDone) onDone();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.modalHeader}>
          <h2 style={s.heading}>{existing ? '✏️ Edit Task' : '➕ New Task'}</h2>
          {onDone && (
            <button onClick={onDone} style={s.closeBtn}>✕ Close</button>
          )}
        </div>

        {error && <div style={s.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <label style={s.label}>Title *</label>
          <input
            name="title"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
            style={s.input}
            disabled={loading}
          />

          <label style={s.label}>Description</label>
          <textarea
            name="description"
            placeholder="Optional details..."
            value={form.description}
            onChange={handleChange}
            style={s.textarea}
            disabled={loading}
          />

          <div style={s.row}>
            <div style={s.col}>
              <label style={s.label}>Status</label>
              <select name="status" value={form.status}
                onChange={handleChange} style={s.select} disabled={loading}>
                <option value="todo">📋 To Do</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="done">✅ Done</option>
              </select>
            </div>
            <div style={s.col}>
              <label style={s.label}>Priority</label>
              <select name="priority" value={form.priority}
                onChange={handleChange} style={s.select} disabled={loading}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          <label style={s.label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            style={s.input}
            disabled={loading}
          />

          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? '⏳ Saving...' : existing ? '✅ Update Task' : '➕ Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px',
  },
  modal: {
    background: '#1e1e2e', borderRadius: '16px', padding: '28px',
    width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    border: '1px solid #313244',
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '20px',
  },
  heading:   { color: '#cdd6f4', margin: 0, fontSize: '20px', fontWeight: 700 },
  closeBtn:  {
    background: '#313244', border: 'none', color: '#cdd6f4',
    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
  },
  errorBox:  {
    background: '#3d1a1a', border: '1px solid #f38ba8', color: '#f38ba8',
    padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  form:     { display: 'flex', flexDirection: 'column', gap: '10px' },
  label:    { color: '#a6adc8', fontSize: '13px', fontWeight: 600, marginBottom: '2px' },
  input:    {
    padding: '10px 14px', borderRadius: '8px', border: '1px solid #45475a',
    background: '#313244', color: '#cdd6f4', fontSize: '14px', outline: 'none',
  },
  textarea: {
    padding: '10px 14px', borderRadius: '8px', border: '1px solid #45475a',
    background: '#313244', color: '#cdd6f4', fontSize: '14px',
    minHeight: '80px', resize: 'vertical', outline: 'none',
  },
  select:   {
    padding: '10px 14px', borderRadius: '8px', border: '1px solid #45475a',
    background: '#313244', color: '#cdd6f4', fontSize: '14px', width: '100%',
  },
  row:       { display: 'flex', gap: '12px' },
  col:       { flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' },
  submitBtn: {
    padding: '12px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    color: '#fff', fontWeight: 700, fontSize: '15px',
    cursor: 'pointer', marginTop: '8px', letterSpacing: '0.5px',
  },
};
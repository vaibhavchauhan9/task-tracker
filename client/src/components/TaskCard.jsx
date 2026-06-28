import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from './TaskForm';

const PRIORITY_COLOR = { low: '#a6e3a1', medium: '#f9e2af', high: '#f38ba8' };
const STATUS_COLOR   = { todo: '#89b4fa', 'in-progress': '#fab387', done: '#a6e3a1' };
const STATUS_LABEL   = { todo: '📋 To Do', 'in-progress': '🔄 In Progress', done: '✅ Done' };

export default function TaskCard({ task }) {
  const { removeTask }      = useTasks();
  const [editing, setEdit]  = useState(false);
  const [deleting, setDel]  = useState(false);

  const handleDelete = async () => {
    setDel(true);
    try { await removeTask(task._id); }
    catch { setDel(false); }
  };

  if (editing) return <TaskForm existing={task} onDone={() => setEdit(false)} />;

  const overdue = task.dueDate &&
    task.status !== 'done' &&
    new Date() > new Date(task.dueDate);

  return (
    <div style={s.card}>
      {/* Top row */}
      <div style={s.topRow}>
        <span style={{ ...s.badge, background: STATUS_COLOR[task.status], color: '#1e1e2e' }}>
          {STATUS_LABEL[task.status]}
        </span>
        <span style={{ ...s.badge, background: PRIORITY_COLOR[task.priority], color: '#1e1e2e' }}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        ...s.title,
        textDecoration: task.status === 'done' ? 'line-through' : 'none',
        opacity: task.status === 'done' ? 0.6 : 1,
      }}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p style={s.desc}>{task.description}</p>
      )}

      {/* Due date */}
      {task.dueDate && (
        <p style={{ ...s.date, color: overdue ? '#f38ba8' : '#6c7086' }}>
          {overdue ? '⚠️ Overdue: ' : '📅 Due: '}
          {new Date(task.dueDate).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
          })}
        </p>
      )}

      {/* Created */}
      <p style={s.created}>
        🕐 {new Date(task.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric',
        })}
      </p>

      {/* Actions */}
      <div style={s.actions}>
        <button onClick={() => setEdit(true)} style={s.editBtn}>✏️ Edit</button>
        <button onClick={handleDelete} style={s.delBtn} disabled={deleting}>
          {deleting ? '⏳' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
}

const s = {
  card: {
    background: '#1e1e2e', borderRadius: '14px', padding: '20px',
    border: '1px solid #313244', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    display: 'flex', flexDirection: 'column', gap: '10px',
    transition: 'transform 0.2s', cursor: 'default',
  },
  topRow:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge:   {
    padding: '3px 10px', borderRadius: '20px',
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px',
  },
  title:   { color: '#cdd6f4', margin: 0, fontSize: '16px', fontWeight: 600, lineHeight: 1.4 },
  desc:    { color: '#a6adc8', fontSize: '13px', margin: 0, lineHeight: 1.5 },
  date:    { fontSize: '12px', margin: 0, fontWeight: 500 },
  created: { color: '#585b70', fontSize: '11px', margin: 0 },
  actions: { display: 'flex', gap: '8px', marginTop: '4px' },
  editBtn: {
    flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #45475a',
    background: '#313244', color: '#cdd6f4', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600,
  },
  delBtn:  {
    flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
    background: '#3d1a1a', color: '#f38ba8', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600,
  },
};
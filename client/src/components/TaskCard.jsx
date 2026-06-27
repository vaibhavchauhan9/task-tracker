import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from './TaskForm';

const priorityColors = { low: '#a6e3a1', medium: '#f9e2af', high: '#f38ba8' };
const statusColors = { todo: '#89b4fa', 'in-progress': '#fab387', done: '#a6e3a1' };

const TaskCard = ({ task }) => {
  const { removeTask } = useTasks();
  const [editing, setEditing] = useState(false);

  if (editing) return <TaskForm existing={task} onDone={() => setEditing(false)} />;

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{ ...styles.badge, background: priorityColors[task.priority] }}>
          {task.priority}
        </span>
      </div>

      {task.description && <p style={styles.desc}>{task.description}</p>}

      <div style={styles.bottomRow}>
        <span style={{ ...styles.badge, background: statusColors[task.status], color: '#1e1e2e' }}>
          {task.status}
        </span>
        {task.dueDate && (
          <span style={styles.date}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div style={styles.actions}>
        <button onClick={() => setEditing(true)} style={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => removeTask(task._id)} style={styles.delBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#1e1e2e',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid #313244',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: '#cdd6f4', margin: 0, fontSize: '16px', fontWeight: '600' },
  desc: { color: '#a6adc8', fontSize: '14px', margin: 0 },
  bottomRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  badge: {
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1e1e2e',
  },
  date: { color: '#6c7086', fontSize: '13px' },
  actions: { display: 'flex', gap: '8px', marginTop: '4px' },
  editBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    background: '#313244',
    color: '#cdd6f4',
    cursor: 'pointer',
    fontSize: '13px',
  },
  delBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    background: '#f38ba8',
    color: '#1e1e2e',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
};

export default TaskCard;

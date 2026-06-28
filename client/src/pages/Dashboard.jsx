import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth }  from '../context/AuthContext';
import TaskCard   from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import TaskForm   from '../components/TaskForm';

export default function Dashboard() {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const { user, logout } = useAuth();
  const [filters,  setFilters]  = useState({ status: '', priority: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  const todo       = tasks.filter(t => t.status === 'todo');
  const inProgress = tasks.filter(t => t.status === 'in-progress');
  const done       = tasks.filter(t => t.status === 'done');

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div>
          <h1 style={s.logo}>🗂️ Task Tracker</h1>
          <p style={s.sub}>👋 Welcome, {user?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setShowForm(true)} style={s.addBtn}>
            ➕ New Task
          </button>
          <button onClick={logout} style={s.logoutBtn}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div style={s.statsBar}>
        <div style={s.stat}>
          <span style={s.statNum}>{tasks.length}</span>
          <span style={s.statLabel}>Total</span>
        </div>
        <div style={s.stat}>
          <span style={{ ...s.statNum, color: '#89b4fa' }}>{todo.length}</span>
          <span style={s.statLabel}>To Do</span>
        </div>
        <div style={s.stat}>
          <span style={{ ...s.statNum, color: '#fab387' }}>{inProgress.length}</span>
          <span style={s.statLabel}>In Progress</span>
        </div>
        <div style={s.stat}>
          <span style={{ ...s.statNum, color: '#a6e3a1' }}>{done.length}</span>
          <span style={s.statLabel}>Done</span>
        </div>
      </div>

      {/* Filters */}
      <div style={s.filterRow}>
        <TaskFilter filters={filters} onChange={setFilters} />
        {(filters.status || filters.priority) && (
          <button
            onClick={() => setFilters({ status: '', priority: '' })}
            style={s.clearBtn}
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* States */}
      {loading && (
        <div style={s.center}>
          <div style={s.spinner} />
          <p style={s.msg}>Loading tasks...</p>
        </div>
      )}

      {!loading && error && (
        <div style={s.errorBox}>
          ⚠️ {error} — Check if backend is running
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div style={s.emptyBox}>
          <p style={{ fontSize: '48px', margin: 0 }}>📭</p>
          <p style={s.msg}>No tasks found. Add your first task!</p>
          <button onClick={() => setShowForm(true)} style={s.addBtn}>
            ➕ Add Task
          </button>
        </div>
      )}

      {/* Task Grid */}
      {!loading && tasks.length > 0 && (
        <div style={s.grid}>
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && <TaskForm onDone={() => setShowForm(false)} />}
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh', background: '#181825',
    padding: '24px', fontFamily: "'Segoe UI', sans-serif",
    maxWidth: '1200px', margin: '0 auto',
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '24px',
    flexWrap: 'wrap', gap: '12px',
  },
  logo:    { color: '#cdd6f4', margin: 0, fontSize: '28px', fontWeight: 800 },
  sub:     { color: '#6c7086', margin: '4px 0 0', fontSize: '14px' },
  addBtn:  {
    padding: '12px 24px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    color: '#fff', fontWeight: 700, fontSize: '14px',
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  logoutBtn: {
    padding: '12px 24px', borderRadius: '10px', border: '1px solid #45475a',
    background: 'transparent', color: '#f38ba8', fontWeight: 700,
    fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  statsBar: {
    display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap',
  },
  stat: {
    flex: 1, minWidth: '80px', background: '#1e1e2e',
    borderRadius: '12px', padding: '16px', textAlign: 'center',
    border: '1px solid #313244',
  },
  statNum:   { display: 'block', fontSize: '28px', fontWeight: 800, color: '#cdd6f4' },
  statLabel: { display: 'block', fontSize: '12px', color: '#6c7086', marginTop: '4px' },
  filterRow: {
    display: 'flex', gap: '10px', alignItems: 'center',
    marginBottom: '24px', flexWrap: 'wrap',
  },
  clearBtn: {
    padding: '8px 14px', borderRadius: '8px', border: '1px solid #f38ba8',
    background: 'transparent', color: '#f38ba8', cursor: 'pointer', fontSize: '13px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  center:   { textAlign: 'center', padding: '60px 0' },
  spinner:  {
    width: '40px', height: '40px', border: '4px solid #313244',
    borderTop: '4px solid #7c3aed', borderRadius: '50%',
    animation: 'spin 1s linear infinite', margin: '0 auto 16px',
  },
  emptyBox: {
    textAlign: 'center', padding: '60px 20px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '12px',
  },
  errorBox: {
    background: '#3d1a1a', border: '1px solid #f38ba8',
    color: '#f38ba8', padding: '16px', borderRadius: '10px',
    textAlign: 'center', marginBottom: '20px',
  },
  msg: { color: '#a6adc8', fontSize: '16px', margin: 0 },
};
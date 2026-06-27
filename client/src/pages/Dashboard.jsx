import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';

const Dashboard = () => {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🗂 Task Tracker</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
          {showForm ? '✕ Close' : '+ New Task'}
        </button>
      </header>

      {showForm && (
        <div style={styles.formWrap}>
          <TaskForm onDone={() => setShowForm(false)} />
        </div>
      )}

      <div style={styles.filterWrap}>
        <TaskFilter filters={filters} onChange={setFilters} />
      </div>

      {loading && <p style={styles.msg}>Loading tasks...</p>}
      {error && <p style={{ ...styles.msg, color: '#f38ba8' }}>{error}</p>}
      {!loading && tasks.length === 0 && (
        <p style={styles.msg}>No tasks found. Add one above!</p>
      )}

      <div style={styles.grid}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#181825',
    padding: '24px',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  logo: { color: '#cdd6f4', margin: 0, fontSize: '24px' },
  addBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    background: '#7c3aed',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  formWrap: { marginBottom: '24px', display: 'flex', justifyContent: 'center' },
  filterWrap: { marginBottom: '20px' },
  msg: { color: '#a6adc8', textAlign: 'center', marginTop: '40px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
};

export default Dashboard;

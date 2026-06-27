const TaskFilter = ({ filters, onChange }) => {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <div style={styles.bar}>
      <select name="status" value={filters.status} onChange={handle} style={styles.select}>
        <option value="">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select name="priority" value={filters.priority} onChange={handle} style={styles.select}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

const styles = {
  bar: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #45475a',
    background: '#313244',
    color: '#cdd6f4',
    fontSize: '14px',
  },
};

export default TaskFilter;

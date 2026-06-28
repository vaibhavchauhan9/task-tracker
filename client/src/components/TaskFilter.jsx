export default function TaskFilter({ filters, onChange }) {
  const set = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <div style={s.bar}>
      <select name="status" value={filters.status} onChange={set} style={s.select}>
        <option value="">All Statuses</option>
        <option value="todo">📋 To Do</option>
        <option value="in-progress">🔄 In Progress</option>
        <option value="done">✅ Done</option>
      </select>

      <select name="priority" value={filters.priority} onChange={set} style={s.select}>
        <option value="">All Priorities</option>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
    </div>
  );
}

const s = {
  bar:    { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  select: {
    padding: '8px 14px', borderRadius: '8px', border: '1px solid #45475a',
    background: '#313244', color: '#cdd6f4', fontSize: '14px', cursor: 'pointer',
  },
};
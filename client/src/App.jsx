import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#cdd6f4', background: '#181825', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '72px' }}>404</h1>
      <p style={{ color: '#a6adc8' }}>Page not found</p>
      <a href="/" style={{ color: '#7c3aed' }}>← Go Home</a>
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Dashboard />} />
          <Route path="*"  element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
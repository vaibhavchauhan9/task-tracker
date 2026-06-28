import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function AuthGate() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#181825',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#cdd6f4', fontSize: '18px' }}>? Loading...</p>
    </div>
  );

  if (!user) return showLogin
    ? <LoginPage onSwitch={() => setShowLogin(false)} />
    : <RegisterPage onSwitch={() => setShowLogin(true)} />;

  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

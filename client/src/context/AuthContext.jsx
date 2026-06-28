import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL || 'https://task-tracker-urfl.onrender.com/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('tt_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    setError('');
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
    localStorage.setItem('tt_user', JSON.stringify(data.data));
    setUser(data.data);
  };

  const login = async (email, password) => {
    setError('');
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem('tt_user', JSON.stringify(data.data));
    setUser(data.data);
  };

  const logout = () => {
    localStorage.removeItem('tt_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [localErr, setLocalErr] = useState('');

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLocalErr('');
    if (form.password.length < 6) {
      setLocalErr('Password min 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      setLocalErr(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.msg ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.logo}>🗂️ Task Tracker</h1>
        <h2 style={s.heading}>Create Account</h2>
        <p style={s.sub}>Start managing your tasks today</p>

        {localErr && <div style={s.error}>{localErr}</div>}

        <form onSubmit={submit} style={s.form}>
          <label style={s.label}>Full Name</label>
          <input
            name="name"
            placeholder="Vaibhav Chaudhary"
            value={form.name}
            onChange={handle}
            style={s.input}
            disabled={loading}
          />

          <label style={s.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handle}
            style={s.input}
            disabled={loading}
          />

          <label style={s.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handle}
            style={s.input}
            disabled={loading}
          />

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? '⏳ Creating...' : '🚀 Create Account'}
          </button>
        </form>

        <p style={s.switchText}>
          Already have an account?{' '}
          <span onClick={onSwitch} style={s.link}>Login here</span>
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#181825',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  card: {
    background: '#1e1e2e',
    borderRadius: '16px',
    padding: '40px 32px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #313244',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  logo: {
    color: '#cdd6f4',
    textAlign: 'center',
    marginBottom: '8px',
    fontSize: '28px',
  },
  heading: {
    color: '#cdd6f4',
    textAlign: 'center',
    margin: '0 0 4px',
    fontSize: '22px',
  },
  sub: {
    color: '#6c7086',
    textAlign: 'center',
    margin: '0 0 24px',
    fontSize: '14px',
  },
  error: {
    background: '#3d1a1a',
    border: '1px solid #f38ba8',
    color: '#f38ba8',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    color: '#a6adc8',
    fontSize: '13px',
    fontWeight: 600,
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #45475a',
    background: '#313244',
    color: '#cdd6f4',
    fontSize: '14px',
    outline: 'none',
  },
  btn: {
    padding: '13px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  switchText: {
    color: '#6c7086',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#7c3aed',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

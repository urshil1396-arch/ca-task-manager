import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useAuth } from './hooks/useAuth';
import './app.css';

export default function App() {
  const { profile, loading, isLoggedIn, user } = useAuth();

  // For MVP, set FY here; you can switch to fyPeriods collection later.
  const fyLabel = 'FY 2025-26';

  if (loading) return <div className="p-6">Loading…</div>;
  if (!isLoggedIn) return <LoginView />;

  return (
    <BrowserRouter>
      <NavBar fyLabel={fyLabel} role={profile?.role} email={user?.email} />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<Tasks me={profile} fyLabel={fyLabel} />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports fyLabel={fyLabel} />} />
        <Route path="/settings" element={<Settings me={profile} />} />
        <Route path="*" element={<div className="p-6">Not Found. <Link to="/tasks" className="underline">Go Home</Link></div>} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginView() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="border rounded-2xl p-6 w-[360px] max-w-[92vw]">
        <div className="text-lg font-semibold mb-2">Login</div>
        <EmailLogin />
      </div>
    </div>
  );
}

import { login } from './lib/firebase';
function EmailLogin() {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [err, setErr] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      await login(email, pass);
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border rounded-lg px-3 py-2" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      {err && <div className="text-sm text-red-600">{err}</div>}
      <button className="w-full px-3 py-2 border rounded-xl bg-gray-900 text-white">Login</button>
    </form>
  );
}

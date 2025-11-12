import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../lib/firebase';
import HomeButton from './HomeButton';

export default function NavBar({ fyLabel, role, email }: { fyLabel?: string; role?: string; email?: string; }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center gap-3">
        <HomeButton />
        <Link to="/tasks" className="font-semibold text-gray-800 px-2">Tasks</Link>
        <Link to="/clients" className="text-gray-700 px-2">Clients</Link>
        <Link to="/calendar" className="text-gray-700 px-2">Calendar</Link>
        <Link to="/reports" className="text-gray-700 px-2">Reports</Link>
        <Link to="/settings" className="text-gray-700 px-2">Settings</Link>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-sm text-gray-600">FY: <b>{fyLabel ?? 'Set FY'}</b></div>
          <div className="text-xs text-gray-500">{role ?? ''} {email ? `· ${email}` : ''}</div>
          <button onClick={() => logout()} className="px-2 py-1 border rounded-lg text-sm hover:bg-gray-50">Logout</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeButton() {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav('/tasks')}
      title="Home (Tasks)"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border hover:bg-gray-50"
    >
      <span className="text-xl leading-none">🏠</span>
      <span className="hidden sm:inline">Home</span>
    </button>
  );
}

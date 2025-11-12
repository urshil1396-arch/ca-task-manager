import React from 'react';
export default function Pill({ children }: { children: React.ReactNode }) {
  return <span className="text-xs border rounded-full px-2 py-0.5">{children}</span>;
}

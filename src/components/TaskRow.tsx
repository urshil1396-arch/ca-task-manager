import React from 'react';
import Pill from './Pill';
import { Task, Client, UserProfile } from '../lib/types';
import { db, doc, updateDoc } from '../lib/firebase';
import { dCounter, isoDateLocal } from '../lib/date';
import { isOwner } from '../lib/guards';

export default function TaskRow({
  t, clients, me
}: {
  t: Task;
  clients: Client[];
  me?: UserProfile | null;
}) {
  const cname = t.clientId
    ? (clients.find(c => c.id === t.clientId)?.displayName || '')
    : (t.clientFreeText || '');

  const dueStr = t.dueDate?.toDate ? isoDateLocal(t.dueDate.toDate()) :
                (t.dueDate ? isoDateLocal(new Date(t.dueDate)) : '');

  const overdueBadge = t.dueDate
    ? dCounter(t.dueDate.toDate ? t.dueDate.toDate() : new Date(t.dueDate))
    : '';

  async function toggleDone(e: React.ChangeEvent<HTMLInputElement>) {
    const ref = doc(db, 'tasks', t.id);
    if (e.target.checked) {
      await updateDoc(ref, { status: 'done', completedAt: new Date() });
    } else {
      await updateDoc(ref, { status: 'todo', completedAt: null });
    }
  }

  async function softDelete() {
    if (!isOwner(me)) return;
    if (!confirm('Soft delete this task?')) return;
    const ref = doc(db, 'tasks', t.id);
    await updateDoc(ref, { softDeletedAt: new Date() });
  }

  return (
    <div className="flex items-center gap-3 border-b py-2">
      <input type="checkbox" checked={t.status === 'done'} onChange={toggleDone} />
      <div className="flex-1">
        <div className="font-medium">{t.title}</div>
        <div className="text-sm text-gray-500">{cname || '-'}</div>
      </div>
      <div className="w-28 text-sm">
        {dueStr && <div>{dueStr}</div>}
        {overdueBadge && <div className="text-xs text-red-600">{overdueBadge}</div>}
      </div>
      <Pill>{t.paidStatus}</Pill>
      {isOwner(me) && (
        <button onClick={softDelete} className="ml-2 text-xs px-2 py-1 border rounded-lg hover:bg-gray-50">Delete</button>
      )}
    </div>
  );
}

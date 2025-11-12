import React, { useMemo, useState } from 'react';
import { db, collection, orderBy, query, where } from '../lib/firebase';
import { useCollection } from '../hooks/useCollection';
import { Task } from '../lib/types';

export default function Reports({ fyLabel }: { fyLabel: string }) {
  const [status, setStatus] = useState<'all'|'todo'|'done'>('all');

  const baseQ = [where('fyLabel', '==', fyLabel), where('softDeletedAt', '==', null)];
  const qTasks = useMemo(()=> {
    const base = collection(db, 'tasks');
    if (status === 'all') return query(base, ...baseQ, orderBy('dueDate', 'asc'));
    return query(base, ...baseQ, where('status', '==', status), orderBy('dueDate', 'asc'));
  }, [fyLabel, status]);

  const { data: tasks } = useCollection<Task>(qTasks);

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Reports (MVP)</div>
        <select className="border rounded-lg px-2 py-1" value={status} onChange={e=>setStatus(e.target.value as any)}>
          <option value="all">All</option>
          <option value="todo">To-do</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="rounded-xl border divide-y">
        {tasks?.length ? tasks.map(t=>(
          <div key={t.id} className="p-3 text-sm">
            <b>{t.title}</b> · {t.paidStatus} · {t.status} · {t.dueDate?.toDate?.().toISOString().slice(0,10) ?? '-'}
          </div>
        )) : <div className="p-3 text-sm text-gray-500">No data.</div>}
      </div>
    </div>
  );
}

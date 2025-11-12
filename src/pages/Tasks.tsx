import React, { useMemo } from 'react';
import { db, collection, orderBy, query, where } from '../lib/firebase';
import { useCollection } from '../hooks/useCollection';
import { Client, Task, UserProfile } from '../lib/types';
import TaskRow from '../components/TaskRow';
import AddTaskDialog from '../components/AddTaskDialog';

export default function Tasks({ me, fyLabel }: { me?: UserProfile | null; fyLabel: string }) {
  const tasksQ = useMemo(() => query(
    collection(db, 'tasks'),
    where('fyLabel', '==', fyLabel),
    where('softDeletedAt', '==', null),
    orderBy('dueDate', 'asc')
  ), [fyLabel]);

  const { data: tasks } = useCollection<Task>(tasksQ);

  const clientsQ = useMemo(() => query(collection(db, 'clients'), orderBy('displayName')), []);
  const { data: clients } = useCollection<Client>(clientsQ);

  const mine = tasks?.filter(t => t.assignedToUserId === me?.id) ?? [];
  const others = tasks?.filter(t => t.assignedToUserId !== me?.id) ?? [];

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Tasks</div>
        <div className="flex gap-2">
          <AddTaskDialog fyLabel={fyLabel} onDone={()=>{}} />
        </div>
      </div>

      <div className="mb-2 text-sm text-gray-600">Assigned to Me</div>
      <div className="rounded-xl border">
        {mine.length ? mine.map(t => <TaskRow key={t.id} t={t} clients={clients} me={me} />)
          : <div className="p-3 text-sm text-gray-500">No tasks assigned to you.</div>}
      </div>

      <div className="mt-5 mb-2 text-sm text-gray-600">All Tasks</div>
      <div className="rounded-xl border">
        {others.length ? others.map(t => <TaskRow key={t.id} t={t} clients={clients} me={me} />)
          : <div className="p-3 text-sm text-gray-500">No other tasks.</div>}
      </div>
    </div>
  );
}

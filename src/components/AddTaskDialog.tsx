import React, { useEffect, useMemo, useState } from 'react';
import { db, addDoc, collection, query, orderBy } from '../lib/firebase';
import { useCollection } from '../hooks/useCollection';
import { Client } from '../lib/types';

export default function AddTaskDialog({ fyLabel, onDone }: { fyLabel: string; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState<string>('');
  const [oneOff, setOneOff] = useState('');
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [paid, setPaid] = useState<'paid'|'unpaid'|'na'>('na');

  const clientsQ = useMemo(()=> query(collection(db, 'clients'), orderBy('displayName')), []);
  const { data: clients } = useCollection<Client>(clientsQ);

  const libQ = useMemo(()=> query(collection(db, 'taskNameLibrary')), []);
  const { data: lib } = useCollection<{ id:string, displayTitle:string }>(libQ);

  function reset() {
    setClientId(''); setOneOff(''); setTitle(''); setDue(''); setPaid('na');
  }

  async function upsertTitle(t: string) {
    const norm = t.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!norm) return;
    // naive upsert (client-side); in prod, use CF or query by norm
    await addDoc(collection(db, 'taskNameLibrary'), { normTitle: norm, displayTitle: t.trim() });
  }

  async function save() {
    if (!title.trim()) return;
    if (!clientId && !oneOff.trim()) return;

    await addDoc(collection(db, 'tasks'), {
      clientId: clientId || null,
      clientFreeText: clientId ? '' : oneOff.trim(),
      title: title.trim(),
      dueDate: due ? new Date(due) : null,
      status: 'todo',
      paidStatus: paid,
      priority: 'P2',
      risk: false,
      assignedToUserId: null,
      createdByUserId: null,
      completedAt: null,
      completedByUserId: null,
      source: 'manual',
      fyLabel,
      softDeletedAt: null,
      genKey: null
    });
    await upsertTitle(title);
    reset();
    setOpen(false);
    onDone();
  }

  useEffect(()=>{ if (clientId) setOneOff(''); }, [clientId]);

  return (
    <>
      <button className="px-3 py-2 border rounded-xl hover:bg-gray-50" onClick={() => setOpen(true)}>Add Task</button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-4 w-[460px] max-w-[95vw]">
            <div className="text-lg font-semibold mb-3">Add Task</div>
            <div className="space-y-3">
              <label className="block">
                <div className="text-sm text-gray-600">Client</div>
                <select value={clientId} onChange={e=>setClientId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                  <option value="">— One-off —</option>
                  {clients?.map(c => <option key={c.id} value={c.id}>{c.displayName}</option>)}
                </select>
              </label>
              {!clientId && (
                <input className="w-full border rounded-lg px-3 py-2" placeholder="One-off client name" value={oneOff} onChange={e=>setOneOff(e.target.value)} />
              )}
              <label className="block">
                <div className="text-sm text-gray-600">Task Title</div>
                <input list="taskTitles" className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., GSTR-3B Filing" value={title} onChange={e=>setTitle(e.target.value)} />
                <datalist id="taskTitles">
                  {lib?.map(x => <option key={x.id} value={(x as any).displayTitle} />)}
                </datalist>
              </label>
              <label className="block">
                <div className="text-sm text-gray-600">Due Date</div>
                <input type="date" className="w-full border rounded-lg px-3 py-2" value={due} onChange={e=>setDue(e.target.value)} />
              </label>
              <label className="block">
                <div className="text-sm text-gray-600">Paid/Unpaid</div>
                <select value={paid} onChange={e=>setPaid(e.target.value as any)} className="w-full border rounded-lg px-3 py-2">
                  <option value="na">na</option>
                  <option value="paid">paid</option>
                  <option value="unpaid">unpaid</option>
                </select>
              </label>
              <div className="flex justify-end gap-2">
                <button onClick={()=>setOpen(false)} className="px-3 py-2 border rounded-xl">Cancel</button>
                <button onClick={save} className="px-3 py-2 border rounded-xl bg-gray-900 text-white">Save Task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

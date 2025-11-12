import React, { useState } from 'react';
import { db, addDoc, collection } from '../lib/firebase';

export default function AddClientDialog({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [svc, setSvc] = useState({
    Accounting: false, GST_Monthly: false, GST_Quarterly: false,
    Income_Tax: false, TDS: false, MCA: false
  });

  async function save() {
    if (!name.trim()) return;
    await addDoc(collection(db, 'clients'), {
      displayName: name.trim(),
      isOneOff: false,
      services: svc,
      tags: []
    });
    setName('');
    setSvc({ Accounting:false, GST_Monthly:false, GST_Quarterly:false, Income_Tax:false, TDS:false, MCA:false });
    setOpen(false);
    onDone();
  }

  return (
    <>
      <button className="px-3 py-2 border rounded-xl hover:bg-gray-50" onClick={() => setOpen(true)}>Add Client</button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-4 w-[420px] max-w-[95vw]">
            <div className="text-lg font-semibold mb-3">Add Client</div>
            <div className="space-y-3">
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Client Name" value={name} onChange={e=>setName(e.target.value)} />
              <div className="text-sm text-gray-600">Services</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(svc).map(k=>(
                  <label key={k} className="flex items-center gap-2">
                    <input type="checkbox" checked={(svc as any)[k]} onChange={e=>setSvc(s=>({...s,[k]:e.target.checked}))}/>
                    <span>{k.replace('_',' ')}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={()=>setOpen(false)} className="px-3 py-2 border rounded-xl">Cancel</button>
                <button onClick={save} className="px-3 py-2 border rounded-xl bg-gray-900 text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

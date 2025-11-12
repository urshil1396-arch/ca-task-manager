import React, { useMemo } from 'react';
import { db, collection, orderBy, query } from '../lib/firebase';
import { useCollection } from '../hooks/useCollection';
import { Client } from '../lib/types';
import AddClientDialog from '../components/AddClientDialog';

export default function Clients() {
  const qClients = useMemo(()=> query(collection(db, 'clients'), orderBy('displayName')), []);
  const { data: clients } = useCollection<Client>(qClients);

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Clients</div>
        <AddClientDialog onDone={()=>{}}/>
      </div>
      <div className="rounded-xl border divide-y">
        {clients?.length ? clients.map(c=>(
          <div key={c.id} className="p-3">
            <div className="font-medium">{c.displayName}</div>
            <div className="text-sm text-gray-500">
              Services: {Object.entries(c.services||{}).filter(([,v])=>v).map(([k])=>k.replace('_',' ')).join(', ') || '-'}
            </div>
          </div>
        )) : <div className="p-3 text-sm text-gray-500">No clients yet.</div>}
      </div>
    </div>
  );
}

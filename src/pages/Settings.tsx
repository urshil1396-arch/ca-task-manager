import React from 'react';
import { isOwner } from '../lib/guards';
import { UserProfile } from '../lib/types';

export default function Settings({ me }: { me?: UserProfile | null }) {
  const owner = isOwner(me);

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="text-lg font-semibold mb-3">Settings</div>
      {!owner && <div className="text-sm text-red-600 mb-3">Owner-only actions. You have limited access.</div>}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="border rounded-xl p-3">
          <div className="font-medium mb-1">Calendar Rules</div>
          <div className="text-sm text-gray-600">Owner can add/toggle RRULEs (MVP: predefined in docs).</div>
        </div>
        <div className="border rounded-xl p-3">
          <div className="font-medium mb-1">Users</div>
          <div className="text-sm text-gray-600">Owner can invite/disable employees via Firebase Console.</div>
        </div>
        <div className="border rounded-xl p-3">
          <div className="font-medium mb-1">FY Rollover</div>
          <div className="text-sm text-gray-600">Planned in phase-2; rules prevent accidental edits across FY.</div>
        </div>
      </div>
    </div>
  );
}

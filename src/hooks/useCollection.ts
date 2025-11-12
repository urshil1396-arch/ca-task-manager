import { useEffect, useState } from 'react';
import { onSnapshot, query as q } from '../lib/firebase';

export function useCollection<T>(query: any) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!query) return;
    const unsub = onSnapshot(query, (snap: any) => {
      const arr: any[] = [];
      snap.forEach((d: any) => arr.push({ id: d.id, ...d.data() }));
      setData(arr);
      setLoading(false);
    });
    return () => unsub();
  }, [query]);
  return { data, loading };
}

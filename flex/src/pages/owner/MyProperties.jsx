// src/pages/owner/MyProperties.jsx
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function MyProperties() {
  const [data, setData] = useState({ data: [], meta: {} });
  useEffect(() => { api.get('/owner/properties').then(r => setData(r.data)); }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <a href="/owner/submit" className="px-4 py-2 rounded-lg bg-black text-white">New Property</a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {data.data?.map(p => (
          <div key={p.id} className="rounded-2xl overflow-hidden bg-white shadow">
            <img src={p.images?.[0]?.url || '/Images/gallery1.jpg'} alt={p.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.city?.name}</div>
              <div className="mt-2 text-xs inline-block px-2 py-1 rounded bg-gray-100">{p.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

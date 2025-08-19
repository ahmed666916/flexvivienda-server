// src/pages/admin/Properties.jsx
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Properties() {
  const [status,setStatus] = useState('pending_review');
  const [data,setData] = useState({ data:[] });
  useEffect(()=>{ api.get('/admin/properties',{ params:{ status } }).then(r=>setData(r.data)); },[status]);

  const publish = async (id) => {
    await api.post(`/admin/properties/${id}/publish`);
    setData(prev => ({...prev, data: prev.data.map(p=>p.id===id?{...p,status:'published'}:p)}));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <div className="flex gap-2">
          {['pending_review','published','draft','rejected'].map(s=>(
            <button key={s} onClick={()=>setStatus(s)} className={`px-3 py-1 rounded-full border ${status===s?'bg-black text-white':''}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm">
            <tr><th className="p-3">Property</th><th>Owner</th><th>City</th><th>Status</th><th className="p-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {data.data?.map(p=>(
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images?.[0]?.url || '/Images/gallery1.jpg'} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td>{p.owner?.user?.name ?? '—'}</td>
                <td>{p.city?.name ?? '—'}</td>
                <td><span className="text-xs px-2 py-1 rounded bg-gray-100">{p.status}</span></td>
                <td className="p-3 text-right">
                  {p.status!=='published' && (
                    <button onClick={()=>publish(p.id)} className="px-3 py-1 rounded-lg bg-black text-white">Publish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

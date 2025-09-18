import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PendingProperties(){
  const [rows, setRows] = useState([]);
  const load = () => api.get("/admin/properties/pending").then(r=>setRows(r.data.data));
  useEffect(load,[]);
  const act = (id, action) => api.post(`/admin/properties/${id}/${action}`).then(load);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Pending Properties</h1>
      <div className="space-y-3">
        {rows.map(p=>(
          <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.city}, {p.country} • owner: {p.owner?.name}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>act(p.id,'reject')}  className="px-3 py-1 rounded-lg bg-gray-100">Reject</button>
              <button onClick={()=>act(p.id,'approve')} className="px-3 py-1 rounded-lg bg-gray-900 text-white">Approve</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

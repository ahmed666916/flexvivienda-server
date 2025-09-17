import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PendingProperties(){
  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    api.get("/admin/properties/pending").then(r=>{
      setRows(r.data.data || r.data); setLoading(false);
    });
  },[]);

  const act = async (id, action) => {
    await api.post(`/admin/properties/${id}/${action}`);
    setRows(rows.filter(r=>r.id!==id));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Pending properties</h1>
      {loading ? "Loading..." : rows.map(p=>(
        <div key={p.id} className="bg-white rounded shadow p-4 mb-3 flex items-center justify-between">
          <div>
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-500">{p.location} · modes: {(p.rental_modes||[]).join(", ")}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={()=>act(p.id,'reject')}>Reject</button>
            <button className="btn btn-primary" onClick={()=>act(p.id,'approve')}>Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
}

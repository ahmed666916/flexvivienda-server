import { useEffect, useState } from "react";
import api from "../api/axios";
export default function Reports(){
  const [data,setData] = useState(null);
  useEffect(()=>{ api.get("/admin/reports/summary").then(r=>setData(r.data)); },[]);
  if(!data) return "Loading…";
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <pre className="bg-white p-4 rounded-xl">{JSON.stringify(data,null,2)}</pre>
    </>
  );
}

import {useEffect,useState} from "react";
import api from "../api/axios";

export default function Reports(){
  const [data,setData]=useState(null);
  useEffect(()=>{ api.get("/admin/reports/summary").then(r=>setData(r.data)); },[]);
  if(!data) return "Loading...";
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Reports</h1>
      <pre className="bg-white p-4 rounded shadow">{JSON.stringify(data,null,2)}</pre>
    </div>
  );
}

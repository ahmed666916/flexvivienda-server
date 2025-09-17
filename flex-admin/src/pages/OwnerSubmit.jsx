import { useState } from "react";
import api from "../api/axios";

export default function OwnerSubmit() {
  const [form, setForm] = useState({
    title:"", description:"", location:"",
    rental_modes:["short"], images:[]
  });
  const [msg,setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/owner/properties", form);
    setMsg(`Submitted. Property #${data.id} is pending review.`);
  };

  const toggleMode = (m) =>
    setForm(f => ({...f, rental_modes: f.rental_modes.includes(m)
      ? f.rental_modes.filter(x=>x!==m)
      : [...f.rental_modes,m]}));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Submit a Property</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="input" placeholder="Title"
          value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="input" placeholder="Location"
          value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
        <textarea className="textarea" placeholder="Description"
          value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <div className="flex gap-3">
          {["short","mid","long"].map(m=>(
            <label key={m} className="flex items-center gap-2">
              <input type="checkbox" checked={form.rental_modes.includes(m)} onChange={()=>toggleMode(m)}/>
              {m.toUpperCase()}
            </label>
          ))}
        </div>
        <button className="btn btn-primary">Submit</button>
        {msg && <p className="text-green-600 mt-2">{msg}</p>}
      </form>
    </div>
  );
}

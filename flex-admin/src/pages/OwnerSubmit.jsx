import { useState } from "react";
import api from "../api/axios";

export default function OwnerSubmit(){
  const [form, setForm] = useState({title:'', description:''});
  const [done, setDone] = useState(false);
  const onChange = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    await api.post("/owner/properties", form);
    setDone(true);
  };

  if(done) return <div className="p-6 bg-white rounded-xl">Thanks! Your property is pending review.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Submit your property</h1>
      <form onSubmit={submit} className="space-y-3">
        <input name="title" className="w-full border rounded-lg p-2" placeholder="Title" onChange={onChange} required/>
        <textarea name="description" className="w-full border rounded-lg p-2" placeholder="Description" onChange={onChange}/>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Submit</button>
      </form>
    </div>
  );
}

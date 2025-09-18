import { useState } from "react";
import api from "../api/axios";

export default function Payments(){
  const [amount,setAmount] = useState(100);
  const [secret,setSecret] = useState(null);
  const create = async () => {
    const r = await api.post("/payments/intent",{amount});
    setSecret(r.data.clientSecret);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <div className="bg-white rounded-xl p-4 shadow-sm max-w-md space-y-3">
        <input type="number" className="border rounded-lg p-2 w-full" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg" onClick={create}>Create Intent</button>
        {secret && <div className="text-xs break-all">Client Secret: {secret}</div>}
      </div>
    </>
  );
}

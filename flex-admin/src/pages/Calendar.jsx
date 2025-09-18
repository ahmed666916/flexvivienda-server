import { useState } from "react";
import api from "../api/axios";
export default function CalendarPage(){
  const [propertyId, setPropertyId] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState(null);
  const importIcal = async () => {
    await api.post("/airbnb/ical/import",{ property_id: propertyId, ical_url: url });
    setMsg("Imported & synced!");
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Calendar & Sync</h1>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3 max-w-xl">
        <input className="border rounded-lg p-2 w-full" placeholder="Property ID" value={propertyId} onChange={e=>setPropertyId(e.target.value)}/>
        <input className="border rounded-lg p-2 w-full" placeholder="iCal URL" value={url} onChange={e=>setUrl(e.target.value)} />
        <button onClick={importIcal} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Import iCal</button>
        {msg && <div className="text-green-600">{msg}</div>}
      </div>
    </>
  );
}

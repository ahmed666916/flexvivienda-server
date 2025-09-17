import { useState } from "react";
import api from "../api/axios";

export default function RateEditor({ property }) {
  const [rates, setRates] = useState([
    {mode:"short", price_per_night:0, min_nights:1},
    {mode:"mid", price_per_night:0, min_nights:14},
    {mode:"long", price_per_night:0, min_nights:30},
  ]);

  const save = async () => {
    await api.put(`/admin/properties/${property.id}/rates`, {rates});
    alert("Saved");
  };

  return (
    <div className="space-y-2">
      {rates.map((r,i)=>(
        <div key={r.mode} className="grid grid-cols-3 gap-2">
          <div className="font-medium">{r.mode.toUpperCase()}</div>
          <input className="input" type="number"
            value={r.price_per_night}
            onChange={e=>setRates(rs=>rs.map((x,ix)=>ix===i?{...x,price_per_night:+e.target.value}:x))}/>
          <input className="input" type="number"
            value={r.min_nights}
            onChange={e=>setRates(rs=>rs.map((x,ix)=>ix===i?{...x,min_nights:+e.target.value}:x))}/>
        </div>
      ))}
      <button className="btn btn-primary" onClick={save}>Save rates</button>
    </div>
  );
}

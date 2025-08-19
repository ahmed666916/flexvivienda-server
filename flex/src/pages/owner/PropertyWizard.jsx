// src/pages/owner/PropertyWizard.jsx  (step 1 only, expandable)
import { useState } from 'react';
import api from '../../api/axios';

export default function PropertyWizard() {
  const [form, setForm] = useState({
    title:'', description:'', city_id:'', bedrooms:0, bathrooms:0, max_guests:1,
    price_per_night:'', price_per_month:'', stay_type_slugs:['short'], images:[]
  });
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    try {
      await api.post('/owner/properties', form);
      window.location = '/owner/properties';
    } finally { setSaving(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Submit Property</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="border p-2 rounded" placeholder="City ID" value={form.city_id} onChange={e=>setForm({...form, city_id:e.target.value})} />
        <textarea className="border p-2 rounded md:col-span-2" placeholder="Description"
                  value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Bedrooms" type="number" value={form.bedrooms}
               onChange={e=>setForm({...form, bedrooms:+e.target.value})} />
        <input className="border p-2 rounded" placeholder="Bathrooms" type="number" value={form.bathrooms}
               onChange={e=>setForm({...form, bathrooms:+e.target.value})} />
        <input className="border p-2 rounded" placeholder="Max Guests" type="number" value={form.max_guests}
               onChange={e=>setForm({...form, max_guests:+e.target.value})} />
        <input className="border p-2 rounded" placeholder="Price per night" type="number" value={form.price_per_night}
               onChange={e=>setForm({...form, price_per_night:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Price per month" type="number" value={form.price_per_month}
               onChange={e=>setForm({...form, price_per_month:e.target.value})} />
      </div>

      <div className="mt-4">
        <div className="text-sm mb-2">Stay Types</div>
        <div className="flex gap-2">
          {['short','mid','long'].map(s => (
            <button key={s} type="button"
              onClick={() => setForm(f=>({...f, stay_type_slugs: f.stay_type_slugs.includes(s) ? f.stay_type_slugs.filter(x=>x!==s) : [...f.stay_type_slugs, s]}))}
              className={`px-3 py-1 rounded-full border ${form.stay_type_slugs.includes(s) ? 'bg-black text-white' : ''}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button onClick={submit} disabled={saving}
          className="px-4 py-2 rounded-xl bg-black text-white">{saving?'Saving...':'Submit for Review'}</button>
      </div>
    </div>
  );
}

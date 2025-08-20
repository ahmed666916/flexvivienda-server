// flex/src/pages/admin/Owners.js
import React, { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../api/axios';

function VBadge({ ok }) {
  return (
    <span className={`badge ${ok ? 'text-bg-success' : 'text-bg-secondary'}`}>
      {ok ? 'Verified' : 'Unverified'}
    </span>
  );
}
function SBadge({ s }) {
  const map = { active:'text-bg-primary', disabled:'text-bg-secondary' };
  return <span className={`badge ${map[s] || 'text-bg-light'}`}>{s}</span>;
}
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100" style={{background:'rgba(0,0,0,0.25)', zIndex:1050}}>
      <div className="d-flex align-items-center justify-content-center h-100 p-3">
        <div className="bg-white rounded-4 shadow" style={{maxWidth:720, width:'100%'}}>
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="m-0">{title}</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
          <div className="p-3">{children}</div>
          {footer && <div className="p-3 border-top">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Owners() {
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    api.get('/admin/owners').then(r => setRows(r.data.data || r.data));
    }, []);
  const [filter, setFilter] = useState('all'); // all | verified | unverified | disabled
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter === 'verified')   r = r.filter(x => x.verified);
    if (filter === 'unverified') r = r.filter(x => !x.verified);
    if (filter === 'disabled')   r = r.filter(x => x.status === 'disabled');
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter(x =>
        x.name.toLowerCase().includes(s) ||
        x.email.toLowerCase().includes(s) ||
        (x.city || '').toLowerCase().includes(s)
      );
    }
    return r;
  }, [rows, filter, q]);

  const openOwner = (o) => { setActive(o); setOpen(true); };

  const toggleVerify = async (o) => {
    const url = o.verified ? `/admin/owners/${o.id}/unverify` : `/admin/owners/${o.id}/verify`;
    await api.post(url);
    setRows(prev => prev.map(x => x.id===o.id ? {...x, verified: !o.verified} : x));
    };
  const toggleDisable = async (o) => {
    const url = o.status==='active' ? `/admin/owners/${o.id}/disable` : `/admin/owners/${o.id}/enable`;
     await api.post(url);
     setRows(prev => prev.map(x => x.id===o.id ? {...x, status: o.status==='active'?'disabled':'active'} : x));
     };
  return (
    <AdminLayout>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="fw-bold m-0">Owners</h1>
          <div className="text-muted">KYC status, activity, and portfolio</div>
        </div>
        <div className="d-flex gap-2">
          {['all','verified','unverified','disabled'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`btn btn-sm ${filter===s ? 'btn-dark' : 'btn-outline-dark'}`}>
              {s[0].toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-3">
        <div className="card-body d-flex flex-wrap justify-content-between gap-2">
          <input
            className="form-control"
            placeholder="Search by name, email, city…"
            style={{maxWidth:380}}
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
          <div className="text-muted small">Showing {filtered.length} of {rows.length}</div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
          <table className="table align-middle m-0">
            <thead className="text-muted small">
              <tr>
                <th>Owner</th><th>City</th><th>Properties</th><th>KYC</th><th>Status</th><th>Joined</th><th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
            {filtered.map(o=>(
              <tr key={o.id} className="border-top">
                <td>
                  <div className="fw-medium">{o.name}</div>
                  <div className="text-muted small">{o.email} · {o.phone}</div>
                </td>
                <td>{o.city}</td>
                <td>{o.properties}</td>
                <td><VBadge ok={o.verified} /></td>
                <td><SBadge s={o.status} /></td>
                <td>{o.joined}</td>
                <td className="text-end">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={()=>openOwner(o)}>View</button>
                    <button className="btn btn-sm btn-outline-primary" onClick={()=>toggleVerify(o)}>{o.verified ? 'Unverify' : 'Verify'}</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>toggleDisable(o)}>{o.status==='active'?'Disable':'Enable'}</button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={7} className="text-center text-muted py-5">No owners found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        title={active?.name || 'Owner'}
        footer={
          <div className="d-flex justify-content-end gap-2">
            {active && (
              <>
                <button className="btn btn-outline-primary" onClick={()=>toggleVerify(active)}>{active.verified ? 'Unverify' : 'Verify'}</button>
                <button className="btn btn-outline-danger" onClick={()=>toggleDisable(active)}>{active.status==='active'?'Disable':'Enable'}</button>
              </>
            )}
          </div>
        }
      >
        {!active ? null : (
          <div className="row g-3">
            <div className="col-md-7">
              <div className="mb-2"><span className="text-muted small">Email</span><div className="fw-medium">{active.email}</div></div>
              <div className="mb-2"><span className="text-muted small">Phone</span><div className="fw-medium">{active.phone}</div></div>
              <div className="mb-2"><span className="text-muted small">City</span><div className="fw-medium">{active.city}</div></div>
              <div className="mb-2"><span className="text-muted small">Joined</span><div className="fw-medium">{active.joined}</div></div>
            </div>
            <div className="col-md-5">
              <div className="mb-2"><span className="text-muted small">KYC</span><div><VBadge ok={active.verified} /></div></div>
              <div className="mb-2"><span className="text-muted small">Status</span><div><SBadge s={active.status} /></div></div>
              <div className="mb-2"><span className="text-muted small">Portfolio</span><div className="fw-medium">{active.properties} properties</div></div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

// flex/src/pages/admin/Submissions.js
import React, { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../api/axios';

function Badge({ status }) {
  const map = {
    pending: 'text-bg-warning',
    approved: 'text-bg-success',
    rejected: 'text-bg-secondary',
  };
  return <span className={`badge ${map[status] || 'text-bg-light'}`}>{status}</span>;
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

function useToast() {
  const [msg, setMsg] = useState(null);
  const show = (m) => { setMsg(m); setTimeout(()=>setMsg(null), 1800); };
  const ui = msg ? (
    <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:1100}}>
      <div className="toast show align-items-center text-bg-dark border-0">
        <div className="d-flex">
          <div className="toast-body">{msg}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={()=>setMsg(null)}></button>
        </div>
      </div>
    </div>
  ) : null;
  return { show, ui };
}

export default function Submissions() {
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    api.get('/admin/submissions').then(r => setRows(r.data.data || r.data));
    }, []);
  const [filter, setFilter] = useState('pending'); // pending | approved | rejected | all
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { show, ui: toast } = useToast();

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== 'all') r = r.filter(x => x.status === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter(x =>
        x.title.toLowerCase().includes(s) ||
        x.owner.toLowerCase().includes(s) ||
        String(x.city || '').toLowerCase().includes(s)
      );
    }
    return r;
  }, [rows, filter, q]);

  const onView = (row) => { setActive(row); setOpen(true); };

  const updateStatus = async (row, status) => {
    const url = status === 'approved'
    ? `/admin/submissions/${row.id}/approve`
    : `/admin/submissions/${row.id}/reject`;
    await api.post(url);
    setRows(prev => prev.map(x => x.id === row.id ? { ...x, status } : x));
    show(status === 'approved' ? 'Submission approved' : 'Submission rejected');
    if (open) setOpen(false);
    };

  return (
    <AdminLayout>
      {toast}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="fw-bold m-0">Submissions</h1>
          <div className="text-muted">Review properties submitted by owners</div>
        </div>
        <div className="d-flex gap-2">
          {['pending','approved','rejected','all'].map(s=>(
            <button
              key={s}
              onClick={()=>setFilter(s)}
              className={`btn btn-sm ${filter===s ? 'btn-dark' : 'btn-outline-dark'}`}
            >
              {s[0].toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-3">
        <div className="card-body d-flex flex-wrap justify-content-between gap-2">
          <input
            className="form-control"
            placeholder="Search by title, owner, city…"
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
                <th>Title</th>
                <th>Owner</th>
                <th>City</th>
                <th>Submitted</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row=>(
                <tr key={row.id} className="border-top">
                  <td className="fw-medium">{row.title}</td>
                  <td>{row.owner}</td>
                  <td>{row.city || '—'}</td>
                  <td>{row.submitted}</td>
                  <td><Badge status={row.status} /></td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-secondary" onClick={()=>onView(row)}>View</button>
                      {row.status !== 'approved' && (
                        <button className="btn btn-sm btn-dark" onClick={()=>updateStatus(row,'approved')}>Approve</button>
                      )}
                      {row.status !== 'rejected' && (
                        <button className="btn btn-sm btn-outline-danger" onClick={()=>updateStatus(row,'rejected')}>Reject</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="text-center text-muted py-5">No submissions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        title={active?.title || 'Submission'}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-danger" onClick={()=>updateStatus(active,'rejected')}>Reject</button>
            <button className="btn btn-dark" onClick={()=>updateStatus(active,'approved')}>Approve</button>
          </div>
        }
      >
        {!active ? null : (
          <div className="row g-3">
            <div className="col-md-8">
              <div className="mb-3">
                <div className="text-muted small">Owner</div>
                <div className="fw-medium">{active.owner}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">City</div>
                <div className="fw-medium">{active.city}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Submitted</div>
                <div className="fw-medium">{active.submitted}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Notes</div>
                <p className="mb-0">
                  (Sample) 2+1 apartment with sea view, balcony, newly renovated kitchen.
                  Amenities: Wi-Fi, AC, Washer, Elevator. Stay types: Short, Mid.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-3 overflow-hidden border">
                <img src="/Images/gallery2.jpg" alt="" style={{width:'100%', height:180, objectFit:'cover'}} />
              </div>
              <div className="text-muted small mt-2">Preview image</div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

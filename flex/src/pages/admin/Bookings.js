// flex/src/pages/admin/Bookings.js
import React, { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import { mockBookings } from './_mock';

function StatusBadge({ s }) {
  const map = { pending:'text-bg-warning', confirmed:'text-bg-success', cancelled:'text-bg-secondary' };
  return <span className={`badge ${map[s] || 'text-bg-light'}`}>{s}</span>;
}
function PayBadge({ s }) {
  const map = { unpaid:'text-bg-secondary', paid:'text-bg-primary', refunded:'text-bg-dark' };
  return <span className={`badge ${map[s] || 'text-bg-light'}`}>{s}</span>;
}
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100" style={{background:'rgba(0,0,0,0.25)', zIndex:1050}}>
      <div className="d-flex align-items-center justify-content-center h-100 p-3">
        <div className="bg-white rounded-4 shadow" style={{maxWidth:760, width:'100%'}}>
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

export default function Bookings() {
  const [rows, setRows] = useState(mockBookings);
  const [filter, setFilter] = useState('all'); // all | pending | confirmed | cancelled
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== 'all') r = r.filter(x => x.status === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter(x =>
        x.ref.toLowerCase().includes(s) ||
        x.property.toLowerCase().includes(s) ||
        x.guest.toLowerCase().includes(s) ||
        (x.city || '').toLowerCase().includes(s)
      );
    }
    return r;
  }, [rows, filter, q]);

  const openRow = (b) => { setActive(b); setOpen(true); };

  const setStatus = (b, status) => {
    setRows(prev => prev.map(x => x.id === b.id ? { ...x, status } : x));
  };
  const setPayment = (b, payment) => {
    setRows(prev => prev.map(x => x.id === b.id ? { ...x, payment } : x));
  };

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="fw-bold m-0">Bookings</h1>
          <div className="text-muted">Manage confirmations, cancellations, and payments</div>
        </div>
        <div className="d-flex gap-2">
          {['all','pending','confirmed','cancelled'].map(s=>(
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
            placeholder="Search by ref, property, guest, city…"
            style={{maxWidth:420}}
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
                <th>Ref</th><th>Property</th><th>Guest</th><th>Dates</th><th>Nights</th>
                <th>Guests</th><th>Amount</th><th>Status</th><th>Payment</th><th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
            {filtered.map(b=>(
              <tr key={b.id} className="border-top">
                <td className="fw-medium">{b.ref}</td>
                <td>
                  <div className="fw-medium">{b.property}</div>
                  <div className="text-muted small">{b.city}</div>
                </td>
                <td>
                  <div className="fw-medium">{b.guest}</div>
                  <div className="text-muted small">{b.guestEmail}</div>
                </td>
                <td>{b.start} → {b.end}</td>
                <td>{b.nights}</td>
                <td>{b.guests}</td>
                <td>{b.currency} {b.amount}</td>
                <td><StatusBadge s={b.status} /></td>
                <td><PayBadge s={b.payment} /></td>
                <td className="text-end">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={()=>openRow(b)}>View</button>
                    {b.status!=='confirmed' && <button className="btn btn-sm btn-dark" onClick={()=>setStatus(b,'confirmed')}>Confirm</button>}
                    {b.status!=='cancelled' && <button className="btn btn-sm btn-outline-danger" onClick={()=>setStatus(b,'cancelled')}>Cancel</button>}
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={10} className="text-center text-muted py-5">No bookings found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        title={active?.ref || 'Booking'}
        footer={active && (
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-dark" onClick={()=>setPayment(active,'paid')}>Mark Paid</button>
              <button className="btn btn-outline-dark" onClick={()=>setPayment(active,'unpaid')}>Mark Unpaid</button>
              <button className="btn btn-outline-dark" onClick={()=>setPayment(active,'refunded')}>Refund</button>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger" onClick={()=>setStatus(active,'cancelled')}>Cancel</button>
              <button className="btn btn-dark" onClick={()=>setStatus(active,'confirmed')}>Confirm</button>
            </div>
          </div>
        )}
      >
        {!active ? null : (
          <div className="row g-3">
            <div className="col-md-7">
              <div className="mb-2"><span className="text-muted small">Property</span><div className="fw-medium">{active.property} — {active.city}</div></div>
              <div className="mb-2"><span className="text-muted small">Guest</span><div className="fw-medium">{active.guest} · {active.guestEmail}</div></div>
              <div className="mb-2"><span className="text-muted small">Dates</span><div className="fw-medium">{active.start} → {active.end} ({active.nights} nights)</div></div>
              <div className="mb-2"><span className="text-muted small">Guests</span><div className="fw-medium">{active.guests}</div></div>
            </div>
            <div className="col-md-5">
              <div className="mb-2"><span className="text-muted small">Amount</span><div className="fw-medium">{active.currency} {active.amount}</div></div>
              <div className="mb-2"><span className="text-muted small">Status</span><div><StatusBadge s={active.status} /></div></div>
              <div className="mb-2"><span className="text-muted small">Payment</span><div><PayBadge s={active.payment} /></div></div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

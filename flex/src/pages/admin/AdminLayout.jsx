// flex/src/pages/admin/AdminLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex" style={{minHeight:'100vh', background:'#f7f7f7'}}>
      <aside className="border-end bg-white" style={{width:260}}>
        <div className="p-4 border-bottom">
          <div className="fw-bold fs-5">Flex Admin</div>
          <div className="text-muted small">Operations Console</div>
        </div>
        <nav className="p-3">
          <div className="mb-2"><Link className="text-decoration-none" to="/admin">Dashboard</Link></div>
          <div className="mb-2"><Link className="text-decoration-none" to="/admin/properties">Properties</Link></div>
          <div className="mb-2"><Link className="text-decoration-none" to="/admin/submissions">Submissions</Link></div>
          <div className="mb-2"><Link className="text-decoration-none" to="/admin/bookings">Bookings</Link></div>
          <div className="mb-2"><Link className="text-decoration-none" to="/admin/owners">Owners</Link></div>
        </nav>
      </aside>

      <main className="flex-grow-1 p-4">
        {children}
      </main>
    </div>
  );
}

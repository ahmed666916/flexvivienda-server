// flex/src/pages/admin/Dashboard.js
import React from 'react';
import AdminLayout from './AdminLayout';
import { mockStats, mockSubmissions } from './_mock';

export default function Dashboard() {
  const cards = [
    { label:'Pending Review', value: mockStats.pending },
    { label:'Published',      value: mockStats.published },
    { label:'Owners',         value: mockStats.owners },
    { label:'Bookings',       value: mockStats.bookings },
  ];

  return (
    <AdminLayout>
      <div className="mb-4">
        <h1 className="fw-bold" style={{letterSpacing:'-0.3px'}}>Dashboard</h1>
        <div className="text-muted">Overview of properties, submissions, and bookings</div>
      </div>

      <div className="row g-3 mb-4">
        {cards.map((c,i)=>(
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <div className="text-muted small">{c.label}</div>
                <div className="display-6 fw-semibold">{c.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0">Latest Submissions</h5>
            <a href="/admin/submissions" className="btn btn-sm btn-dark rounded-pill px-3">Review</a>
          </div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="text-muted small">
                <tr><th>Title</th><th>Owner</th><th>City</th><th>Submitted</th><th>Status</th></tr>
              </thead>
              <tbody>
                {mockSubmissions.map(row=>(
                  <tr key={row.id}>
                    <td className="fw-medium">{row.title}</td>
                    <td>{row.owner}</td>
                    <td>{row.city}</td>
                    <td>{row.submitted}</td>
                    <td><span className="badge text-bg-warning">Pending</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <a className="text-decoration-none" href="/admin/submissions">See all submissions →</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

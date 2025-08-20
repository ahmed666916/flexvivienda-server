// flex/src/pages/admin/Properties.js
import React from 'react';
import AdminLayout from './AdminLayout';
import { mockProperties } from './_mock';

export default function Properties() {
  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="fw-bold">Properties</h1>
          <div className="text-muted">Manage status and visibility</div>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-dark btn-sm">Pending Review</button>
          <button className="btn btn-outline-dark btn-sm">Published</button>
          <button className="btn btn-outline-dark btn-sm">Draft</button>
        </div>
      </div>

      <div className="row g-3">
        {mockProperties.map(p=>(
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <img src={p.cover || '/Images/gallery1.jpg'} className="card-img-top" alt="" style={{height:170, objectFit:'cover'}} />
              <div className="card-body">
                <div className="fw-semibold">{p.title}</div>
                <div className="text-muted small">{p.city} · Owner: {p.owner}</div>
                <div className="mt-2">
                  <span className={`badge ${p.status==='published' ? 'text-bg-success' : p.status==='pending_review' ? 'text-bg-warning' : 'text-bg-secondary'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                <button className="btn btn-sm btn-outline-secondary">Unpublish</button>
                <button className="btn btn-sm btn-dark">Publish</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

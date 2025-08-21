// src/pages/admin/AdminSubmissions.jsx (minimal)
import React from 'react';
import api from '../../api/axios';

export default function AdminSubmissions() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get('/admin/submissions?status=pending&type=owner_lead')
      .then(r => setRows(r.data?.data ?? r.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  return <pre>{JSON.stringify(rows, null, 2)}</pre>;
}

// src/routes/RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { validateToken } from '../auth';

export default function RequireAuth({ children }) {
  const [checked, setChecked] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const ok = await validateToken(); // does nothing if no token
      if (mounted) {
        setAuthed(ok);
        setChecked(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!checked) return null; // or a spinner

  // Only redirect if NOT already on /login
  if (!authed && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

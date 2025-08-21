// src/auth.js
import api from './api/axios';

export function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export async function validateToken() {
  const t = localStorage.getItem('token');
  if (!t) return false;
  try {
    await api.get('/auth/me'); // only call if token exists
    return true;
  } catch {
    setToken(null);
    return false;
  }
}

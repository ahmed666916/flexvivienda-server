// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const Ctx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function me() {
    try { const { data } = await api.get('/auth/me'); setUser(data); }
    catch { setUser(null); }
  }

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    api.post('/auth/logout').catch(()=>{});
  }

  useEffect(() => { me(); }, []);

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);

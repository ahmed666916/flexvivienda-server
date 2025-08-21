// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  withCredentials: false, // <— Bearer tokens only; no cookies/CSRF noise
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) {
    config.headers['Authorization'] = `Bearer ${t}`;
  }
  config.headers['Accept'] = 'application/json';
  return config;
});

export default api;

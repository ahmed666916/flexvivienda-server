// src/services/api.js
import axios from 'axios';

// Build baseURL from envs with sensible fallbacks
const ROOT = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');
const baseURL =
  process.env.REACT_APP_API_BASE || (ROOT ? `${ROOT}/api` : 'http://localhost:8000/api');

// Single Axios instance used app-wide
const api = axios.create({
  baseURL,
  withCredentials: true,                // enable if you ever use cookies/Sanctum
  timeout: 15000,                       // avoid “forever pending” requests
  headers: { Accept: 'application/json' },
  validateStatus: (s) => s >= 200 && s < 300, // let 4xx/5xx throw
});

// Optional: normalize errors so callers can handle consistently
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const resp = err.response;
    const normalized = new Error(
      resp?.data?.message ||
      resp?.statusText ||
      err.message ||
      'Request failed'
    );
    normalized.status = resp?.status;
    normalized.data = resp?.data;
    normalized.url = resp?.config?.url;
    throw normalized;
  }
);

// ---- API helpers ----

// Lists with optional filters: { page, per_page, city, amenities, ... }
export const listProperties = (params = {}) => api.get('/properties', { params });

// Detail by slug
export const getProperty = (slug) => api.get(`/properties/${slug}`);

export default api;
export { api }; // (optional named export)

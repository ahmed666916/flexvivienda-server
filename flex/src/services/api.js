import axios from 'axios';

// CRA uses process.env.REACT_APP_*
const baseURL =
  process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

const api = axios.create({ baseURL });

// Lists with optional filters: { page, per_page, city, amenities, ... }
export const listProperties = (params = {}) =>
  api.get('/properties', { params });

// Detail by slug
export const getProperty = (slug) =>
  api.get(`/properties/${slug}`);

export default api;

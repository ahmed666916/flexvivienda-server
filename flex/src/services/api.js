// src/services/api.js
import axios from "axios";

// Build baseURL from envs with sensible fallbacks
const ROOT = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const baseURL =
  process.env.REACT_APP_API_BASE ||
  (ROOT ? `${ROOT}/api` : "https://app.flexvivienda.com/api");

// Single Axios instance used app-wide
const api = axios.create({
  baseURL,
  withCredentials: false,  // ✅ disable cookies (Bearer tokens only)
  timeout: 15000,
  headers: { Accept: "application/json" },
  validateStatus: (s) => s >= 200 && s < 300,
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const resp = err.response;
    const normalized = new Error(
      resp?.data?.message ||
        resp?.statusText ||
        err.message ||
        "Request failed"
    );
    normalized.status = resp?.status;
    normalized.data = resp?.data;
    normalized.url = resp?.config?.url;
    throw normalized;
  }
);

// ---- API helpers ----

// Lists with optional filters
export const listProperties = (params = {}) =>
  api.get("/getAllProperties", { params });

// Property detail by slug
export const getProperty = (slug) => api.get(`/properties/${slug}`);

export default api;
export { api };

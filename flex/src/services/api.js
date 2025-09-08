// src/services/api.js
import axios from "axios";

const ROOT = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const baseURL =
  process.env.REACT_APP_API_BASE ||
  (ROOT ? `${ROOT}/api` : "https://app.flexvivienda.com/api");

const api = axios.create({
  baseURL,
  withCredentials: false, // ✅ Bearer tokens only
  timeout: 15000,
  headers: { Accept: "application/json" },
  validateStatus: (s) => s >= 200 && s < 300,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const resp = err.response;
    const normalized = new Error(
      resp?.data?.message || resp?.statusText || err.message || "Request failed"
    );
    normalized.status = resp?.status;
    normalized.data = resp?.data;
    normalized.url = resp?.config?.url;
    throw normalized;
  }
);

export default api;

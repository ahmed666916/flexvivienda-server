import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: false,
});

// ✅ Hardcoded dev token for testing (replace with real token from /api/login response)
const DEV_TOKEN = "6|fKeksNoAiDC2J2mOzDA9nLQ0503cfKzJqHN6rm9Ad382faed";

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token") || DEV_TOKEN;
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default api;

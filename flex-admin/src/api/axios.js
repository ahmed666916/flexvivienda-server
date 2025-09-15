import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ✅ must match your Laravel URL
  withCredentials: false, // change this for now
});

export default api;

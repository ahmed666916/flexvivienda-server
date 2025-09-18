import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // 🚨 TEMP BYPASS: Always allow access
  // (remove this once login works)
  return children;

  /*
  // --- ORIGINAL LOGIC (keep for later) ---
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
  */
}

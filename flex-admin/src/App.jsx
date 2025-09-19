import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Properties from "./pages/Properties";
import PendingProperties from "./pages/admin/PendingProperties";
import Bookings from "./pages/Bookings";
import CalendarPage from "./pages/CalendarPage";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Moderation from "./pages/Moderation";
import Settings from "./pages/Settings";
import OwnerSubmit from "./pages/OwnerSubmit";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect / to /admin (temporary while testing) */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/owner/submit" element={<OwnerSubmit />} />

        {/* Protected Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/pending" element={<PendingProperties />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="moderation" element={<Moderation />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users"; // stub files
import Properties from "./pages/Properties";
import Bookings from "./pages/Bookings";
import CalendarPage from "./pages/Calendar";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Moderation from "./pages/Moderation";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
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

export default App;

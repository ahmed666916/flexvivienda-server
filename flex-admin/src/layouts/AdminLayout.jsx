import { Link, Outlet } from "react-router-dom";
import { Home, Users, Building2, Calendar, BarChart2, Settings, Shield, CreditCard } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 font-bold text-xl text-indigo-600">Flex Admin</div>
        <nav className="space-y-2 px-4">
          <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Home size={18}/> Dashboard</Link>
          <Link to="/admin/users" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Users size={18}/> Users</Link>
          <Link to="/admin/properties" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Building2 size={18}/> Properties</Link>
          <Link to="/admin/bookings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Calendar size={18}/> Bookings</Link>
          <Link to="/admin/calendar" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Calendar size={18}/> Calendar</Link>
          <Link to="/admin/payments" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><CreditCard size={18}/> Payments</Link>
          <Link to="/admin/reports" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><BarChart2 size={18}/> Reports</Link>
          <Link to="/admin/moderation" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Shield size={18}/> Trust & Safety</Link>
          <Link to="/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"><Settings size={18}/> Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

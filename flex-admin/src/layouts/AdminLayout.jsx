import { Outlet, NavLink } from "react-router-dom";
import { Home, Users, Building2, Calendar, ShieldCheck, Settings, CreditCard, BarChart } from "lucide-react";

const Link = ({ to, Icon, children }) => (
  <NavLink
    to={to}
    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
  >
    <Icon size={18} />
    <span>{children}</span>
  </NavLink>
);



export default function AdminLayout(){
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="p-4 border-r bg-white">
        <div className="text-xl font-semibold mb-4">Flex Admin</div>
        <nav className="space-y-1">
          <Link to="/admin" Icon={Home}>Dashboard</Link>
          <Link to="/admin/users" icon={Users}>Users</Link>
          <Link to="/admin/properties" icon={Building2}>Properties</Link>
          <Link to="/admin/bookings" icon={Calendar}>Bookings</Link>
          <Link to="/admin/payments" icon={CreditCard}>Payments</Link>
          <Link to="/admin/reports" icon={BarChart}>Reports</Link>
          <Link to="/admin/moderation" icon={ShieldCheck}>Trust & Safety</Link>
          <Link to="/admin/settings" icon={Settings}>Settings</Link>
        </nav>
      </aside>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

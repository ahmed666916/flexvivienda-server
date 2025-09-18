/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import {
  Home, Users, Building2, Calendar, ShieldCheck,
  Settings, CreditCard, BarChart, MessageCircle
} from "lucide-react";

const links = [
  { to: "/admin", icon: Home, label: "Dashboard" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/properties", icon: Building2, label: "Properties" },
  { to: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { to: "/admin/payments", icon: CreditCard, label: "Payments" },
  { to: "/admin/reports", icon: BarChart, label: "Reports" },
  { to: "/admin/moderation", icon: ShieldCheck, label: "Trust & Safety" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/messages", icon: MessageCircle, label: "Messages" },
];

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-white p-4 flex flex-col">
      <div className="text-xl font-bold mb-6 text-pink-600">Flex Admin</div>
      <nav className="space-y-1 flex-1">
       
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "bg-gray-200 font-semibold text-pink-600" : ""
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

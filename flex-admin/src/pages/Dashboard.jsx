import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((r) => setStats(r.data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) return <div>Loading…</div>;

  // Small stat card
  const StatCard = ({ label, value }) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Top grid of stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Properties" value={stats.properties} />
        <StatCard label="Bookings" value={stats.bookings} />
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Blogs" value={stats.blogs} />
        <StatCard label="Pending" value={stats.pendingProperties} />
        <StatCard label="Revenue (Month)" value={`$${stats.revenueMonth}`} />
      </div>

      {/* Reservations style card (like Airbnb screenshot) */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 border-b px-6 py-3">
          <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium">
            Today
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
            Upcoming
          </button>
        </div>
        <div className="p-6">
          <p className="text-xl">
            You have{" "}
            <b className="text-pink-600">{stats.pendingProperties}</b> pending
            properties to review.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Stay on top of your approvals to keep listings active.
          </p>
        </div>
      </div>
    </>
  );
}

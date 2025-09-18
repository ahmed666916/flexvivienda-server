import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard(){
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get("/admin/stats").then(r=>setStats(r.data)).catch(()=>setStats(null)); }, []);
  if(!stats) return <div>Loading…</div>;

  const Card = ({label, value}) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="text-gray-500">{label}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
    </div>
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Total Properties" value={stats.properties} />
        <Card label="Total Bookings" value={stats.bookings} />
        <Card label="Total Users" value={stats.users} />
        <Card label="Total Blogs" value={stats.blogs} />
      </div>
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-full bg-gray-900 text-white">Today</button>
          <button className="px-4 py-2 rounded-full bg-gray-100">Upcoming</button>
        </div>
        <p className="text-xl mt-6">
          You have <b>{stats.pendingProperties}</b> pending properties to review.
        </p>
      </div>
    </>
  );
}

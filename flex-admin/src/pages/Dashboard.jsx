import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Properties" value={stats.properties}/>
        <Card title="Total Bookings" value={stats.bookings}/>
        <Card title="Total Users" value={stats.users}/>
        <Card title="Total Blogs" value={stats.blogs}/>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

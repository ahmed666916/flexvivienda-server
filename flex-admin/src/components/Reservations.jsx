import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [view, setView] = useState("today");

  useEffect(() => {
    api.get("/bookings/my").then(res => setReservations(res.data));
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const filtered = reservations.filter(r =>
    view === "today"
      ? r.check_in === today
      : new Date(r.check_in) > new Date(today)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {view === "today"
          ? `You have ${filtered.length} reservations today`
          : `You have ${filtered.length} upcoming reservations`}
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${view === "today" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setView("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 rounded-full ${view === "upcoming" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setView("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <div>
              <div className="font-semibold">{new Date(r.check_in).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              <div className="text-gray-500">{r.property?.title || "Property"}</div>
            </div>
            <div className="flex items-center gap-2">
              <img src={r.user?.avatar || "/default.png"} className="w-10 h-10 rounded-full" />
              <span>{r.user?.name || "Guest"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

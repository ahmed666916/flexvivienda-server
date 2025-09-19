/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../api/axios";
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

export default function CalendarPage() {
  const [propertyId, setPropertyId] = useState(1); // default property for testing
  const [icalUrl, setIcalUrl] = useState("");
  const [days, setDays] = useState([]);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load availability for a property
  useEffect(() => {
    if (!propertyId) return;

    setLoading(true);
    api
      .get(`/properties/${propertyId}/calendar`)
      .then((res) => {
        const { days, booked } = res.data;
        setDays(days || []);
        setBooked(booked || []);
      })
      .catch(() => {
        setDays([]);
        setBooked([]);
      })
      .finally(() => setLoading(false));
  }, [propertyId]);

  // Submit iCal import
  const handleImport = async () => {
    if (!icalUrl) return;
    await api.post("/airbnb/ical/import", { property_id: propertyId, ical_url: icalUrl });
    alert("iCal imported successfully!");
  };

  // Check if a date is booked
  const isBooked = (date) => {
    return booked.some((b) => date >= new Date(b.start) && date <= new Date(b.end));
  };

  // Render calendar grid (current month)
  const today = new Date();
  const monthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar & Sync</h1>

      {/* Import iCal form */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Property ID"
            className="border rounded-lg px-3 py-2"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
          />
          <input
            type="text"
            placeholder="iCal URL"
            className="border rounded-lg px-3 py-2"
            value={icalUrl}
            onChange={(e) => setIcalUrl(e.target.value)}
          />
          <button
            onClick={handleImport}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            Import iCal
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">
          {format(today, "MMMM yyyy")}
        </h2>

        {loading ? (
          <p>Loading calendar…</p>
        ) : (
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-medium text-gray-500">
                {d}
              </div>
            ))}

            {/* Days */}
            {monthDays.map((date) => {
              const dayData = days.find((d) => d.date === format(date, "yyyy-MM-dd"));
              const bookedDay = isBooked(date);

              return (
                <div
                  key={date}
                  className={`h-24 flex flex-col justify-between rounded-lg p-2 border ${
                    bookedDay
                      ? "bg-red-100 border-red-300"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <span className="text-sm font-medium">{format(date, "d")}</span>
                  <span className="text-xs text-gray-600">
                    {dayData ? `$${dayData.price}` : "-"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

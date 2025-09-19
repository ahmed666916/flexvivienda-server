/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

export default function CalendarPage() {
  const [propertyId, setPropertyId] = useState(2); // default property
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
         console.log("API raw response:", res.data); 
        const { days, booked } = res.data;

        // ✅ Normalize all API dates to "yyyy-MM-dd"
        const normalizedDays = (days || []).map((d) => ({
          ...d,
          date: format(new Date(d.date), "yyyy-MM-dd"),
        }));

        setDays(normalizedDays);
        setBooked(booked || []);
        console.log("Normalized days:", normalizedDays);
        console.log("Booked:", booked);
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
    await api.post("/airbnb/ical/import", {
      property_id: propertyId,
      ical_url: icalUrl,
    });
    alert("iCal imported successfully!");
  };

  // Check if a date is booked
  const isBooked = (date) => {
    return booked.some(
      (b) => date >= new Date(b.start) && date <= new Date(b.end)
    );
  };

  // Get day status (Available / Blocked / Booked)
  const getDayStatus = (dayData, bookedDay) => {
    if (bookedDay) return "Booked";
    if (dayData?.status === "blocked") return "Blocked";
    return "Available";
  };

  // Build 2 months (current + next)
  const today = new Date();
  const months = [
    {
      title: format(today, "MMMM yyyy"),
      days: eachDayOfInterval({
        start: startOfMonth(today),
        end: endOfMonth(today),
      }),
    },
    {
      title: format(addMonths(today, 1), "MMMM yyyy"),
      days: eachDayOfInterval({
        start: startOfMonth(addMonths(today, 1)),
        end: endOfMonth(addMonths(today, 1)),
      }),
    },
  ];

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
      {loading ? (
        <p>Loading calendar…</p>
      ) : (
        months.map((month, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-2xl p-6 border border-gray-100 mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">{month.title}</h2>

            <div className="grid grid-cols-7 gap-2 text-center">
              {/* Weekday headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="font-medium text-gray-500">
                  {d}
                </div>
              ))}

              {/* Days */}
              {month.days.map((date) => {
                const formattedDate = format(date, "yyyy-MM-dd");
                const dayData = days.find((d) => d.date === formattedDate);
                const bookedDay = isBooked(date);

                return (
                  <div
                    key={date}
                    className={`h-24 flex flex-col justify-between rounded-lg p-2 border text-left ${
                      bookedDay
                        ? "bg-orange-100 border-orange-300"
                        : dayData?.status === "blocked"
                        ? "bg-red-100 border-red-300"
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {format(date, "d")}
                    </span>
                    <span className="text-xs text-gray-600">
                      {dayData ? `$${dayData.price}` : "-"}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {getDayStatus(dayData, bookedDay)}
                      {dayData?.min_stay ? ` • ${dayData.min_stay} nights` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

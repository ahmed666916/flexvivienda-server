import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "../api/axios";

const PropertyCalendar = ({ propertyId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/properties/${propertyId}/calendar`)
      .then((res) => {
        const { days, booked } = res.data;

        // Build events array
        const calendarEvents = [
          // Days with availability/price
          ...days.map((d) => ({
            title: `$${d.price} / ${d.min_stay}n`,
            date: d.date,
            backgroundColor: d.status === "blocked" ? "#ff4d4f" : "#4caf50",
            textColor: "#fff",
          })),

          // Booked periods
          ...booked.map((b) => ({
            title: b.type === "internal" ? "Booked" : b.summary || "External",
            start: b.start,
            end: b.end,
            backgroundColor: "#d9534f",
            textColor: "#fff",
          })),
        ];

        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  }, [propertyId]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-3">Property Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default PropertyCalendar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./myBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/my")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error loading bookings", err))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "canceled" } : b
        )
      );
      alert("✅ Booking canceled");
    } catch (err) {
      alert("⚠️ Failed to cancel booking");
    }
  };

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <img
            src="/Images/empty-trips.png"
            alt="No bookings"
            className="empty-image"
          />
          <h3>No trips booked... yet!</h3>
          <p>
            Time to dust off your bags and start planning your next adventure.
          </p>
          <Link to="/listing" className="explore-btn">
            Explore Stays
          </Link>
        </div>
      ) : (
        <ul className="booking-list">
          {bookings.map((b) => (
            <li key={b.id} className="booking-card">
              <h3>{b.property?.title || "Property"}</h3>
              <p>
                📅 {b.check_in} → {b.check_out}
              </p>
              <p>Status: <strong>{b.status}</strong></p>
              {b.status === "active" && (
                <button onClick={() => cancelBooking(b.id)}>
                  Cancel Booking
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;

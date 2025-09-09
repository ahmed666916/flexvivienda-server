import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import api from "../services/api";
import "./booking.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { check_in, check_out, price, propertyId } = location.state || {};
  const nightlyPrice = Number(price) || 0;

  const [formData, setFormData] = useState({
    guests: 1,
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  if (!check_in || !check_out) {
  return <p>Invalid booking data. Please select dates again.</p>;
}

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  };

    const days = Math.ceil(
    (new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = days * nightlyPrice * formData.guests;

      const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const bookingData = {
          property_id: propertyId,
          check_in,
          check_out,
        };

        const res = await api.post("/bookings", bookingData);

        alert("🎉 Booking successful!");
        navigate("/my-bookings");
      } catch (err) {
        alert("⚠️ " + (err.data?.message || "Booking failed"));
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="booking-page-container">
      <div className="booking-wrapper">
        {/* LEFT SIDE - Summary */}
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <p>
            📅 {new Date(check_in).toDateString()} -{" "}
            {new Date(check_out).toDateString()}
          </p>
          <p>
            💰 Price per night: <strong>${nightlyPrice.toFixed(2)}</strong>
          </p>
          <p>
            Total Price: <strong>${totalPrice.toFixed(2)}</strong>
          </p>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="booking-form">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "✅ Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./booking.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
const { startDate, endDate, price } = location.state || {};
const nightlyPrice = Number(price) || 0;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
  });

  const [loading, setLoading] = useState(false);

  if (!startDate || !endDate) {
    return <p>Invalid booking data. Please select dates again.</p>;
  }

  // ✅ Fix MySQL format issue
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
 const totalPrice = days * nightlyPrice * formData.guests;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      ...formData,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      total_price: totalPrice,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("🎉 Booking successful!");
        navigate("/");
      } else {
        alert("⚠️ Booking failed");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("Something went wrong!");
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
          <p>📅 {new Date(startDate).toDateString()} - {new Date(endDate).toDateString()}</p>
         <p>💰 Price per night: <strong>${nightlyPrice.toFixed(2)}</strong></p>
<p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="booking-form">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={e => setFormData({ ...formData, guests: e.target.value })}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? <div className="loader"></div> : "✅ Confirm Booking"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;

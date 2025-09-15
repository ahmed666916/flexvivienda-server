import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // ✅ axios instance
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./PropertyDetail.css";

const BookingCard = ({ price, propertyId }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch booked dates safely
  useEffect(() => {
    api
      .get(`/properties/${propertyId}/booked-dates`)
      .then((res) => {
        // normalize response
        const data = Array.isArray(res.data) ? res.data : [];
        setBookedDates(data);
      })
      .catch((err) => {
        console.error("Error fetching booked dates", err);
        setBookedDates([]); // fallback so UI doesn’t break
      });
  }, [propertyId]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // ✅ Always safe to map now
  const disabledRanges = bookedDates.map((b) => ({
    startDate: new Date(b.check_in),
    endDate: new Date(b.check_out),
    key: "disabled",
  }));

  const handleBooking = () => {
    const bookingData = {
      check_in: formatDate(state[0].startDate),
      check_out: formatDate(state[0].endDate),
      price,
      propertyId,
    };

    navigate("/booking", { state: bookingData });
  };

  return (
    <div className="booking-card">
      <h2>${price} / night</h2>
      <DateRange
        locale={enUS}
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        disabledDay={(date) =>
          bookedDates.some(
            (b) =>
              date >= new Date(b.check_in) &&
              date <= new Date(b.check_out)
          )
        }
      />

      <button className="book-button" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default BookingCard;

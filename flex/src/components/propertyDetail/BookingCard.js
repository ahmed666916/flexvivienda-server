import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // ✅ use axios instance
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./PropertyDetail.css";

/**
 * BookingCard component displays a price and a date range picker for a single
 * property. It fetches booked date ranges from the backend and disables
 * selection of those dates on the calendar. It navigates to the booking
 * checkout page when the user clicks "Book Now".
 *
 * This updated version adds defensive checks around the bookedDates data to
 * prevent runtime errors. The API may return `null`, an object, or other
 * unexpected formats, so we normalise it to an array. If bookedDates is not
 * an array, we treat it as empty. We also ensure that the state is always
 * initialised to an array of ranges and that disabledDay and disabledRanges
 * rely on the normalised array.
 */
const BookingCard = ({ price, propertyId }) => {
  // Selection state for the date range picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  // Raw booked dates returned from API
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();

  // Fetch booked dates on mount or when propertyId changes
  useEffect(() => {
    api
      .get(`/properties/${propertyId}/booked-dates`)
      .then((res) => {
        // Normalise API response to an array
        const data = res.data;
        if (Array.isArray(data)) {
          setBookedDates(data);
        } else if (data && typeof data === "object" && Array.isArray(data.data)) {
          // In case API wraps data in a `data` property
          setBookedDates(data.data);
        } else {
          setBookedDates([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching booked dates", err);
        setBookedDates([]);
      });
  }, [propertyId]);

  // Helper to format dates as YYYY-MM-DD strings
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Convert booked date objects to date ranges for the picker. We first
  // normalise bookedDates into an array to avoid runtime errors. Each
  // object should have `check_in` and `check_out` fields (strings or dates).
  const bookedArray = Array.isArray(bookedDates) ? bookedDates : [];
  const disabledRanges = bookedArray.map((b, idx) => {
    let start = null;
    let end = null;
    try {
      start = new Date(b.check_in);
      end = new Date(b.check_out);
    } catch {
      // fall back to null if parsing fails
    }
    return {
      startDate: start,
      endDate: end,
      key: `disabled-${idx}`,
    };
  });

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
          // Disable if date falls within any booked range
          bookedArray.some((b) => {
            const checkIn = new Date(b.check_in);
            const checkOut = new Date(b.check_out);
            return date >= checkIn && date <= checkOut;
          })
        }
      />
      <button className="book-button" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default BookingCard;
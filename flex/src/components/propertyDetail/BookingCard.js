// BookingCard.js
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './PropertyDetail.css';

const BookingCard = ({ price }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ]);
  const navigate = useNavigate();

  const handleBooking = () => {
    const bookingData = {
      startDate: state[0].startDate,
      endDate: state[0].endDate,
      price,
    };

    // Redirect to booking page with state
    navigate('/booking', { state: bookingData });
  };

  return (
    <div className="booking-card">
      <h2>${price} / night</h2>
      <DateRange
        locale={enUS}
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <button className="book-button" onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingCard;

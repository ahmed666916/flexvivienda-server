import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { addYears } from 'date-fns';
import enUS from 'date-fns/locale/en-US'; // ✅ Import locale
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
      <button className="book-button">Book Now</button>
    </div>
  );
};

export default BookingCard;

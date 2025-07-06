import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeDropdown.css';

const DateRangeDropdown = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection',
    },
  ]);

  const inputRef = useRef(null);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !document.getElementById('date-range-popup')?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="date-dropdown-wrapper" ref={inputRef}>
      <input
        type="text"
        readOnly
        onClick={() => setOpen(!open)}
        value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
        className="date-input"
      />

      {open && (
        <div
          id="date-range-popup"
          className="date-picker-popup"
        >
          <DateRange
            locale={enUS}
            editableDateInputs={true}
            onChange={(item) => {
              setState([item.selection]);
              onChange?.(item.selection);
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction="horizontal"
            className="calendar-range"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;

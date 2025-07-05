import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  // Position the popup under the input
  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  const popup = (
    <div
      id="date-range-popup"
      className="date-picker-popup"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        minWidth: 320,
        zIndex: 9999,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      }}
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
        months={window.innerWidth < 600 ? 1 : 2}
        direction={window.innerWidth < 600 ? 'vertical' : 'horizontal'}
        className="calendar-range"
      />
    </div>
  );

  return (
    <>
      <input
        type="text"
        readOnly
        onClick={() => setTimeout(() => setOpen(true), 50)} // Prevent instant close
        value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
        className="date-input"
        ref={inputRef}
      />
      {open && ReactDOM.createPortal(popup, document.body)}
    </>
  );
};

export default DateRangeDropdown;

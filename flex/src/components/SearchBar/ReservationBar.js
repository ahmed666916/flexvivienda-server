// src/components/SearchBar/ReservationBar.js
import React, { useState } from "react";
import "./ReservationBar.css";
import { FaCalendarAlt, FaUser, FaMinus, FaPlus } from "react-icons/fa";

const ReservationBar = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <div className="reservation-bar">
      {/* Check-in */}
      <div className="res-item">
        <FaCalendarAlt />
        <input type="date" />
      </div>

      {/* Check-out */}
      <div className="res-item">
        <FaCalendarAlt />
        <input type="date" />
      </div>

      {/* Adults */}
      <div className="res-item counter">
        <FaUser />
        <span>Adults</span>
        <div className="counter-buttons">
          <button onClick={() => setAdults(Math.max(1, adults - 1))}><FaMinus /></button>
          <span>{adults}</span>
          <button onClick={() => setAdults(adults + 1)}><FaPlus /></button>
        </div>
      </div>

      {/* Children */}
      <div className="res-item counter">
        <FaUser />
        <span>Children</span>
        <div className="counter-buttons">
          <button onClick={() => setChildren(Math.max(0, children - 1))}><FaMinus /></button>
          <span>{children}</span>
          <button onClick={() => setChildren(children + 1)}><FaPlus /></button>
        </div>
      </div>

      <button className="res-btn">Check Availability</button>
    </div>
  );
};

export default ReservationBar;

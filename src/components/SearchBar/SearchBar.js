// src/components/SearchBar/SearchBar.js
import React from 'react';
import './SearchBar.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="missafir-searchbar-wrapper">
      <div className="missafir-searchbar">
        <div className="search-item">
          <FaMapMarkerAlt className="icon" />
          <input type="text" placeholder="Location" />
        </div>
        <div className="search-item">
          <FaCalendarAlt className="icon" />
          <input type="text" placeholder="Dates" />
        </div>
        <div className="search-item">
          <FaUser className="icon" />
          <input type="text" placeholder="Guests" />
        </div>
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;

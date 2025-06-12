import React from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';

const SearchBar = () => (
  <div className="search-bar-container">
    <section className="search-bar">
      
      <div className="input-group">
       
        <input id="location-input" type="text" placeholder="Enter location" />
      </div>

      <div className="input-group">
       
        <DateRangeDropdown id="date-range" />
      </div>

      <div className="input-group">
        
        <input id="guests-input" type="number" placeholder="Guests" />
      </div>

      <div className="input-group search-button-group">
        <label className="invisible-label">Search</label>
        <Link to="/listing">
          <button>Search</button>
        </Link>
      </div>

    </section>
  </div>
);

export default SearchBar;

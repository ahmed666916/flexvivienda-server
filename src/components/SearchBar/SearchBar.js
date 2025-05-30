import React from 'react';
import './SearchBar.css';

const SearchBar = () => (
  <div className="search-bar-container">
    <section className="search-bar">

      {/* <select>
        <option>Short Term</option>
        <option>Long Term</option>
      </select> */}

      <input type="text" placeholder="Location" />
      <input type="date" placeholder="Check-in" />
      <input type="date" placeholder="Check-out" />
      <input type="number" placeholder="Guests" />
      
      
      <button>Search</button>
    </section>
  </div>
);

export default SearchBar;

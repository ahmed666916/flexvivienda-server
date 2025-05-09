import React from 'react';
import './SearchBar.css'; // Create corresponding CSS for styling

const SearchBar = () => (
  <section className="search-bar">
    <input type="text" placeholder="Location" />
    <input type="date" placeholder="Check-in" />
    <input type="date" placeholder="Check-out" />
    <input type="number" placeholder="Guests" />
    <button>Search</button>
  </section>
);

export default SearchBar;

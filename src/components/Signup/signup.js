import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [showCodes, setShowCodes] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch the country data from the provided JSON
    fetch('https://country-code-au6g.vercel.app/Country.json')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Sign Up</h2>

        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />

        <div className="phone-input">
          <div className="country-code" onClick={() => setShowCodes(!showCodes)}>
            {countryCode}
          </div>
          {showCodes && (
            <div className="country-dropdown">
              {countries.map((country, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCountryCode(country.dial_code);
                    setShowCodes(false);
                  }}
                >
                  {country.flag} {country.name} ({country.dial_code})
                </div>
              ))}
            </div>
          )}
          <input type="tel" placeholder="Phone Number" required />
        </div>

        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

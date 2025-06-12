import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [showCodes, setShowCodes] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://country-code-au6g.vercel.app/Country.json')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form">
          <h2>Sign Up</h2>

          <div className="input-group">
            <input type="text" id="fullname" required />
            <label htmlFor="fullname">Full Name</label>
          </div>

          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group phone-wrapper">
          <div className="phone-input">
            <div className="country-code" onClick={() => setShowCodes(!showCodes)}>
              {countryCode}
            </div>
            <input type="tel" id="phone" required placeholder=" " />
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
            <label htmlFor="phone" className="phone-label">Phone Number</label>
          </div>
        </div>



          <div className="input-group">
            <input type="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>

          <div className="input-group">
            <input type="password" id="confirm-password" required />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>

          <button type="submit" className="btn-signup">Create Account</button>

          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

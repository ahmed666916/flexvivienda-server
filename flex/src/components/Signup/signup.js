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
    <div className="signup-wrapper">
      <div className="signup-left">
        <form className="signup-form">
          <h2>Sign up now</h2>

          <div className="form-row">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>

          <div className="form-group">
            <input type="email" placeholder="Email address" required />
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>

          <div className="checkbox-row">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">Subscribe to our newsletter</label>
          </div>

          <button type="submit" className="btn-signup">Sign Up</button>

          <div className="social-signup">
            <p>or sign up with:</p>
            <div className="icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-google"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-github"></i>
            </div>
          </div>
        </form>
      </div>

      <div className="signup-right">
        <img src="/Images/phone.jpg" alt="Signup Visual" />
      </div>
    </div>
  );
};

export default Signup;

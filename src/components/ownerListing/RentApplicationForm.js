import React from 'react';
import './RentApplicationForm.css';

const RentApplicationForm = () => {
  return (
    <section className="rent-form-section">
      <div className="rent-form-container">
        {/* Left: Form */}
        <div className="form-left">
          <h2>Apply to Rent Your Property</h2>
          <form className="rent-form">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Enter your city" />
            </div>
            <div className="form-group">
              <label>District</label>
              <input type="text" placeholder="Enter your district" />
            </div>
            <div className="form-group">
              <label>Neighborhood</label>
              <input type="text" placeholder="Enter your neighborhood" />
            </div>
            <div className="form-group">
              <label>Number of Apartments in Building</label>
              <select>
                <option value="">Select</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11+">11+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select>
                <option value="">Select</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tourism License</label>
              <select>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="form-right">
          <img src="images/rent_prop.jpg" alt="Rental Property" />
        </div>
      </div>
    </section>
  );
};

export default RentApplicationForm;

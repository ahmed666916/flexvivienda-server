import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Full Name" name="name" required />
          <input type="email" placeholder="Email Address" name="email" required />
          <input type="tel" placeholder="Phone Number" name="phone" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

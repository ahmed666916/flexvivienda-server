import React from 'react';
import './ContactUs.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <h2 className="contact-heading">Get in Touch</h2>
      <p className="contact-subheading">
        We’re here to help and answer any question you might have. We look forward to hearing from you!
      </p>

      <div className="contact-flex">
        {/* LEFT SIDE: CONTACT INFO */}
        <div className="contact-info-box">
          <div className="contact-info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Daire 2, kat 1 , block C, onalti dokuz residans, kazliçeşme, zeytinburnu</p>
          </div>
          <div className="contact-info-item">
            <FaPhoneAlt className="contact-icon" />
            +90 538 680 7740
          
          </div>
          <div className="contact-info-item">
            <FaPhoneAlt className="contact-icon" />
            +90 538 648 3175
          </div>
          <div className="contact-info-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:flex@flatix.com">flex@flatix.com</a>
          </div>
          <div className="contact-info-item">
            <FaWhatsapp className="contact-icon" />
            <a href="https://wa.me/905386807740" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="contact-form-box">
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="contact-map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12044.574557431678!2d28.911352!3d40.990429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzI1LjAiTiAyOMKwNTQnMTguNSJF!5e0!3m2!1str!2str!4v1685695201760!5m2!1str!2str"

          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

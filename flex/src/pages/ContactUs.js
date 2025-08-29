import React, { useState } from 'react';
import './ContactUs.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');

    try {
      const response = await fetch("http://localhost:8000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' }); // reset form
      } else {
        setResponseMsg("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMsg("⚠️ Something went wrong. Please try later.");
    }

    setLoading(false);
  };

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
            Daire 2, kat 1 , block C, onalti dokuz residans, kazliçeşme, zeytinburnu
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              value={formData.subject} 
              onChange={handleChange} 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {responseMsg && <p className="response-message">{responseMsg}</p>}
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="contact-map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1304.6617317990278!2d28.909347242243374!3d40.989237105367806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb9ea144f72b%3A0x1ef28e34a03e911b!2sOnalti%20Dokuz%20Istanbul!5e1!3m2!1sen!2ses!4v1750966036006!5m2!1sen!2ses"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

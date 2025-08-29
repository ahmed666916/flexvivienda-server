import React, { useState, forwardRef } from 'react';
import './RentApplicationForm.css';

const faqs = [
  {
    question: "How long does the application process take?",
    answer: "Typically, it takes 1–3 business days after submission.",
  },
  {
    question: "Do I need a tourism license?",
    answer: "Not necessarily, but it’s preferred. We can guide you through it.",
  },
  {
    question: "What cities do you operate in?",
    answer: "We currently serve Istanbul, Antalya, and Izmir.",
  },
  {
    question: "Can I manage multiple properties?",
    answer: "Absolutely. We specialize in multi-property management.",
  },
];

const RentApplicationForm = forwardRef((props, ref) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    num_apartments: "",
    property_type: "",
    tourism_license: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://app.flexvivienda.com/api/rent-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Application submitted successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          city: "",
          district: "",
          neighborhood: "",
          num_apartments: "",
          property_type: "",
          tourism_license: ""
        });
      } else {
        setMessage("❌ " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rent-form-section" ref={ref}>
      <div className="rent-form-container">
        {/* Left: Form */}
        <div className="form-left">
          <h2>Apply to Rent Your Property</h2>
          <form className="rent-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter your district"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Neighborhood</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Enter your neighborhood"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Number of Apartments in Building</label>
              <select
                name="num_apartments"
                value={formData.num_apartments}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11+">11+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tourism License</label>
              <select
                name="tourism_license"
                value={formData.tourism_license}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Loader + Message */}
          {loading && <div className="loader">⏳ Please wait...</div>}
          {message && <p className="form-message">{message}</p>}
        </div>

        {/* Right: FAQ */}
        <div className="faq-right">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">{faq.question}</div>
                {openIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default RentApplicationForm;

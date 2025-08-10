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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section className="rent-form-section" ref={ref}>
      <div className="rent-form-container">
        {/* Left: Form */}
        <div className="form-left">
          <h2>Apply to Rent Your Property</h2>
          <form className="rent-form">
            {/* Form fields as before */}
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

// src/components/FAQ.js
import React, { useState } from 'react';
import './FAQ.css'; // Reuse existing styles

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-right">
      <center><h2 className="faq-title">Frequently Asked Questions</h2></center>
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
  );
};

export default FAQ;

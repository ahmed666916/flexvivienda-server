import React from 'react';
import './Testimonial.css'; // Create corresponding CSS for styling

const testimonials = [
  {
    id: 1,
    name: 'Yiğit Demiray',
    feedback: 'Güvenlik açısından çok iyiydi mutfak gereçleri vardı...',
  },
  {
    id: 2,
    name: 'Sevval Kaya',
    feedback: 'Her şey çok güzeldi ve ev inanılmazdı...',
  },
  {
    id: 3,
    name: 'Sevval Kaya',
    feedback: 'Her şey çok güzeldi ve ev inanılmazdı...',
  },
  // Add more testimonials as needed
];

const Testimonials = () => (
  <section className="testimonials">
    <h2>Konuklarımızdan Missafir Yorumları</h2>
    <div className="testimonial-cards">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <p>"{testimonial.feedback}"</p>
          <h4>- {testimonial.name}</h4>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;

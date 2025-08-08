import React from 'react';
import './Testimonial.css';

const bookingLogo = '/Images/booking.png';
const airbnbLogo = '/Images/airbnb.png';

const testimonials = [
  {
    id: 1,
    name: 'Yiğit Demiray',
    feedback: 'Güvenlik açısından çok iyiydi, mutfak gereçleri vardı...',
    source: 'booking.com',
  },
  {
    id: 2,
    name: 'Sevval Kaya',
    feedback: 'Her şey çok güzeldi ve ev inanılmazdı...',
    source: 'booking.com',
  },
  {
    id: 3,
    name: 'Sevval Kaya',
    feedback: 'Ev çok temizdi, lokasyon harikaydı!',
    source: 'airbnb',
  },
];

const getSourceClass = (source) => {
  return source === 'airbnb' ? 'airbnb-card' : 'booking-card-testimonial';
};

const getSourceLogo = (source) => {
  return source === 'airbnb' ? airbnbLogo : bookingLogo;
};

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2 className="heading">
        <span className="heading-black">Konuklarımızdan</span>{' '}
        <span className="heading-red">Missafir Yorumları</span>
      </h2>
      <p className="heading-subtext">Gerçek kullanıcı deneyimlerine göz atın</p>


      <div className="testimonial-cards">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`testimonial-card ${getSourceClass(testimonial.source)}`}
          >
            <div className="source-header">
              <img
                src={getSourceLogo(testimonial.source)}
                alt={testimonial.source}
                className="source-logo"
                onError={(e) => (e.target.style.display = 'none')}
              />
              <span className="source-name">{testimonial.source}</span>
            </div>
            <p>"{testimonial.feedback}"</p>
            <h4>- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

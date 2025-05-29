import React, { useEffect, useRef } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    type: 'quote',
    name: 'Sarah M.',
    content: 'FlexVivienda helped me earn 32% more in just 3 months. Their team handles everything!',
    stat: '+32% income in first 3 months',
  },
  {
    type: 'video',
    name: 'Carlos G.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stat: '85% occupancy rate achieved',
  },
  {
    type: 'quote',
    name: 'Elena R.',
    content: 'I travel frequently and FlexVivienda makes renting my home worry-free. Totally hands-off!',
    stat: '+27% ROI in the first quarter',
  },
  {
    type: 'video',
    name: 'Mark D.',
    videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    stat: 'Increased guest ratings to 4.9⭐',
  },
];

const Testimonials = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // speed multiplier
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Owner Testimonials & Case Studies</h2>
      <div className="testimonials-scroll" ref={scrollRef}>
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            {item.type === 'quote' ? (
              <>
                <p className="quote">“{item.content}”</p>
                <p className="author">— {item.name}</p>
                <p className="stat">{item.stat}</p>
              </>
            ) : (
              <>
                <div className="video-wrapper">
                  <iframe
                    width="100%"
                    height="200"
                    src={item.videoUrl}
                    title={`Testimonial from ${item.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="author">— {item.name}</p>
                <p className="stat">{item.stat}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useEffect, useRef, useState } from 'react';
import './BecomeMissafirSteps.css';

const steps = [
  {
    title: 'Step 1',
    description: 'Calculate Potential Earnings',
    image: 'Images/potential_earning.jpg',
  },
  {
    title: 'Step 2',
    description: 'Home Visit',
    image: 'Images/home_visit.jpg',
  },
  {
    title: 'Step 3',
    description: 'Key Handover',
    image: 'Images/key_handover.jpg',
  },
  {
    title: 'Step 4',
    description: 'Professional Photography',
    image: 'Images/photography.jpg',
  },
  {
    title: 'Step 5',
    description: 'Listing Publication',
    image: 'Images/list.jpg',
  },
];

const BecomeMissafirSteps = () => {
  const stepRefs = useRef([]);
  const [showArrows, setShowArrows] = useState([]);

  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate cards and arrows one by one
          steps.forEach((_, i) => {
            setTimeout(() => {
              stepRefs.current[i]?.classList.add('animate-in');

              if (i < steps.length - 1) {
                setTimeout(() => {
                  setShowArrows((prev) => {
                    const updated = [...prev];
                    updated[i] = true;
                    return updated;
                  });
                }, 500);
              }
            }, i * 800); // slow delay between each step
          });
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  return (
    <section className="steps-section" ref={sectionRef}>
      <h2>Rent your home in 5 Steps</h2>
      <div className="steps-row">
        {steps.map((step, index) => (
          <div className="step-horizontal" key={index}>
            <div
              className="step-card"
              ref={(el) => (stepRefs.current[index] = el)}
            >
              <img src={step.image} alt={step.title} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`arrow-svg ${index % 2 === 0 ? 'top' : 'bottom'} ${
                  showArrows[index] ? 'visible' : ''
                }`}
              >
                <svg
                  width="100"
                  height="60"
                  viewBox="0 0 100 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={
                      index % 2 === 0
                        ? 'M10,50 Q50,0 90,50'
                        : 'M10,10 Q50,60 90,10'
                    }
                    stroke="#F22048"
                    strokeWidth="4"
                    fill="transparent"
                    markerEnd="url(#arrowhead)"
                  />
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="0"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 6 3, 0 6" fill="#F22048" />
                    </marker>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BecomeMissafirSteps;

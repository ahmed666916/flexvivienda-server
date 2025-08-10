import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

const blogs = [
  {
    id: 1,
    title: '5 Tips for Buying Your First Home',
    date: 'May 20, 2025',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
  },
  {
    id: 2,
    title: 'The Istanbul Property Market in 2025',
    date: 'May 18, 2025',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
  },
  {
    id: 3,
    title: 'How to Choose the Right Neighborhood',
    date: 'May 15, 2025',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
  },
  {
    id: 4,
    title: 'Home Staging Secrets Revealed',
    date: 'May 10, 2025',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
  },
  {
    id: 5,
    title: 'Home Staging Secrets Revealed',
    date: 'May 10, 2025',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
  },
];

const Blog = () => {
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
      const walk = (x - startX) * 2;
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
    <>
      <center>
      <center>
        <h2 className="blog-section-title heading">
          <span className="heading-black">Latest</span>{' '}
          <span className="heading-red">Blog Posts</span>
        </h2>
      </center>

      </center>
      <div className="blog-container" ref={scrollRef}>
        {blogs.map((blog) => (
          <Link to="/blog-detail" key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <p className="blog-date">{blog.date}</p>
              <h3 className="blog-title">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <center><span className="blog-links"><Link to="/blogs">See All Blogs</Link></span></center>
    </>
  );
};
export default Blog;

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

const Blog = () => {
  const scrollRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Laravel API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  // Horizontal drag-to-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

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

  if (loading) return <p>Loading blogs...</p>;

  return (
    <>
      <center>
        <h2 className="blog-section-title heading">
          <span className="heading-black">Latest</span>{' '}
          <span className="heading-red">Blog Posts</span>
        </h2>
      </center>

      <div className="blog-container" ref={scrollRef}>
        {blogs.map((blog) => (
          <Link to={`/blog-detail/${blog.id}`} key={blog.id} className="blog-card">
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="blog-image" />
            )}
            <div className="blog-content">
              <p className="blog-date">{blog.date}</p>
              <h3 className="blog-title">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <center>
        <span className="blog-links">
          <Link to="/blogs">See All Blogs</Link>
        </span>
      </center>
    </>
  );
};

export default Blog;

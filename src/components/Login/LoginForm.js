import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo */}
        <div className="logo">
          <img src="/Images/logo.png" alt="Logo" /> {/* Put your logo in public folder as logo.png */}
        </div>

        {/* Login Form */}
        <form className="login-form">
          <h2>Login</h2>

          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input type="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn-login">Login</button>

          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

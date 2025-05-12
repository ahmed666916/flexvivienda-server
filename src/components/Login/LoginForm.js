import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />

        <input type="password" placeholder="Password" required />
      

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

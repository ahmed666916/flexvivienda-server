import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/Images/lifestyle.jpg" alt="Login Visual" />
      </div>
      <div className="login-right">
        <div className="form-box">
          <div className="logo">🧱 <strong>Logo</strong></div>
          <h2>Sign into your account</h2>

          <form>
            <div className="form-group">
              <input type="email" placeholder="Email address" required />
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" required />
            </div>

            <button type="submit" className="btn-login">LOGIN</button>

            <div className="form-links">
              <a href="/forgot-password">Forgot password?</a>
              <p>
                Don’t have an account? <a href="/signup">Register here</a>
              </p>
            </div>

            <div className="terms">
              <a href="/terms">Terms of use</a>. <a href="/privacy">Privacy policy</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

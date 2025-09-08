import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import api from "../../services/api";
import "./LoginForm.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", formData);
      login(res.data.user, res.data.token);
      alert("✅ Logged in successfully!");
      navigate("/");
    } catch (err) {
      alert("⚠️ " + (err.data?.message || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT SIDE IMAGE */}
      <div className="login-left">
        <img src="/Images/lifestyle.jpg" alt="Login Visual" />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="login-right">
        <div className="form-box">
          <div className="logo">🧱 <strong>Logo</strong></div>
          <h2>Sign into your account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Loading..." : "LOGIN"}
            </button>

            {/* Links below the button */}
            <div className="form-links">
              <Link to="/forgot-password">Forgot password?</Link>
              <p>
                Don’t have an account? <Link to="/signup">Register here</Link>
              </p>
            </div>

            <div className="terms">
              <Link to="/terms">Terms of use</Link>.{" "}
              <Link to="/privacy">Privacy policy</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

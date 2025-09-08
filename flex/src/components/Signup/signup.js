import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext"; // <-- correct path
import api from "../../services/api"; // <-- go up 2 levels

import "./Signup.css";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/register", formData);
      login(res.data.user, res.data.token);
      alert("🎉 Account created successfully!");
      navigate("/");
    } catch (err) {
      alert("⚠️ " + (err.data?.message || "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up now</h2>
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            required
          />
          <button type="submit" className="btn-signup" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="signup-right">
        <img src="/Images/phone.jpg" alt="Signup Visual" />
      </div>
    </div>
  );
};

export default Signup;

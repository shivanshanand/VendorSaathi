import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, 
        form,
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
      <div className="font-bold text-xl mb-2 text-orange-700">Login</div>
      <div className="text-gray-600 mb-4">Enter your login information</div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email || ""}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password || ""}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

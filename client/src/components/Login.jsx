import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Demo credentials
const SUPPLIER_CREDENTIALS = {
  email: "supplier@demo.com",
  password: "supplier123",
};
const VENDOR_CREDENTIALS = { email: "vendor@demo.com", password: "vendor123" };

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let role = null;
    if (
      form.email === SUPPLIER_CREDENTIALS.email &&
      form.password === SUPPLIER_CREDENTIALS.password
    ) {
      role = "supplier";
    } else if (
      form.email === VENDOR_CREDENTIALS.email &&
      form.password === VENDOR_CREDENTIALS.password
    ) {
      role = "vendor";
    }
    if (role) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: form.email, role })
      );
      setLoading(false);
      if (onLogin) onLogin();
      navigate("/dashboard");
    } else {
      setError(
        "Invalid credentials. Use supplier@demo.com/supplier123 or vendor@demo.com/vendor123"
      );
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8 space-y-6 max-w-md mx-auto flex flex-col items-center"
    >
      <div className="font-bold text-2xl mb-2 text-orange-700 tracking-wide">Sign In</div>
      <div className="text-gray-600 mb-4 text-center">
        Demo login only. Use:<br />
        <span className="font-semibold text-orange-600">supplier@demo.com / supplier123</span> <br />
        <span className="font-semibold text-orange-600">vendor@demo.com / vendor123</span>
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email || ""}
        onChange={handleChange}
        className="w-full border-2 border-orange-200 rounded px-3 py-2 focus:outline-none focus:border-orange-500 transition"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password || ""}
        onChange={handleChange}
        className="w-full border-2 border-orange-200 rounded px-3 py-2 focus:outline-none focus:border-orange-500 transition"
        required
      />
      {error && <div className="text-red-600 text-sm text-center w-full">{error}</div>}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-orange-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

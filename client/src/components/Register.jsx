import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Register = ({ role }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vendorFields = [
    { name: "name", label: "Your Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "shopName", label: "Shop Name", type: "text" },
    {
      name: "whatSell",
      label: "What You Sell",
      type: "select",
      options: [
        "Select Business Type",
        "Fruits",
        "Vegetables",
        "Spices",
        "Snacks",
        "Other",
      ],
    },
    { name: "area", label: "Area", type: "text" },
    {
      name: "city",
      label: "City",
      type: "select",
      options: ["Select City", "Mumbai", "Delhi", "Bangalore", "Other"],
    },
    {
      name: "years",
      label: "Years in Business",
      type: "select",
      options: ["Select Experience", "<1", "1-3", "3-5", ">5"],
    },
  ];

  const supplierFields = [
    { name: "name", label: "Contact Person", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "businessName", label: "Business Name", type: "text" },
    {
      name: "whatSupply",
      label: "What You Supply",
      type: "select",
      options: ["Select Category", "Vegetables", "Spices", "Grains", "Other"],
    },
    { name: "warehouse", label: "Warehouse", type: "text" },
    { name: "area", label: "Area", type: "text" },
    {
      name: "city",
      label: "City",
      type: "select",
      options: ["Select City", "Mumbai", "Delhi", "Bangalore", "Other"],
    },
  ];

  const fields = role === "vendor" ? vendorFields : supplierFields;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/auth/register`,
        { ...form, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoading(false);
        navigate("/dashboard");
      }
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white rounded-lg shadow p-6 mb-8 space-y-4"
    >
      <div className="font-bold text-xl mb-2 text-orange-700">
        {role === "vendor" ? "Vendor Registration" : "Supplier Registration"}
      </div>
      <div className="text-gray-600 mb-4">Enter your details below</div>
      {fields.map((f) =>
        f.type === "select" ? (
          <select
            key={f.name}
            name={f.name}
            value={form[f.name] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            {f.options.map((opt, i) => (
              <option
                key={i}
                value={i === 0 ? "" : opt}
                disabled={i === 0}
              >
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            key={f.name}
            type={f.type}
            name={f.name}
            placeholder={f.label}
            value={form[f.name] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        )
      )}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className={`w-full ${
          role === "vendor" ? "bg-orange-600" : "bg-green-600"
        } text-white py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-60`}
        disabled={loading}
      >
        {loading
          ? "Registering..."
          : role === "vendor"
          ? "Create Vendor Account"
          : "Create Supplier Account"}
      </button>
    </form>
  );
};

export default Register;

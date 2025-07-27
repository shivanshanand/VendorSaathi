import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "../utils/i18n";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Register = ({ role }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vendorFields = [
    { name: "name", label: t("yourName"), type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: t("mobile"), type: "text" },
    { name: "password", label: t("password"), type: "password" },
    { name: "shopName", label: t("shopName"), type: "text" },
    {
      name: "whatSell",
      label: t("whatSell"),
      type: "select",
      options: [
        t("selectBusiness"),
        "Fruits",
        "Vegetables",
        "Spices",
        "Snacks",
        "Other",
      ],
    },
    { name: "area", label: t("area"), type: "text" },
    {
      name: "city",
      label: t("city"),
      type: "select",
      options: [t("selectCity"), "Mumbai", "Delhi", "Bangalore", "Other"],
    },
    {
      name: "years",
      label: t("years"),
      type: "select",
      options: [t("selectExperience"), "<1", "1-3", "3-5", ">5"],
    },
  ];

  const supplierFields = [
    { name: "name", label: t("contactPerson"), type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: t("mobile"), type: "text" },
    { name: "password", label: t("password"), type: "password" },
    { name: "businessName", label: t("businessName"), type: "text" },
    {
      name: "whatSupply",
      label: t("whatSupply"),
      type: "select",
      options: [t("selectCategory"), "Vegetables", "Spices", "Grains", "Other"],
    },
    { name: "warehouse", label: t("warehouse"), type: "text" },
    { name: "area", label: t("area"), type: "text" },
    {
      name: "city",
      label: t("city"),
      type: "select",
      options: [t("selectCity"), "Mumbai", "Delhi", "Bangalore", "Other"],
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
        {role === "vendor" ? t("vendorReg") : t("supplierReg")}
      </div>
      <div className="text-gray-600 mb-4">{t("enterInfo")}</div>
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
                value={
                  opt === t("selectBusiness") ||
                  opt === t("selectCategory") ||
                  opt === t("selectCity") ||
                  opt === t("selectExperience")
                    ? ""
                    : opt
                }
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
          ? t("registration") + "..."
          : role === "vendor"
          ? t("createVendor")
          : t("createSupplier")}
      </button>
    </form>
  );
};

export default Register;

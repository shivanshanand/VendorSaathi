import React from "react";

const Benefits = ({ role }) => {
  const vendorBenefits = [
    { label: "Savings", desc: "Wholesale Rates", sub: "Get the best prices for your shop with direct access to wholesale suppliers." },
    { label: "Daily Delivery", desc: "Fresh Supply", sub: "Enjoy reliable daily delivery of fresh materials to your doorstep." },
    { label: "AI Assistant", desc: "Smart Support", sub: "Get instant help and answers with our built-in AI assistant." },
  ];

  const supplierBenefits = [
    { label: "Bulk Orders", desc: "Consistent Demand", sub: "Receive regular bulk orders from verified vendors." },
    { label: "Fast Payment", desc: "Quick Settlements", sub: "Get paid quickly and securely for every delivery." },
    { label: "Analytics", desc: "Business Insights", sub: "Track your sales and performance with easy analytics." },
  ];

  const benefits = role === "vendor" ? vendorBenefits : supplierBenefits;

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-6 mb-8">
      <div className="font-bold text-xl mb-2 text-orange-700">
        {role === "vendor" ? "Vendor Benefits" : "Supplier Benefits"}
      </div>
      <div className="text-gray-700 mb-4">
        {role === "vendor"
          ? "Why join as a vendor? Unlock exclusive rates, daily delivery, and smart support."
          : "Why join as a supplier? Get bulk orders, fast payments, and business insights."}
      </div>
      <ul className="space-y-4">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap min-w-[80px] text-center">
              {b.label}
            </span>
            <div>
              <div className="font-semibold">{b.desc}</div>
              <div className="text-gray-500 text-sm">{b.sub}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;

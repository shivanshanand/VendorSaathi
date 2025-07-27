import React from "react";
import { t } from "../utils/i18n";

const Benefits = ({ role }) => {
  const vendorBenefits = [
    { label: t("savings"), desc: t("wholesaleRates"), sub: t("wholesaleRatesDesc") },
    { label: t("dailyDelivery"), desc: t("freshSupply"), sub: t("freshSupplyDesc") },
    { label: t("hindiSupport"), desc: t("aiAssistant"), sub: t("aiAssistantDesc") },
  ];

  const supplierBenefits = [
    { label: t("bulkOrders"), desc: t("bulkOrders"), sub: t("bulkOrdersDesc") },
    { label: t("fastPayment"), desc: t("fastPayment"), sub: t("fastPaymentDesc") },
    { label: t("analytics"), desc: t("analytics"), sub: t("analyticsDesc") },
  ];

  const benefits = role === "vendor" ? vendorBenefits : supplierBenefits;

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-6 mb-8">
      <div className="font-bold text-xl mb-2 text-orange-700">
        {role === "vendor" ? t("vendorBenefits") : t("supplierBenefits")}
      </div>
      <div className="text-gray-700 mb-4">
        {role === "vendor" ? t("vendorBenefitsDesc") : t("supplierBenefitsDesc")}
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

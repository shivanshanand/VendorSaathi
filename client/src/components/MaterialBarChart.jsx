import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const MaterialBarChart = ({ materials }) => {
  // Prepare data for chart
  const data = materials.map((m) => ({
    name: m.name,
    Stock: m.minQuantity,
    Price: m.price,
    Available: m.available ? 1 : 0,
  }));

  return (
    <div className="w-full h-64 bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold mb-2">Material Stock & Price Overview</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Stock" fill="#fb923c" radius={[8,8,0,0]} />
          <Bar dataKey="Price" fill="#34d399" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaterialBarChart;

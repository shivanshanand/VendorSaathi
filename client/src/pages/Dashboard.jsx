import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
// import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: Math.floor(Math.random() * 500 + 100),
    revenue: Math.floor(Math.random() * 100000 + 50000),
    pendingOrders: Math.floor(Math.random() * 20 + 5),
    activeGroupBuys: Math.floor(Math.random() * 10 + 1),
  });
  const [recentOrders, setRecentOrders] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      _id: i + 1,
      orderId: 1000 + i,
      createdAt: new Date(Date.now() - i * 86400000),
      supplierName: `Supplier ${i + 1}`,
      vendorName: `Vendor ${i + 1}`,
      amount: Math.floor(Math.random() * 5000 + 500),
      status: ["completed", "pending", "cancelled"][Math.floor(Math.random() * 3)],
    }))
  );
  const user = getCurrentUser();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-700">
        Welcome!
      </h1>

      {/* Demo Graph */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Revenue Trend</h2>
        <svg viewBox="0 0 400 100" className="w-full h-24">
          <polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="4"
            points="20,80 60,60 100,70 140,40 180,50 220,30 260,60 300,20 340,50 380,30"
          />
          <circle cx="380" cy="30" r="5" fill="#f97316" />
        </svg>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">₹{stats.revenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Active Group Buys</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeGroupBuys}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user.role === "vendor" ? "Supplier" : "Vendor"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role === "vendor"
                      ? order.supplierName
                      : order.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

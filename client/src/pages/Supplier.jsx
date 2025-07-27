import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
import { motion } from "framer-motion";
import MaterialBarChart from "../components/MaterialBarChart";

const Supplier = () => {
  // Dummy data for demo
  const [materials, setMaterials] = useState([
    {
      _id: "1",
      name: "Potato",
      category: "Vegetables",
      price: 20,
      unit: "kg",
      minQuantity: 50,
      available: true,
    },
    {
      _id: "2",
      name: "Chili Powder",
      category: "Spices",
      price: 120,
      unit: "kg",
      minQuantity: 10,
      available: false,
    },
    {
      _id: "3",
      name: "Rice",
      category: "Grains",
      price: 45,
      unit: "kg",
      minQuantity: 100,
      available: true,
    },
  ]);
  const [groupBuys, setGroupBuys] = useState([
    {
      _id: "g1",
      material: {
        name: "Potato",
        category: "Vegetables",
        price: 20,
        unit: "kg",
      },
      currentQuantity: 120,
      targetQuantity: 200,
      vendors: [1, 2, 3, 4],
      deadline: Date.now() + 86400000,
      status: "active",
    },
    {
      _id: "g2",
      material: {
        name: "Rice",
        category: "Grains",
        price: 45,
        unit: "kg",
      },
      currentQuantity: 60,
      targetQuantity: 100,
      vendors: [1, 2],
      deadline: Date.now() + 172800000,
      status: "pending",
    },
  ]);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    minQuantity: "",
    available: true,
  });
  const user = getCurrentUser();

  // Demo submit just adds to local state
  const handleNewMaterialSubmit = (e) => {
    e.preventDefault();
    setMaterials((prev) => [
      {
        _id: Math.random().toString(36).slice(2),
        ...newMaterial,
      },
      ...prev,
    ]);
    setNewMaterial({
      name: "",
      category: "",
      price: "",
      unit: "",
      minQuantity: "",
      available: true,
    });
  };

  const handleMaterialChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMaterial((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Demo stats
  const stats = [
    {
      label: "Total Materials",
      value: materials.length,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Active Group Buys",
      value: groupBuys.filter((g) => g.status === "active").length,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Pending Group Buys",
      value: groupBuys.filter((g) => g.status === "pending").length,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Unavailable Materials",
      value: materials.filter((m) => !m.available).length,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Stats */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className={`rounded-lg shadow p-6 flex flex-col items-center justify-center ${stat.color}`}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-3xl font-bold mb-2">{stat.value}</span>
            <span className="text-sm font-medium">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Material Bar Chart (Recharts) */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <MaterialBarChart materials={materials} />
      </motion.div>

      {/* Add New Material */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Material</h2>
        <form
          onSubmit={handleNewMaterialSubmit}
          className="bg-white rounded-lg shadow p-6 max-w-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Name
              </label>
              <input
                type="text"
                name="name"
                value={newMaterial.name}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={newMaterial.category}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Spices">Spices</option>
                <option value="Grains">Grains</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Per Unit
              </label>
              <input
                type="number"
                name="price"
                value={newMaterial.price}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={newMaterial.unit}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="units">units</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Quantity
              </label>
              <input
                type="number"
                name="minQuantity"
                value={newMaterial.minQuantity}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={newMaterial.available}
                onChange={handleMaterialChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Available
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Add Material
          </button>
        </form>
      </motion.div>

      {/* Materials List */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Your Materials</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <motion.tr
                  key={material._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {material.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{material.price}/{material.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {material.minQuantity} {material.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        material.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {material.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Active Group Buys */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Active Group Buys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupBuys.map((groupBuy) => (
            <motion.div
              key={groupBuy._id}
              className="bg-white rounded-lg shadow p-6"
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {groupBuy.material.name}
                  </h3>
                  <p className="text-gray-600">{groupBuy.material.category}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${
                    groupBuy.status === "active"
                      ? "bg-green-100 text-green-800"
                      : groupBuy.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {groupBuy.status.charAt(0).toUpperCase() + groupBuy.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Price Per Unit:</span> ₹
                  {groupBuy.material.price}/{groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Quantity:</span>{" "}
                  {groupBuy.currentQuantity}/{groupBuy.targetQuantity}{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Participants:</span>{" "}
                  {groupBuy.vendors.length}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(groupBuy.deadline).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Supplier;

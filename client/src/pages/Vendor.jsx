import React, { useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { motion } from "framer-motion";

const Vendor = () => {
  const user = getCurrentUser();

  // Dummy data for demo
  const [materials] = useState([
    {
      _id: "1",
      name: "Tomatoes",
      category: "Vegetable",
      price: 30,
      unit: "kg",
      minQuantity: 10,
    },
    {
      _id: "2",
      name: "Potatoes",
      category: "Vegetable",
      price: 25,
      unit: "kg",
      minQuantity: 20,
    },
    {
      _id: "3",
      name: "Rice",
      category: "Grain",
      price: 60,
      unit: "kg",
      minQuantity: 50,
    },
  ]);
  const [activeGroupBuys] = useState([
    {
      _id: "g1",
      material: materials[0],
      currentQuantity: 40,
      targetQuantity: 100,
      vendors: [{ vendorId: "v1" }, { vendorId: "v2" }],
      status: "active",
      deadline: new Date(Date.now() + 3 * 86400000),
    },
    {
      _id: "g2",
      material: materials[1],
      currentQuantity: 60,
      targetQuantity: 120,
      vendors: [{ vendorId: "v1" }],
      status: "active",
      deadline: new Date(Date.now() + 5 * 86400000),
    },
  ]);
  const [myGroupBuys] = useState([
    {
      _id: "mg1",
      material: materials[2],
      currentQuantity: 80,
      targetQuantity: 150,
      vendors: [{ vendorId: user._id, quantity: 60 }],
      status: "completed",
      deadline: new Date(Date.now() - 2 * 86400000),
    },
  ]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState("");

  // Dummy join handler
  const handleJoinGroupBuy = (groupBuyId) => {
    setQuantity("");
    setSelectedMaterial(null);
    // Optionally show a toast or animation
  };

  return (
    <div className="p-6">
      {/* Available Materials */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-orange-700">
          Available Materials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, idx) => (
            <motion.div
              key={material._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-orange-700">
                    {material.name}
                  </h3>
                  <p className="text-gray-600">{material.category}</p>
                </div>
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-orange-700 transition"
                >
                  Select
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Price:</span> ₹
                  {material.price}/{material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Min Quantity:
                  </span>{" "}
                  {material.minQuantity} {material.unit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create/Join Group Buy Form */}
      {selectedMaterial && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-orange-700">
            Create or Join Group Buy
          </h2>
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg p-6 max-w-2xl border border-orange-100">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-orange-700 mb-2">
                {selectedMaterial.name}
              </h3>
              <p className="text-gray-600">{selectedMaterial.category}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedMaterial.minQuantity}
                  className="w-full border-2 border-orange-200 rounded px-3 py-2 focus:border-orange-500 focus:outline-none"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Minimum: {selectedMaterial.minQuantity}{" "}
                  {selectedMaterial.unit}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Group Buys */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-orange-700">
          Active Group Buys
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeGroupBuys.map((groupBuy, idx) => (
            <motion.div
              key={groupBuy._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-orange-700">
                    {groupBuy.material.name}
                  </h3>
                  <p className="text-gray-600">{groupBuy.material.category}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    groupBuy.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {groupBuy.status.charAt(0).toUpperCase() +
                    groupBuy.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Price:</span> ₹
                  {groupBuy.material.price}/{groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Progress:</span>{" "}
                  {groupBuy.currentQuantity}/{groupBuy.targetQuantity}{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Participants:
                  </span>{" "}
                  {groupBuy.vendors.length}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Deadline:</span>{" "}
                  {new Date(groupBuy.deadline).toLocaleDateString()}
                </p>
              </div>
              {!groupBuy.vendors.includes(user._id) && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={groupBuy.material.minQuantity}
                    className="w-full border-2 border-orange-200 rounded px-3 py-2 mb-2 focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleJoinGroupBuy(groupBuy._id)}
                    className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition"
                  >
                    Join Group Buy
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* My Group Buys */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-orange-700">
          My Group Buys
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myGroupBuys.map((groupBuy, idx) => (
            <motion.div
              key={groupBuy._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-orange-700">
                    {groupBuy.material.name}
                  </h3>
                  <p className="text-gray-600">{groupBuy.material.category}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    groupBuy.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : groupBuy.status === "active"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {groupBuy.status.charAt(0).toUpperCase() +
                    groupBuy.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    My Quantity:
                  </span>{" "}
                  {
                    groupBuy.vendors.find((v) => v.vendorId === user._id)
                      ?.quantity
                  }{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Total Amount:
                  </span>{" "}
                  ₹
                  {groupBuy.vendors.find((v) => v.vendorId === user._id)
                    ?.quantity * groupBuy.material.price}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Group Progress:
                  </span>{" "}
                  {groupBuy.currentQuantity}/{groupBuy.targetQuantity}{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Deadline:</span>{" "}
                  {new Date(groupBuy.deadline).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendor;

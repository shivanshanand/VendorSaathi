import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
import axios from "axios";

const Vendor = () => {
  const [materials, setMaterials] = useState([]);
  const [activeGroupBuys, setActiveGroupBuys] = useState([]);
  const [myGroupBuys, setMyGroupBuys] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    fetchMaterials();
    fetchActiveGroupBuys();
    fetchMyGroupBuys();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/materials/available",
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setMaterials(res.data);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchActiveGroupBuys = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/groupbuy/active", {
        withCredentials: true,
      });
      if (res.data) {
        setActiveGroupBuys(res.data);
      }
    } catch (error) {
      console.error("Error fetching active group buys:", error);
    }
  };

  const fetchMyGroupBuys = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/groupbuy/vendor", {
        withCredentials: true,
      });
      if (res.data) {
        setMyGroupBuys(res.data);
      }
    } catch (error) {
      console.error("Error fetching my group buys:", error);
    }
  };

  const handleJoinGroupBuy = async (groupBuyId) => {
    if (!quantity) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/groupbuy/${groupBuyId}/join`,
        { quantity: Number(quantity) },
        {
          withCredentials: true,
        }
      );

      if (res.ok) {
        setQuantity("");
        setSelectedMaterial(null);
        fetchActiveGroupBuys();
        fetchMyGroupBuys();
      }
    } catch (error) {
      console.error("Error joining group buy:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Available Materials */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{"availableMaterials"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{material.name}</h3>
                  <p className="text-gray-600">{material.category}</p>
                </div>
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200"
                >
                  {"select"}
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{"price"}:</span> ₹
                  {material.price}/{material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"minQuantity"}:</span>{" "}
                  {material.minQuantity} {material.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Join Group Buy Form */}
      {selectedMaterial && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">{"createOrJoinGroupBuy"}</h2>
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {selectedMaterial.name}
              </h3>
              <p className="text-gray-600">{selectedMaterial.category}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {"quantity"}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedMaterial.minQuantity}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  {"minimumQuantity"}: {selectedMaterial.minQuantity}{" "}
                  {selectedMaterial.unit}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Group Buys */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{"activeGroupBuys"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGroupBuys.map((groupBuy) => (
            <div key={groupBuy._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
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
                  {groupBuy.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{"price"}:</span> ₹
                  {groupBuy.material.price}/{groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"progress"}:</span>{" "}
                  {groupBuy.currentQuantity}/{groupBuy.targetQuantity}{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"participants"}:</span>{" "}
                  {groupBuy.vendors.length}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"deadline"}:</span>{" "}
                  {new Date(groupBuy.deadline).toLocaleDateString()}
                </p>
              </div>
              {!groupBuy.vendors.includes(user._id) && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder={"enterQuantity"}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={groupBuy.material.minQuantity}
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                  <button
                    onClick={() => handleJoinGroupBuy(groupBuy._id)}
                    className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
                  >
                    {"joinGroupBuy"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* My Group Buys */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{"myGroupBuys"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroupBuys.map((groupBuy) => (
            <div key={groupBuy._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
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
                  {groupBuy.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{"myQuantity"}:</span>{" "}
                  {
                    groupBuy.vendors.find((v) => v.vendorId === user._id)
                      ?.quantity
                  }{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"totalAmount"}:</span> ₹
                  {groupBuy.vendors.find((v) => v.vendorId === user._id)
                    ?.quantity * groupBuy.material.price}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"groupProgress"}:</span>{" "}
                  {groupBuy.currentQuantity}/{groupBuy.targetQuantity}{" "}
                  {groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"deadline"}:</span>{" "}
                  {new Date(groupBuy.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendor;

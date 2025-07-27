import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
import axios from "axios";

const Supplier = () => {
  const [materials, setMaterials] = useState([]);
  const [groupBuys, setGroupBuys] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    minQuantity: "",
    available: true,
  });
  const user = getCurrentUser();

  useEffect(() => {
    fetchMaterials();
    fetchGroupBuys();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/material/supplier",
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

  const fetchGroupBuys = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/groupbuy/supplier",
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setGroupBuys(res.data);
      }
    } catch (error) {
      console.error("Error fetching group buys:", error);
    }
  };

  const handleNewMaterialSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/material",
        newMaterial,
        { withCredentials: true }
      );
      if (res.data) {
        setNewMaterial({
          name: "",
          category: "",
          price: "",
          unit: "",
          minQuantity: "",
          available: true,
        });
        fetchMaterials();
      }
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const handleMaterialChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMaterial((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{"addNewMaterial"}</h2>
        <form
          onSubmit={handleNewMaterialSubmit}
          className="bg-white rounded-lg shadow p-6 max-w-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {"materialName"}
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
                {"category"}
              </label>
              <select
                name="category"
                value={newMaterial.category}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">{"selectCategory"}</option>
                <option value="Vegetables">{"vegetables"}</option>
                <option value="Spices">{"spices"}</option>
                <option value="Grains">{"grains"}</option>
                <option value="Other">{"other"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {"pricePerUnit"}
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
                {"unit"}
              </label>
              <select
                name="unit"
                value={newMaterial.unit}
                onChange={handleMaterialChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">{"selectUnit"}</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="units">{"units"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {"minQuantity"}
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
                {"available"}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            {"addMaterial"}
          </button>
        </form>
      </div>

      {/* Materials List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{"yourMaterials"}</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {"material"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {"category"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {"price"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {"minQuantity"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {"status"}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material._id}>
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
                      {material.available ? "available" : "unavailable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Group Buys */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{"activeGroupBuys"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupBuys.map((groupBuy) => (
            <div key={groupBuy._id} className="bg-white rounded-lg shadow p-6">
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
                  {groupBuy.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{"pricePerUnit"}:</span> ₹
                  {groupBuy.material.price}/{groupBuy.material.unit}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{"currentQuantity"}:</span>{" "}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supplier;

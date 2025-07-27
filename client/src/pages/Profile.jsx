import React from "react";
import { getCurrentUser } from "../utils/auth";

const Profile = ({ onLogout }) => {
  const user = getCurrentUser();

  const renderVendorDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Your Name
        </label>
        <p className="text-lg font-medium">{user.name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Mobile
        </label>
        <p className="text-lg font-medium">{user.mobile}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Shop Name
        </label>
        <p className="text-lg font-medium">{user.shopName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          What You Sell
        </label>
        <p className="text-lg font-medium">{user.whatSell}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Area
        </label>
        <p className="text-lg font-medium">{user.area}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          City
        </label>
        <p className="text-lg font-medium">{user.city}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Years in Business
        </label>
        <p className="text-lg font-medium">{user.years}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <p className="text-lg font-medium">{user.email}</p>
      </div>
    </div>
  );

  const renderSupplierDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Contact Person
        </label>
        <p className="text-lg font-medium">{user.name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Mobile
        </label>
        <p className="text-lg font-medium">{user.mobile}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Business Name
        </label>
        <p className="text-lg font-medium">{user.businessName}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          What You Supply
        </label>
        <p className="text-lg font-medium">{user.whatSupply}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Warehouse
        </label>
        <p className="text-lg font-medium">{user.warehouse}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Area
        </label>
        <p className="text-lg font-medium">{user.area}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          City
        </label>
        <p className="text-lg font-medium">{user.city}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <p className="text-lg font-medium">{user.email}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-500 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <button
              onClick={onLogout}
              className="bg-white text-orange-600 font-semibold px-4 py-2 rounded shadow hover:bg-orange-100 transition"
            >
              Logout
            </button>
          </div>

          {/* Profile Picture and Role */}
          <div className="p-6 border-b flex items-center space-x-4">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-orange-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 capitalize">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            {user.role === "vendor"
              ? renderVendorDetails()
              : renderSupplierDetails()}
          </div>

          {/* Member Since */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              Member Since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { t } from "../utils/i18n";

const ROLE_CHANGE_LIMIT = 2;
const ROLE_CHANGE_KEY = "roleChangeInfo";

function getRoleChangeInfo() {
  const info = localStorage.getItem(ROLE_CHANGE_KEY);
  return info ? JSON.parse(info) : { count: 0, lastChange: null };
}

function setRoleChangeInfo(info) {
  localStorage.setItem(ROLE_CHANGE_KEY, JSON.stringify(info));
}

const ProfileMenu = ({ onLogout, onRoleChange }) => {
  const user = getCurrentUser();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState(user?.role || "vendor");
  const [msg, setMsg] = useState("");

  const handleRoleChange = () => {
    const info = getRoleChangeInfo();
    const now = new Date();
    const last = info.lastChange ? new Date(info.lastChange) : null;
    const thisMonth = now.getMonth() === (last && last.getMonth()) && now.getFullYear() === (last && last.getFullYear());
    const count = thisMonth ? info.count : 0;
    if (count >= ROLE_CHANGE_LIMIT) {
      setMsg(t("roleChangeLimitReached"));
      return;
    }
    const newRole = role === "vendor" ? "supplier" : "vendor";
    setRole(newRole);
    // Update user in localStorage
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Update role change info
    setRoleChangeInfo({ count: count + 1, lastChange: now });
    setMsg(t("roleChangeSuccess"));
    if (onRoleChange) onRoleChange(newRole);
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShow((s) => !s)}
        className="bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 font-semibold"
      >
        {t('profile')}
        Profile
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10 p-4">
          <div className="mb-2">
            <div className="font-bold text-lg text-orange-700">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-sm mt-1">Role: <span className="font-semibold capitalize">{role}</span></div>
          </div>
          <button
            onClick={handleRoleChange}
            className="w-full bg-orange-600 text-white py-1 rounded font-semibold hover:bg-orange-700 transition mb-2"
          >
            Change Role
          </button>
          <button
            onClick={onLogout}
            className="w-full bg-gray-200 text-gray-700 py-1 rounded font-semibold hover:bg-gray-300 transition"
          >
            Logout
          </button>
          {msg && <div className="text-xs text-center text-green-700 mt-2">{msg}</div>}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 
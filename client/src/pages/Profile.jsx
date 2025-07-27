import React from "react";
import { getCurrentUser } from "../utils/auth";
import { motion } from "framer-motion";

const Profile = ({ onLogout }) => {
  const user = getCurrentUser();
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-full max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl text-orange-600 font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : user.role.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-xl font-semibold text-gray-800">{user.name || "Demo User"}</span>
          <span className="inline-block px-4 py-1 rounded-full text-base bg-orange-100 text-orange-800 capitalize font-semibold">
            {user.role === "supplier" ? "Supplier" : "Vendor"}
          </span>
        </div>
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.08 }}
          className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold shadow hover:bg-orange-700 transition"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

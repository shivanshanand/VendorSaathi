import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ user }) => {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-orange-600 text-white py-4 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-yellow-200 transition">
          VendorSaathi
        </Link>
        <nav className="space-x-2 flex items-center">
          {!user && (
            <motion.div whileHover={{ scale: 1.08 }}>
              <Link to="/auth" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                Login/Register
              </Link>
            </motion.div>
          )}
          {user && (
            <>
              <motion.div whileHover={{ scale: 1.08 }}>
                <Link to="/dashboard" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                  Dashboard
                </Link>
              </motion.div>
              {user.role === "supplier" && (
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Link to="/supplier" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                    Supplier Page
                  </Link>
                </motion.div>
              )}
              {user.role === "vendor" && (
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Link to="/vendor" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                    Vendor Page
                  </Link>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.08 }}>
                <Link to="/chatbot" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                  Chatbot
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }}>
                <Link to="/profile" className="hover:bg-orange-700 px-3 py-2 rounded transition font-semibold">
                  Profile
                </Link>
              </motion.div>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Supplier from "./pages/Supplier";
import Vendor from "./pages/Vendor";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { isAuthenticated, getCurrentUser } from "./utils/auth";
import Navbar from "./components/Navbar";

function ProtectedRoute({ children }) {
  const isAuthed = isAuthenticated();
  const user = getCurrentUser();
  if (!isAuthed) {
    return <Navigate to="/auth" replace />;
  }
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6 min-h-[40vh] flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }
  return children;
}

function RoleRoute({ role, children }) {
  const user = getCurrentUser();
  const isAuthed = isAuthenticated();
  if (!isAuthed) {
    return <Navigate to="/auth" replace />;
  }
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6 min-h-[40vh] flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }
  if (user.role !== role) {
    return (
      <div className="bg-white rounded-lg shadow p-6 min-h-[40vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold mb-2 text-orange-700">
          Access Restricted
        </h2>
        <p className="text-gray-700 mb-4">
          You must be registered as <span className="font-bold">{role}</span> to
          access this page.
        </p>
        <Link
          to="/dashboard"
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          Back to Dashboard &rarr;
        </Link>
      </div>
    );
  }
  return children;
}

function App() {
  const [user, setUser] = useState(getCurrentUser());

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("roleChangeInfo");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 font-sans">
        <Navbar user={user} />
        <Routes>
          <Route
            path="/auth"
            element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier"
            element={
              <RoleRoute role="supplier">
                <Supplier />
              </RoleRoute>
            }
          />
          <Route
            path="/vendor"
            element={
              <RoleRoute role="vendor">
                <Vendor />
              </RoleRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

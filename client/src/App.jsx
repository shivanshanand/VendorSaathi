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
import ProfileMenu from "./components/ProfileMenu";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { isAuthenticated, getCurrentUser } from "./utils/auth";

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

  const handleRoleChange = () => {
    setUser(getCurrentUser());
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 font-sans">
        <header className="bg-orange-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              VendorSaathi
            </Link>
            <nav className="space-x-4 flex items-center">
              {!user && (
                <Link to="/auth" className="hover:underline">
                  Login/Register
                </Link>
              )}
              {user && (
                <>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                  {user.role === "supplier" && (
                    <Link to="/supplier" className="hover:underline">
                      Supplier Page
                    </Link>
                  )}
                  {user.role === "vendor" && (
                    <Link to="/vendor" className="hover:underline">
                      Vendor Page
                    </Link>
                  )}
                  <Link to="/chatbot" className="hover:underline">
                    Chatbot
                  </Link>
                  <Link to="/profile" className="hover:underline">
                    Profile
                  </Link>
                </>
              )}
              {user && (
                <ProfileMenu
                  onLogout={handleLogout}
                  onRoleChange={handleRoleChange}
                />
              )}
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/auth"
              element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
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
        </main>
        <footer className="text-center py-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} VendorSaathi
        </footer>
      </div>
    </Router>
  );
}

export default App;

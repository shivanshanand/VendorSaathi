import React, { useState } from "react";
import Login from "../components/Login";

const Auth = () => {
  // Only show login, remove registration
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <div className="w-full max-w-md">
          <Login onLogin={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
};

export default Auth;

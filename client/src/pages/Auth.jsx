import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Benefits from "../components/Benefits";

const Auth = () => {
  const [tab, setTab] = useState("register");
  const [role, setRole] = useState("vendor");

  const handleRole = (r) => {
    setRole(r);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">
          {tab === "register" ? "registration" : "login"}
        </h2>

        {tab === "register" && (
          <>
            <div className="text-gray-600 mb-6">{"chooseRole"}</div>
            <div className="flex w-full max-w-xl mb-6">
              <button
                className={`flex-1 py-2 font-semibold rounded-l ${
                  role === "vendor"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-100 text-orange-700"
                }`}
                onClick={() => handleRole("vendor")}
              >
                {"vendor"}
              </button>
              <button
                className={`flex-1 py-2 font-semibold rounded-r ${
                  role === "supplier"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-100 text-orange-700"
                }`}
                onClick={() => handleRole("supplier")}
              >
                {"supplier"}
              </button>
            </div>
          </>
        )}

        {tab === "register" ? (
          <div className="flex w-full max-w-4xl gap-8">
            <Benefits role={role} />
            <Register role={role} />
          </div>
        ) : (
          <div className="w-full max-w-md">
            <Login />
          </div>
        )}

        <div className="mb-8 text-center text-gray-600">
          {tab === "register" ? (
            <>
              {"haveAccount"}{" "}
              <button
                onClick={() => setTab("login")}
                className="text-orange-600 font-semibold hover:underline"
              >
                {"signIn"}
              </button>
            </>
          ) : (
            <>
              {"noAccount"}{" "}
              <button
                onClick={() => setTab("register")}
                className="text-orange-600 font-semibold hover:underline"
              >
                {"register"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

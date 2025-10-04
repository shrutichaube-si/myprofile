import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      setUserLoggedIn(true);
      console.log("user is logged in");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-lg text-center border border-white/40">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Welcome to <span className="text-blue-600">Home Page</span>
        </h1>

        {userLoggedIn ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              🎉 Welcome Back, <span className="text-blue-600">User!</span>
            </h2>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 text-lg font-medium">
              You are not logged in yet.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function MySubscription() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Active");

  const isActive = status === "Active";

  // 🔐 Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null; // prevents flicker

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              My Subscription
            </h2>
            <p className="text-gray-500 mt-1">
              Logged in as <span className="font-medium">{user.phone}</span>
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* Status Header */}
          <div
            className={`px-6 py-4 flex justify-between items-center ${
              isActive ? "bg-green-600" : "bg-orange-500"
            }`}
          >
            <p className="text-white font-semibold">
              {isActive ? "Subscription Active" : "Subscription Paused"}
            </p>

            <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
              {isActive ? "Active" : "Paused"}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Plan */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-bold text-gray-900">
                  Premium
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                Daily
              </span>
            </div>

            {/* Delivery Time */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-500">Delivery Time</p>
              <p className="text-lg font-semibold text-gray-900">
                Before 8:30 AM
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                Freshly cut fruits every morning
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                No preservatives or added sugar
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                Pause or resume anytime
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setStatus(isActive ? "Paused" : "Active")}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isActive ? "Pause Subscription" : "Resume Subscription"}
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-500">
              Changes will apply from the next delivery day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

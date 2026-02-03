

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useAuth } from "../../auth/AuthContext";
import { showToast } from "../../Utils/toast";

export default function MySubscription() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔐 Route protection */
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  /* 📦 Fetch subscription */
  useEffect(() => {
    if (!user) return;

    const fetchSubscription = async () => {
      try {
        const res = await api.get("/subscriptions/me");
        setSubscription(res.data);
      } catch (err) {
        showToast("Unable to load subscription ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (!user || loading) return null;

  const isActive = !subscription.is_paused;

  /* ⏸ Pause */
  const pauseSubscription = async () => {
    try {
      await api.patch(`/subscriptions/${subscription.id}/pause`);
      setSubscription({ ...subscription, is_paused: true });
      showToast("Subscription paused ⏸");
    } catch {
      showToast("Failed to pause subscription ❌");
    }
  };

  /* ▶ Resume */
  const resumeSubscription = async () => {
    try {
      await api.patch(`/subscriptions/${subscription.id}/resume`);
      setSubscription({ ...subscription, is_paused: false });
      showToast("Subscription resumed ▶");
    } catch {
      showToast("Failed to resume subscription ❌");
    }
  };

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

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* Status */}
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

          {/* Body */}
          <div className="p-6 space-y-6">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-bold text-gray-900">
                  {subscription.plan}
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                Daily
              </span>
            </div>

            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-500">Delivery Time</p>
              <p className="text-lg font-semibold text-gray-900">
                Before 8:30 AM
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p>✔ Freshly cut fruits every morning</p>
              <p>✔ No preservatives or added sugar</p>
              <p>✔ Pause or resume anytime</p>
            </div>

            <button
              onClick={isActive ? pauseSubscription : resumeSubscription}
              className={`w-full py-4 rounded-xl text-lg font-semibold ${
                isActive
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isActive ? "Pause Subscription" : "Resume Subscription"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Changes apply from next delivery day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { api } from "../../services/api";
import { showToast } from "../../Utils/toast";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      showToast("Please enter a valid 6-digit OTP 🔐");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        phone: state?.phone,
        otp,
      });

      const { access_token } = res.data;

      // store token
      localStorage.setItem("token", access_token);

      // save user in context
      login({
        phone: state?.phone,
        role: "customer",
      });

      showToast("OTP verified! Welcome to Aarogya Harvest 🌿");
      navigate("/my-subscription", { replace: true });
    } catch (err) {
      showToast(
        err?.response?.data?.detail || "OTP verification failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl border p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center">
          Verify OTP
        </h2>

        <p className="text-center text-gray-500 mt-2">
          OTP sent to {state?.phone}
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className="mt-6 w-full border rounded-xl p-3 text-lg text-center tracking-widest focus:ring-2 focus:ring-green-600 outline-none"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-3 rounded-xl text-lg font-semibold"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          (Use OTP <strong>123456</strong> for now)
        </p>
      </div>
    </div>
  );
}

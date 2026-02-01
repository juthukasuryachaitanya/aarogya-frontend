import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { showToast } from "../../Utils/toast";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp !== "123456") {
      showToast("Invalid OTP. Please use 123456 🔐");
      return;
    }

    // Save logged-in customer
    login({
      phone: state?.phone,
    });

    showToast("OTP verified! Welcome to Aarogya Harvest 🌿");

    // Navigate to protected page
    navigate("/my-subscription", { replace: true });
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
          className="mt-6 w-full border rounded-xl p-3 text-lg text-center tracking-widest focus:ring-2 focus:ring-green-600 outline-none"
        />

        <button
          onClick={handleVerify}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Verify & Continue
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          (Use OTP <strong>123456</strong> for now)
        </p>
      </div>
    </div>
  );
}

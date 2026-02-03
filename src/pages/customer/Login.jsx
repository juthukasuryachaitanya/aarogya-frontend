

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/login", { phone });
      navigate("/verify-otp", { state: { phone } });
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-xl border p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center">
          Login to Aarogya Harvest
        </h2>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
          className="mt-6 w-full border rounded-xl p-3 text-lg"
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}

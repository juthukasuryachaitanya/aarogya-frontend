import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    // API CALL LATER → send OTP
    navigate("/verify-otp", { state: { phone } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-xl border p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center">
          Login to Aarogya Harvest
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Enter your mobile number to continue
        </p>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
          className="mt-6 w-full border rounded-xl p-3 text-lg focus:ring-2 focus:ring-green-600 outline-none"
        />

        <button
          onClick={handleSendOtp}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}

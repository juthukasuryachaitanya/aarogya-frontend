import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { showToast } from "../../Utils/toast";

export function AdminLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (phone.length !== 10) {
      showToast("Please enter a valid 10-digit mobile number 📱");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Backend admin login (OTP / auth handled server-side)
      const res = await api.post("/admin/login", { phone });

      // Expecting JWT from backend
      const { access_token } = res.data;

      localStorage.setItem("admin_token", access_token);

      showToast("Welcome Admin 👋 Redirecting to dashboard");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      showToast(
        err?.response?.data?.detail ||
          "Admin login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Aarogya Harvest
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Admin Control Panel
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Admin Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              className="mt-1 w-full border rounded-xl p-3 text-lg focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-semibold transition-all disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </div>

        {/* Info */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Authorized access only · Secured with JWT
        </p>
      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showToast } from "../../Utils/toast";
export default function Subscribe() {
  const { state: plan } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    flat: "",
    floor: "",
    community: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Subscription successful! Fresh fruits start tomorrow 🍎");
    navigate("/my-subscription");
  };

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-cream to-green-100" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50" />

      {/* MAIN CONTAINER */}
      <div
        style={{ marginTop: "-35px", height: "calc(100vh - 56px)" }}
        className="relative max-w-5xl w-full bg-white/85 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 grid md:grid-cols-2 gap-10 items-center overflow-hidden"
      >

        {/* LEFT CONTENT */}
        <div>
          <div className="mt-8 bg-lightgreen rounded-2xl p-6">
            <p className="text-sm text-gray-600">Selected Plan</p>
            <h3 className="text-2xl font-extrabold text-primary">
              {plan?.name || "Aarogya Plan"}
            </h3>
            <p className="text-lg text-orange-600 font-bold">
              {plan?.price}
            </p>
          </div>

          <h1 className="text-4xl font-extrabold text-primary leading-tight mt-6">
            One Healthy Habit <br />
            <span className="text-green-800">That Changes Everything</span>
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Eating fresh fruits daily improves immunity, digestion,
            energy levels, and long-term health.
          </p>

          <ul className="mt-6 space-y-3 text-gray-800 text-lg">
            <li>🍎 Boosts immunity naturally</li>
            <li>⚡ Keeps energy levels high</li>
            <li>❤️ Reduces lifestyle disease risk</li>
            <li>🧠 Improves focus & mood</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl h-full flex flex-col overflow-hidden"
        >
          {/* FORM HEADER */}
          <div className="p-6 ">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Start Your Subscription
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Delivered fresh every morning before 8:30 AM
            </p>
          </div>

          {/* SCROLLABLE FIELDS */}
          <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
  <input
    name="name"
    placeholder="Full Name"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="phone"
    placeholder="Mobile Number"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="email"
    placeholder="Email ID"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="flat"
    placeholder="Flat Number"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="floor"
    placeholder="Floor Number"
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="community"
    placeholder="Community / Apartment Name"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />

  <input
    name="address"
    placeholder="Complete Delivery Address"
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-xl p-3"
  />
</div>


          {/* CTA */}
          <div className="p-6 ">
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white py-4 rounded-2xl text-lg font-semibold"
            >
              Yes, Start My Healthy Routine
            </button>
            <p className="mt-3 text-xs text-gray-500 text-center">
              No daily ordering · Pause anytime · Cancel anytime
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}

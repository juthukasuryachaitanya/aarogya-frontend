
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Plans() {
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState(null);

  /* 🔗 BACKEND-READY PLAN CONFIG */
  const plans = [
    {
      id: "lite",
      name: "Aarogya Lite",
      price: 1499,
      displayPrice: "₹1499",
      unit: "/ month",
      qty: "240g per day",
      ideal: "Best for individuals",
      points: [
        "Seasonal fresh fruits",
        "Light & healthy portions",
        "Perfect daily habit",
      ],
    },
    {
      id: "classic",
      name: "Aarogya Classic",
      price: 1999,
      displayPrice: "₹1999",
      unit: "/ month",
      qty: "390g per day",
      ideal: "Most popular choice",
      popular: true,
      points: [
        "Balanced fruit combination",
        "Ideal for regular nutrition",
        "Best value for money",
      ],
    },
    {
      id: "premium",
      name: "Aarogya Premium",
      price: 2499,
      displayPrice: "₹2499",
      unit: "/ month",
      qty: "560g per day",
      ideal: "For maximum nutrition",
      points: [
        "Seasonal + exotic fruits",
        "Premium quality selection",
        "Maximum fruit variety",
      ],
    },
  ];

  const isHighlighted = (plan) => {
    if (hoveredPlan) return hoveredPlan === plan.id;
    return plan.popular;
  };

  return (
    <div className="relative min-h-screen px-6 py-16 overflow-hidden bg-cream">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-cream to-green-100 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50 -z-10" />

      {/* HEADER */}
      <div style={{ marginTop: "-50px" }} className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
          Choose Your <span className="text-green-800">Daily Fruit Habit</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Freshly cut fruits · Delivered every morning before 8:30 AM
        </p>
      </div>

      {/* PLANS */}
      <div className="mt-16 max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {plans.map((plan) => {
          const highlighted = isHighlighted(plan);

          return (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative bg-white rounded-[2.5rem] shadow-xl p-8 flex flex-col justify-between transition-all duration-300 ${
                highlighted
                  ? "border-2 border-green-700 scale-105"
                  : "border border-gray-200"
              }`}
            >
              {/* BADGE */}
              {plan.popular && !hoveredPlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-800 text-white text-xs px-4 py-1 rounded-full shadow">
                  MOST POPULAR
                </div>
              )}

              {/* PLAN INFO */}
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {plan.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {plan.ideal}
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-orange-600">
                    {plan.displayPrice}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.unit}</span>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.qty}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 text-gray-800">
                  {plan.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-700 font-bold">✔</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/subscribe", { state: plan })}
                className={`mt-8 w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                  highlighted
                    ? "bg-green-800 hover:bg-green-900 text-white"
                    : "bg-green-800 text-white opacity-20"
                }`}
              >
                Start My Subscription
              </button>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-20 text-center text-gray-600 text-sm">
        A fruit bowl a day keeps illness away 🍎 · Aarogya Harvest Promise
      </div>
    </div>
  );
}

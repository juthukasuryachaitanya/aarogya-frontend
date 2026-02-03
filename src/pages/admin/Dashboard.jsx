import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/finance/summary");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6">Loading dashboard…</div>;
  }

  const cards = [
    {
      label: "Total Customers",
      value: stats.total_customers,
      color: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      label: "Active Subscriptions",
      value: stats.active_subscriptions,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    {
      label: "Paused Subscriptions",
      value: stats.paused_subscriptions,
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
    {
      label: "Today's Deliveries",
      value: stats.today_deliveries,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Daily operations overview
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border p-6"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl ${stat.bg}`}
            >
              <span className={`text-xl font-extrabold ${stat.color}`}>
                {stat.value}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/customers")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Manage Customers
          </button>

          <button
            onClick={() => navigate("/admin/deliveries")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold"
          >
            View Deliveries
          </button>
        </div>
      </div>
    </div>
  );
}

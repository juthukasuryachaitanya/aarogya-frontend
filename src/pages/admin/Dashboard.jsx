import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Customers",
      value: 120,
      color: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      label: "Active Subscriptions",
      value: 90,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    {
      label: "Paused Subscriptions",
      value: 30,
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
    {
      label: "Today's Deliveries",
      value: 90,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Daily operations overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
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

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/customers")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            Manage Customers
          </button>

          <button
            onClick={() => navigate("/admin/deliveries")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            View Deliveries
          </button>
        </div>
      </div>
    </div>
  );
}

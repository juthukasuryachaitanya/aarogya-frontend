import { Link, useLocation } from "react-router-dom";

export function AdminSidebar() {
  const location = useLocation();

  const navItem = (path) =>
    `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${location.pathname === path
      ? "bg-green-600 text-white"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-6">

      {/* Brand */}
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-green-500">
          Aarogya Harvest
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className={navItem("/admin/dashboard")}>
          Dashboard
        </Link>
        <Link to="/admin/customers" className={navItem("/admin/customers")}>
          Customers
        </Link>
        <Link to="/admin/deliveries" className={navItem("/admin/deliveries")}>
          Deliveries
        </Link>
        <Link to="/admin/finance" className={navItem("/admin/finance")}>
          Finance
        </Link>
        <Link to="/admin/expenses" className={navItem("/admin/expenses")}>
          Expenses
        </Link>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Aarogya Harvest
        </p>
      </div>
    </aside>
  );
}

import { Link, useLocation } from "react-router-dom";

export function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItem = (path) =>
    `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      isActive(path)
        ? "bg-green-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-900 text-white flex flex-col px-6 py-8">

      {/* BRAND */}
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-green-500 tracking-tight">
          Aarogya Harvest
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Admin Control Panel
        </p>
      </div>

      {/* NAVIGATION */}
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

      {/* FOOTER */}
      <div className="pt-6 border-t border-gray-800 text-xs text-gray-500">
        © {new Date().getFullYear()} Aarogya Harvest
      </div>
    </aside>
  );
}

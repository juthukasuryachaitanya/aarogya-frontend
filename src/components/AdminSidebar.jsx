import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function AdminSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItem = (path) =>
    `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      isActive(path)
        ? "bg-green-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* ===== Mobile Top Bar ===== */}
      <div className="md:hidden sticky top-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow">
        <div>
          <p className="font-extrabold text-green-500">
            Aarogya Harvest
          </p>
          <p className="text-xs text-gray-400">
            Admin Panel
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      </div>

      {/* ===== Backdrop (Mobile) ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-64 bg-gray-900 text-white
          flex flex-col px-6 py-8
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
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
          <Link to="/admin/dashboard" onClick={() => setOpen(false)} className={navItem("/admin/dashboard")}>
            Dashboard
          </Link>

          <Link to="/admin/customers" onClick={() => setOpen(false)} className={navItem("/admin/customers")}>
            Customers
          </Link>

          <Link to="/admin/deliveries" onClick={() => setOpen(false)} className={navItem("/admin/deliveries")}>
            Deliveries
          </Link>

          <Link to="/admin/finance" onClick={() => setOpen(false)} className={navItem("/admin/finance")}>
            Finance
          </Link>

          <Link to="/admin/expenses" onClick={() => setOpen(false)} className={navItem("/admin/expenses")}>
            Expenses
          </Link>
        </nav>

        {/* FOOTER */}
        <div className="pt-6 border-t border-gray-800 text-xs text-gray-500">
          © {new Date().getFullYear()} Aarogya Harvest
        </div>
      </aside>
    </>
  );
}

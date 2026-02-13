import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "/assets/aarogya-logo.jpeg";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        <div className="flex items-center justify-between">

          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Aarogya Harvest"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-lg sm:text-xl font-extrabold text-green-700">
              Aarogya Harvest
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-green-700 transition">
              Home
            </Link>
            <Link to="/plans" className="hover:text-green-700 transition">
              Plans
            </Link>
            {/* <Link to="/my-subscription" className="hover:text-green-700 transition">
              My Subscription
            </Link> */}
            {/* <Link to="/refer-earn" className="hover:text-green-700 transition">
              Refer A Friend
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center
                       w-10 h-10 rounded-lg
                       text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-lg border">
            <div className="flex flex-col divide-y text-gray-700 font-medium">

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="px-5 py-3 hover:bg-green-50 hover:text-green-700 transition"
              >
                Home
              </Link>

              <Link
                to="/plans"
                onClick={() => setOpen(false)}
                className="px-5 py-3 hover:bg-green-50 hover:text-green-700 transition"
              >
                Plans
              </Link>

              <Link
                to="/my-subscription"
                onClick={() => setOpen(false)}
                className="px-5 py-3 hover:bg-green-50 hover:text-green-700 transition"
              >
                My Subscription
              </Link>

              <Link
                to="/refer-earn"
                onClick={() => setOpen(false)}
                className="px-5 py-3 hover:bg-green-50 hover:text-green-700 transition"
              >
                Refer A Friend
              </Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

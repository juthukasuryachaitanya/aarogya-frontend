import { Link } from "react-router-dom";
import logo from "/assets/aarogya-logo.jpeg";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Aarogya Harvest"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-extrabold text-green-700">
            Aarogya Harvest
          </span>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-green-700 transition">
            Home
          </Link>
          <Link to="/plans" className="hover:text-green-700 transition">
            Plans
          </Link>
          <Link
            to="/my-subscription"
            className="hover:text-green-700 transition"
          >
            My Subscription
          </Link>
          <Link
            to="/refer-earn"
            className="hover:text-green-700 transition"
          >
            Refer A Friend
          </Link>
        </div>
      </div>
    </nav>
  );
}

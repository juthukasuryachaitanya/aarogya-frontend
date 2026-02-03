import { Link } from "react-router-dom";
import logo from "../assets/aarogya-logo.jpeg";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50  border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <img src={logo} alt="Aarogya Harvest" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-extrabold text-primary">
            Aarogya Harvest
          </span>
        </div>

        <div className="flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/plans" className="hover:text-primary">Plans</Link>
          <Link to="/my-subscription" className="hover:text-primary">
            My Subscription
          </Link>
          <Link to="/refer-earn" className="hover:text-primary">
            Refer A Friend
          </Link>
        </div>
      </div>
    </nav>
  );
}

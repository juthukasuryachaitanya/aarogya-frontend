
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

/* ================= LAYOUTS ================= */
import { Navbar } from "./components/Navbar";
import { AdminSidebar } from "./components/AdminSidebar";

/* ================= CUSTOMER PAGES ================= */
import Home from "./pages/customer/Home";
import Plans from "./pages/customer/Plans";
import Subscribe from "./pages/customer/Subscribe";
import MySubscription from "./pages/customer/MySubscription";
import Login from "./pages/customer/Login";
import VerifyOtp from "./pages/customer/VerifyOtp";
import ReferEarn from "./pages/customer/ReferEarn";

/* ================= ADMIN PAGES ================= */
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { Customers } from "./pages/admin/Customers";
import { Deliveries } from "./pages/admin/Deliveries";
import { Finance } from "./pages/admin/Finance";
import { Expenses } from "./pages/admin/Expenses";

/* ================= AUTH ================= */
import { AuthProvider, useAuth } from "./auth/AuthContext";

/* ================================================= */
/* ================= LAYOUTS ======================= */
/* ================================================= */

function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
}

/* ================================================= */
/* ================= ROUTE GUARDS ================== */
/* ================================================= */

function RequireAuth() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function RequireAdmin() {
  const { user } = useAuth();
  return user?.role === "admin"
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
}

/* ================================================= */
/* ================= APP ROOT ====================== */
/* ================================================= */

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC CUSTOMER ROUTES ================= */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/refer-earn" element={<ReferEarn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>

          {/* ================= AUTHENTICATED CUSTOMER ================= */}
          <Route element={<RequireAuth />}>
            <Route element={<CustomerLayout />}>
              <Route
                path="/my-subscription"
                element={<MySubscription />}
              />
            </Route>
          </Route>

          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="deliveries" element={<Deliveries />} />
              <Route path="finance" element={<Finance />} />
              <Route path="expenses" element={<Expenses />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Route>
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
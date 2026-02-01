import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

/* Layout Components */
import { Navbar } from "./components/Navbar";
import { AdminSidebar } from "./components/AdminSidebar";

/* Customer Pages */
import Home from "./pages/customer/Home";
import Plans from "./pages/customer/Plans";
import Subscribe from "./pages/customer/Subscribe";
import MySubscription from "./pages/customer/MySubscription";
import Login from "./pages/customer/Login";
import VerifyOtp from "./pages/customer/VerifyOtp";
import ReferEarn from "./pages/customer/ReferEarn";

/* Admin Pages */
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { Customers } from "./pages/admin/Customers";
import { Deliveries } from "./pages/admin/Deliveries";
import { Finance } from "./pages/admin/Finance";
import { Expenses } from "./pages/admin/Expenses";

/* Auth */
import { AuthProvider, useAuth } from "./auth/AuthContext";

/* ========================= */
/* Customer Layout (Navbar) */
/* ========================= */
function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

/* ========================= */
/* Protected Customer Route */
/* ========================= */
function ProtectedCustomerRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

/* ========================= */
/* Admin Layout */
/* ========================= */
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

/* ========================= */
/* App */
/* ========================= */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= CUSTOMER ROUTES (WITH NAVBAR) ================= */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/refer-earn" element={<ReferEarn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            {/* Protected customer page */}
            <Route element={<ProtectedCustomerRoute />}>
              <Route path="/my-subscription" element={<MySubscription />} />
            </Route>
          </Route>

          {/* ================= CUSTOMER AUTH (NO NAVBAR) ================= */}
          

          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN PROTECTED ================= */}
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

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

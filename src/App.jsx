import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));

// Admin Routes
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProductManagement = lazy(() => import("./admin/pages/ProductManagement"));
const OrderManagement = lazy(() => import("./admin/pages/OrderManagement"));
const CustomerManagement = lazy(() =>
  import("./admin/pages/CustomerManagement")
);
const Reports = lazy(() => import("./admin/pages/Reports"));
const Settings = lazy(() => import("./admin/pages/Settings"));

function ClientLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="category" element={<Categories />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            {/* Optionally, if you need admin category */}
            <Route path="category" element={<Categories />} />
          </Route>

          {/* Client Routes */}
          <Route path="/*" element={<ClientLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AdminProvider } from "@/hooks/useAdmin";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import HomePage from "./pages/Index";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrdersPage from "./pages/Orders";
import OrderDetailPage from "./pages/OrderDetail";
import AboutPage from "./pages/About";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CartProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Store routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } 
              />
              <Route 
                path="/admin/products" 
                element={
                  <ProtectedAdminRoute>
                    <AdminProducts />
                  </ProtectedAdminRoute>
                } 
              />
              <Route 
                path="/admin/orders" 
                element={
                  <ProtectedAdminRoute>
                    <AdminOrders />
                  </ProtectedAdminRoute>
                } 
              />
              <Route 
                path="/admin/customers" 
                element={
                  <ProtectedAdminRoute>
                    <AdminCustomers />
                  </ProtectedAdminRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedAdminRoute>
                    <Navigate to="/admin" replace />
                  </ProtectedAdminRoute>
                } 
              />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AdminProvider>
      </CartProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

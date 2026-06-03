import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/public/HomePage'
import MenuPage from './pages/public/MenuPage'
import CartPage from './pages/public/CartPage'
import CheckoutPage from './pages/public/CheckoutPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import OrderStatusPage from './pages/public/OrderStatusPage'
import ReviewsPage from './pages/public/ReviewsPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminMenuPage from './pages/admin/AdminMenuPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminReviewsPage from './pages/admin/AdminReviewsPage'



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{
            style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', fontFamily: 'Poppins' }
          }} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
  <ProtectedRoute requiredRole="admin">
    <AdminMenuPage />
  </ProtectedRoute>
} />
            <Route path="/admin/orders" element={
  <ProtectedRoute requiredRole="admin">
    <AdminOrdersPage />
  </ProtectedRoute>
} />
            <Route path="/admin/reviews" element={
  <ProtectedRoute requiredRole="admin">
    <AdminReviewsPage />
  </ProtectedRoute>
} />
            <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
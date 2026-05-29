export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const ROLES = { CUSTOMER: 'customer', ADMIN: 'admin' }

export const STORAGE_KEYS = { TOKEN: 'mv_token', USER: 'mv_user', CART: 'mv_cart' }

export const ROUTES = {
  HOME: '/', MENU: '/menu', CART: '/cart', REVIEWS: '/reviews',
  CHECKOUT: '/checkout', ORDER_STATUS: '/order-status/:orderId',
  LOGIN: '/login', REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin/dashboard', ADMIN_MENU: '/admin/menu',
  ADMIN_ORDERS: '/admin/orders', ADMIN_REVIEWS: '/admin/reviews',
}
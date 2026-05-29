import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'

const Navbar = () => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth()
  const { cartCount, setIsCartOpen } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCartClick = () => {
    if (location.pathname === '/menu') {
      setIsCartOpen(true)
      return
    }

    navigate('/cart')
  }

  const navLinks = [
    { label: 'Menu', to: '/menu' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Reservations', to: '/#reservations' },
    { label: 'About', to: '/#about' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-primary font-black text-2xl tracking-tight">
          Moon Village
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-gray-300 hover:text-primary transition-colors font-medium tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {/* Cart - only for customers */}
          {isLoggedIn() && !isAdmin() && (
            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-300 hover:text-primary transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {isLoggedIn() ? (
            <div className="flex items-center gap-3">
              {isAdmin() && (
                <Link to="/admin/dashboard" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiUser size={14} />
                <span>{user?.name?.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                <FiLogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-primary text-primary text-sm font-semibold px-5 py-2 rounded hover:bg-primary hover:text-dark transition-all duration-200"
            >
              Order Now
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-gray-300 hover:text-primary transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn() && !isAdmin() && (
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-gray-300 hover:text-primary transition-colors py-1"
            >
              Cart
            </Link>
          )}
          {!isLoggedIn() && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-primary font-semibold py-1"
            >
              Order Now
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
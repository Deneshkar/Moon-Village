import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiList, FiShoppingBag,
  FiMessageSquare, FiSettings, FiLogOut, FiBell
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard',        to: '/admin/dashboard', icon: FiGrid        },
  { label: 'Menu Management',  to: '/admin/menu',      icon: FiList        },
  { label: 'Order Management', to: '/admin/orders',    icon: FiShoppingBag },
  { label: 'Reviews',          to: '/admin/reviews',   icon: FiMessageSquare },
  { label: 'Settings',         to: '/admin/settings',  icon: FiSettings    },
]

// ─── Top Bar ──────────────────────────────────────────────────────
export const AdminTopBar = ({ title }) => {
  const { user } = useAuth()
  return (
    <div className="h-14 flex items-center justify-between px-8 border-b border-dark-border bg-dark-card/50">
      <h1 className="text-white font-bold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-primary transition-colors">
          <FiBell size={18} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary text-dark text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-white text-xs font-semibold">Admin User</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Superuser</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────
const AdminSidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="w-52 min-h-screen bg-dark border-r border-dark-border flex flex-col flex-shrink-0">

      {/* Brand */}
      <div className="px-6 py-6 border-b border-dark-border">
        <h1 className="text-primary font-black text-xl leading-tight">Moon Village</h1>
        <p className="text-gray-600 text-xs mt-0.5">Celestial Admin</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-gray-400 hover:text-white hover:bg-dark-hover'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
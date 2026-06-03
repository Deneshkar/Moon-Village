import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiList, FiShoppingBag,
  FiMessageSquare, FiSettings, FiLogOut, FiBell, FiSearch, FiRefreshCw
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
export const AdminTopBar = ({ title, subTitle }) => {
  const { user } = useAuth()
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  const dateStr = new Date().toLocaleDateString('en-US', dateOptions)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="sticky top-0 z-30 bg-dark/90 backdrop-blur border-b border-dark-border px-8 py-4 flex items-center justify-between">
      {/* Greeting or Title */}
      <div>
        <h1 className="text-white font-bold text-lg leading-tight">
          {title ? title : `${greeting}, ${user?.name || 'Admin'} 👋`}
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">{subTitle || (title ? 'Moon Village Management' : dateStr)}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search operations..."
            className="bg-dark-card border border-dark-border text-white text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-primary transition-colors placeholder-gray-600 w-56"
          />
        </div>

        {/* Bell */}
        <button className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors relative">
          <FiBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* History */}
        <button className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
          <FiRefreshCw size={16} />
        </button>

        {/* Shift Report */}
        <button className="flex items-center gap-2 bg-dark-card border border-dark-border text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-all">
          <FiShoppingBag size={14} />
          <span>Shift Report</span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary font-bold text-sm ml-2">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
      </div>
    </header>
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
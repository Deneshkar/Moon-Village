import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiShoppingBag, FiMap, FiBook,
  FiBarChart2, FiSettings, FiHelpCircle,
  FiPlusCircle, FiLogOut
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', icon: FiGrid,      to: '/admin/dashboard' },
  { label: 'Orders',    icon: FiShoppingBag, to: '/admin/orders'   },
  { label: 'Floor Plan',icon: FiMap,       to: '/admin/dashboard' },
  { label: 'Menu',      icon: FiBook,      to: '/admin/menu'      },
  { label: 'Analytics', icon: FiBarChart2, to: '/admin/dashboard' },
]

const bottomItems = [
  { label: 'Settings', icon: FiSettings,   to: '/admin/dashboard' },
  { label: 'Support',  icon: FiHelpCircle, to: '/admin/dashboard' },
]

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-[#0d1117] border-r border-dark-border flex flex-col z-40">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-dark-border">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-dark font-black text-lg">
          🌙
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Moon Village</p>
          <p className="text-gray-600 text-xs">Management Portal</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(to)
                ? 'bg-primary/10 text-primary border-l-2 border-primary pl-3'
                : 'text-gray-500 hover:text-white hover:bg-dark-hover'
            }`}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      {/* New Reservation Button */}
      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-dark font-semibold py-2.5 rounded-lg text-sm transition-all duration-200">
          <FiPlusCircle size={15} />
          New Reservation
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="px-3 pb-3 space-y-1 border-t border-dark-border pt-3">
        {bottomItems.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-dark-hover transition-all"
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-dark-hover transition-all"
        >
          <FiLogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
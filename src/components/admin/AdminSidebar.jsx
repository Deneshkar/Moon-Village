import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiList, FiShoppingBag,
  FiMessageSquare, FiSettings, FiLogOut, FiBell, FiSearch, FiRefreshCw
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'

const navItems = [
  { label: 'Dashboard',        to: '/admin/dashboard', icon: FiGrid        },
  { label: 'Menu Management',  to: '/admin/menu',      icon: FiList        },
  { label: 'Order Management', to: '/admin/orders',    icon: FiShoppingBag },
  { label: 'Reviews',          to: '/admin/reviews',   icon: FiMessageSquare },
  { label: 'Settings',         to: '/admin/settings',  icon: FiSettings    },
]

// ─── Top Bar ──────────────────────────────────────────────────────
export const AdminTopBar = ({
  title,
  subTitle,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = 'Search operations...',
  onRefresh,
  onShiftReport,
}) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [localSearch, setLocalSearch] = useState('')
  const [openPanel, setOpenPanel] = useState(null)
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  const dateStr = new Date().toLocaleDateString('en-US', dateOptions)
  const hour = new Date().getHours()
  let greeting = 'Good evening'
  if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 17) {
    greeting = 'Good afternoon'
  }
  const activeSearch = searchValue ?? localSearch

  const notifications = [
    { title: 'New order received', detail: 'Table 4 placed a fresh order.', to: '/admin/orders' },
    { title: 'Pending reviews', detail: '2 guest reviews need a reply.', to: '/admin/reviews' },
    { title: 'Kitchen update', detail: 'Prep queue is running on schedule.', to: '/admin/dashboard' },
  ]

  const handleSearchChange = value => {
    if (onSearchChange) {
      onSearchChange(value)
      return
    }

    setLocalSearch(value)
  }

  const handleSearchKeyDown = event => {
    if (event.key !== 'Enter') return

    const query = activeSearch.trim()
    if (!query) return

    if (onSearchSubmit) {
      onSearchSubmit(query)
      return
    }

    toast.success(`Searching for "${query}"`)
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
      return
    }

    globalThis.location.reload()
  }

  const handleShiftReport = () => {
    if (onShiftReport) {
      onShiftReport()
      return
    }

    const reportLines = [
      'Moon Village Shift Report',
      `Generated: ${new Date().toLocaleString()}`,
      `Page: ${title || 'Admin Overview'}`,
      `Operator: ${user?.name || 'Admin'}`,
      '',
      subTitle || (title ? 'Moon Village Management' : dateStr),
    ]

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `moon-village-shift-report-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(downloadUrl)
    toast.success('Shift report downloaded')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleQuickJump = to => {
    setOpenPanel(null)
    navigate(to)
  }

  return (
    <header className="sticky top-0 z-30 bg-dark/90 backdrop-blur border-b border-dark-border px-8 py-4 flex items-center justify-between">
      {/* Greeting or Title */}
      <div>
        <h1 className="text-white font-bold text-lg leading-tight">{title || `${greeting}, ${user?.name || 'Admin'} 👋`}</h1>
        <p className="text-gray-500 text-xs mt-0.5">{subTitle || (title ? 'Moon Village Management' : dateStr)}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            value={activeSearch}
            onChange={event => handleSearchChange(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={searchPlaceholder}
            className="bg-dark-card border border-dark-border text-white text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-primary transition-colors placeholder-gray-600 w-56"
          />
        </div>

        <div className="relative">
          {/* Bell */}
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === 'notifications' ? null : 'notifications')}
            className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors relative"
          >
            <FiBell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </button>

          {openPanel === 'notifications' && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-dark-border bg-dark-card shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-dark-border">
                <p className="text-white font-semibold text-sm">Notifications</p>
                <p className="text-gray-500 text-xs mt-0.5">Quick updates for the current shift</p>
              </div>
              <div className="p-2 space-y-1">
                {notifications.map(item => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleQuickJump(item.to)}
                    className="w-full text-left rounded-xl px-3 py-2.5 hover:bg-dark-hover transition-colors"
                  >
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* History */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          title="Refresh page"
        >
          <FiRefreshCw size={16} />
        </button>

        {/* Shift Report */}
        <button
          type="button"
          onClick={handleShiftReport}
          className="flex items-center gap-2 bg-dark-card border border-dark-border text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-all"
        >
          <FiShoppingBag size={14} />
          <span>Shift Report</span>
        </button>

        {/* Avatar */}
        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === 'account' ? null : 'account')}
            className="w-9 h-9 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary font-bold text-sm"
            title="Account menu"
          >
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </button>

          {openPanel === 'account' && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-dark-border bg-dark-card shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-dark-border">
                <p className="text-white font-semibold text-sm">{user?.name || 'Admin User'}</p>
                <p className="text-gray-500 text-xs mt-0.5">{user?.role || 'Superuser'}</p>
              </div>
              <div className="p-2 space-y-1">
                <button
                  type="button"
                  onClick={() => handleQuickJump('/admin/dashboard')}
                  className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-gray-300 hover:bg-dark-hover hover:text-white transition-colors"
                >
                  Go to dashboard
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-gray-300 hover:bg-red-400/10 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
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

AdminTopBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  onRefresh: PropTypes.func,
  onShiftReport: PropTypes.func,
}
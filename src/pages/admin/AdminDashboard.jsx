import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShoppingBag, FiDollarSign, FiClock,
  FiStar, FiBell, FiRefreshCw, FiSearch
} from 'react-icons/fi'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useAuth } from '../../context/AuthContext'

// ─── Mock Data ────────────────────────────────────────────────────
const stats = [
  {
    label: 'Orders Today',
    value: '42',
    icon: FiShoppingBag,
    badge: '↑ 12%',
    badgeColor: 'text-green-400 bg-green-400/10',
  },
  {
    label: 'Revenue Today',
    value: '$1,250.00',
    icon: FiDollarSign,
    badge: null,
    valueColor: 'text-primary',
  },
  {
    label: 'Pending Orders',
    value: '8',
    icon: FiClock,
    badge: '8 Active',
    badgeColor: 'text-orange-400 bg-orange-400/10',
  },
  {
    label: 'Average Rating',
    value: '4.8 / 5.0',
    icon: FiStar,
    badge: null,
  },
]

const recentOrders = [
  {
    id: '#MV-8429',
    customer: 'Elena Rodriguez',
    items: 'Nebula Risotto, Lunar Truffle...',
    total: '$124.50',
    status: 'pending',
  },
  {
    id: '#MV-8428',
    customer: 'James Chen',
    items: 'Stardust Cocktail x2',
    total: '$38.00',
    status: 'preparing',
  },
  {
    id: '#MV-8427',
    customer: 'Sarah Miller',
    items: 'Moon-Glazed Duck',
    total: '$86.20',
    status: 'ready',
  },
  {
    id: '#MV-8426',
    customer: 'Marcus Thorne',
    items: 'Lunar Selection Tray',
    total: '$150.00',
    status: 'completed',
  },
]

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const barHeights = [40, 65, 50, 80, 95, 70, 45]

// ─── Status Badge ─────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    pending:   'bg-orange-400/15 text-orange-400',
    preparing: 'bg-blue-400/15 text-blue-400',
    ready:     'bg-green-400/15 text-green-400',
    completed: 'bg-gray-500/20 text-gray-400',
  }
  const labels = {
    pending: 'Pending', preparing: 'Preparing',
    ready: 'Ready', completed: 'Completed',
  }
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

// ─── Stats Card ───────────────────────────────────────────────────
const StatsCard = ({ stat }) => {
  const Icon = stat.icon
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center border border-dark-border">
          <Icon size={18} className="text-gray-400" />
        </div>
        {stat.badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.badgeColor}`}>
            {stat.badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{stat.label}</p>
        <p className={`font-bold text-2xl mt-0.5 ${stat.valueColor || 'text-white'}`}>
          {stat.value}
        </p>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-dark font-poppins flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">

        {/* ── Top Bar ─────────────────────────────────── */}
        <header className="sticky top-0 z-30 bg-dark/90 backdrop-blur border-b border-dark-border px-8 py-4 flex items-center justify-between">

          {/* Greeting */}
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              {greeting}, Admin 👋
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">{dateStr}</p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input
                type="text"
                placeholder="Search operations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
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
              Shift Report
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* ── Page Body ───────────────────────────────── */}
        <main className="flex-1 p-8 space-y-8">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(stat => (
              <StatsCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Recent Orders + Weekly Goal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Orders Table */}
            <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl overflow-hidden">

              {/* Table Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
                <div>
                  <h2 className="text-white font-bold text-base">Recent Orders</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Live transaction monitoring</p>
                </div>
                <Link
                  to="/admin/orders"
                  className="text-primary text-sm font-medium hover:text-primary-light transition-colors"
                >
                  View All →
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-border">
                      {['ORDER ID', 'CUSTOMER', 'ITEMS', 'TOTAL', 'STATUS', 'ACTION'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-xs text-gray-600 font-semibold tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-dark-hover transition-colors">
                        <td className="px-6 py-4 text-primary text-sm font-medium">{order.id}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm max-w-[140px] truncate">{order.items}</td>
                        <td className="px-6 py-4 text-primary font-semibold text-sm">{order.total}</td>
                        <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                        <td className="px-6 py-4">
                          <Link
                            to="/admin/orders"
                            className="text-gray-500 hover:text-primary text-xs transition-colors"
                          >
                            Manage →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col">
              <h2 className="text-white font-bold text-base mb-1">Weekly Goal</h2>
              <p className="text-gray-500 text-xs mb-6">Order volume comparison</p>

              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-2 flex-1 mb-4">
                {weekDays.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        i === 4 ? 'bg-primary' : 'bg-dark-border'
                      }`}
                      style={{ height: `${barHeights[i]}px` }}
                    />
                    <span className="text-gray-600 text-xs">{day}</span>
                  </div>
                ))}
              </div>

              {/* Weekly Avg */}
              <div className="bg-dark rounded-xl p-4 border border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-xs">Weekly Avg.</span>
                  <span className="text-white font-bold text-sm">286 Orders</span>
                </div>
                <div className="w-full h-1.5 bg-dark-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Banner ──────────────────────────────────── */}
          <div className="relative rounded-2xl overflow-hidden border border-dark-border">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200')` }}
            />
            <div className="absolute inset-0 bg-dark/75" />
            <div className="relative z-10 p-8 max-w-lg">
              <span className="inline-block bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                New Feature
              </span>
              <h3 className="text-white font-extrabold text-2xl mb-3">
                Celestial Rewards Launching
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Our new loyalty program integration is now ready. Start tracking moon-points for your regular diners to enhance their evening experience.
              </p>
              <button className="border border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                Configure Now ✦
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
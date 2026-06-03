import { useState } from 'react'
import {
  FiSearch, FiCalendar, FiChevronDown, FiPlus
} from 'react-icons/fi'
import AdminSidebar, { AdminTopBar } from '../../components/admin/AdminSidebar'
import toast from 'react-hot-toast'

// ─── Constants ────────────────────────────────────────────────────
const STATUS_TABS = ['All Orders', 'Pending', 'Preparing', 'Ready', 'Completed']

const STATUS_STYLES = {
  pending:   'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  preparing: 'bg-blue-500/20   text-blue-400   border border-blue-500/30',
  ready:     'bg-green-500/20  text-green-400  border border-green-500/30',
  completed: 'bg-gray-500/20   text-gray-400   border border-gray-500/30',
}

const STATUS_OPTIONS = ['pending', 'preparing', 'ready', 'completed']

// ─── Mock Orders ──────────────────────────────────────────────────
const initialOrders = [
  {
    _id: 'MV-8429',
    customerName: 'Aria Sterling',
    timePlaced: '12 mins ago',
    status: 'pending',
    total: 118.00,
    items: [
      { name: 'Signature Crescent', qty: 2 },
      { name: 'Nebula Gnocchi',     qty: 1 },
      { name: 'Starlight Elixir',   qty: 3 },
    ],
  },
  {
    _id: 'MV-8431',
    customerName: 'Cyrus Vane',
    timePlaced: '24 mins ago',
    status: 'preparing',
    total: 204.50,
    items: [
      { name: 'Lunar Sea Bass',  qty: 1 },
      { name: 'Galaxy Tartare', qty: 2 },
    ],
  },
  {
    _id: 'MV-8435',
    customerName: 'Lydia Thorne',
    timePlaced: '45 mins ago',
    status: 'preparing',
    total: 87.00,
    items: [
      { name: 'Solar Flare Risotto',  qty: 1 },
      { name: 'Cosmic Berry Mousse', qty: 2 },
    ],
  },
  {
    _id: 'MV-8440',
    customerName: 'Ethan Morrow',
    timePlaced: '1 hr ago',
    status: 'ready',
    total: 156.00,
    items: [
      { name: 'Eclipse Steak',     qty: 1 },
      { name: 'Moonrise Cocktail', qty: 2 },
    ],
  },
  {
    _id: 'MV-8418',
    customerName: 'Nora Quinn',
    timePlaced: '2 hrs ago',
    status: 'completed',
    total: 92.00,
    items: [
      { name: 'Stardust Risotto', qty: 1 },
      { name: 'Nebula Gnocchi',   qty: 1 },
    ],
  },
]

// ─── Status Dropdown ──────────────────────────────────────────────
const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${STATUS_STYLES[value]}`}
      >
        {value}
        <FiChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-dark-card border border-dark-border rounded-xl overflow-hidden z-20 min-w-[130px] shadow-xl">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors hover:bg-dark-hover ${
                opt === value ? 'text-primary font-semibold' : 'text-gray-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Order Card ───────────────────────────────────────────────────
const OrderCard = ({ order, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col gap-5 hover:border-primary/20 transition-all duration-300">

      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-primary text-sm font-bold tracking-widest">
            #{order._id}
          </p>
          <h3 className="text-white font-bold text-2xl mt-0.5">{order.customerName}</h3>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs tracking-widest uppercase">Time Placed</p>
          <p className="text-white text-sm font-semibold mt-0.5">{order.timePlaced}</p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">Order Items</p>
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{item.name}</span>
              <span className="text-primary font-bold text-sm">x{item.qty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-border">
        <div>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Total Amount</p>
          <p className="text-primary font-black text-2xl mt-0.5">
            ${order.total.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Dropdown */}
          <StatusDropdown
            value={order.status}
            onChange={(newStatus) => onStatusChange(order._id, newStatus)}
          />

          {/* View Details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-primary/10 border border-primary text-primary font-bold text-xs px-5 py-2.5 rounded-lg tracking-widest uppercase hover:bg-primary hover:text-dark transition-all duration-200"
          >
            {expanded ? 'HIDE' : 'VIEW'}<br />DETAILS
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-dark-border pt-4 space-y-2 animate-fade-in">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Full Breakdown</p>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-400">{item.name} × {item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-dark-border">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="text-primary font-bold">${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Incoming Slot Card ───────────────────────────────────────────
const IncomingSlot = () => (
  <div className="bg-dark-card border border-dashed border-dark-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[200px] opacity-60">
    <div className="w-14 h-14 border border-dark-border rounded-xl flex items-center justify-center">
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary opacity-60">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    </div>
    <div className="text-center">
      <p className="text-gray-400 font-semibold text-sm">Incoming Order Slot</p>
      <p className="text-gray-600 text-xs mt-1">Waiting for new celestial requests...</p>
    </div>
  </div>
)

// ─── Main Page ────────────────────────────────────────────────────
const AdminOrdersPage = () => {
  const [orders, setOrders]     = useState(initialOrders)
  const [activeTab, setActiveTab] = useState('All Orders')
  const [search, setSearch]     = useState('')

  // Active orders count
  const activeCount = orders.filter(
    o => o.status === 'pending' || o.status === 'preparing'
  ).length

  // Filter by tab + search
  const filtered = orders.filter(order => {
    const matchTab = activeTab === 'All Orders'
      ? true
      : order.status === activeTab.toLowerCase()
    const matchSearch = order.customerName.toLowerCase().includes(search.toLowerCase())
      || order._id.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  // Update status
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
    )
    toast.success(`Order #${orderId} marked as ${newStatus}`)
  }

  // Show empty slot if odd number of cards
  const showIncomingSlot = filtered.length % 2 !== 0

  return (
    <div className="flex min-h-screen bg-dark font-poppins">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar title="Order Management" />

        <div className="flex-1 overflow-y-auto p-8">

          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-white font-black text-4xl leading-tight">
                Order Management
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Real-time tracking of celestial gastronomy requests.
              </p>
            </div>

            {/* Date + Search Row */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-dark-card border border-dark-border text-white rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 w-52"
                />
              </div>
              <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg px-4 py-2.5">
                <FiCalendar size={14} className="text-primary" />
                <span className="text-white text-sm font-medium">Today, Oct 24</span>
                <FiChevronDown size={13} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Tabs Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1 border-b border-dark-border">
              {STATUS_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Active Orders Badge */}
            <div className="bg-dark-card border border-dark-border rounded-full px-4 py-1.5">
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                {activeCount} Active Orders
              </span>
            </div>
          </div>

          {/* Orders Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <p className="text-lg">No orders found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map(order => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {showIncomingSlot && <IncomingSlot />}
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary-light text-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-105 z-30">
        <FiPlus size={22} />
      </button>
    </div>
  )
}

export default AdminOrdersPage
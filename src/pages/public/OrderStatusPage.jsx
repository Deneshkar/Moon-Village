import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiClock, FiRefreshCw } from 'react-icons/fi'
import { FiCheck } from 'react-icons/fi'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useAuth } from '../../context/AuthContext'

// ─── Step Config ──────────────────────────────────────────────────
const STEPS = [
  { key: 'pending',   label: 'Order Placed' },
  { key: 'preparing', label: 'Preparing'    },
  { key: 'ready',     label: 'Ready to Serve' },
  { key: 'completed', label: 'Completed'    },
]

// ─── Mock Order Data ──────────────────────────────────────────────
const mockOrder = {
  id: '1042',
  customerName: 'John Doe',
  placedAt: 'Today, 7:30 PM',
  status: 'preparing',
  estimatedTime: '~15 mins',
  items: [
    {
      _id: '1',
      name: 'Signature Crescent',
      quantity: 1,
      price: 14.00,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    },
    {
      _id: '2',
      name: 'Exotic Seafood Pasta',
      quantity: 1,
      price: 32.00,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    },
  ],
}

// ─── Stepper Component ────────────────────────────────────────────
const OrderStepper = ({ currentStatus }) => {
  const currentIndex = STEPS.findIndex(s => s.key === currentStatus)

  return (
    <div className="flex items-start justify-between w-full mt-6 mb-2 relative">

      {/* Progress Line Background */}
      <div className="absolute top-5 left-10 right-10 h-0.5 bg-dark-border z-0" />

      {/* Progress Line Fill */}
      <div
        className="absolute top-5 left-10 h-0.5 bg-primary z-0 transition-all duration-700"
        style={{ width: `${(currentIndex / (STEPS.length - 1)) * 82}%` }}
      />

      {STEPS.map((step, index) => {
        const isDone    = index < currentIndex
        const isActive  = index === currentIndex
        const isInactive = index > currentIndex

        return (
          <div key={step.key} className="flex flex-col items-center z-10 flex-1">

            {/* Circle */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
              isDone
                ? 'bg-primary border-primary'
                : isActive
                ? 'bg-dark-card border-primary shadow-lg shadow-primary/30'
                : 'bg-dark-card border-dark-border'
            }`}>
              {isDone ? (
                <FiCheck size={16} className="text-dark font-bold" strokeWidth={3} />
              ) : isActive ? (
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse-slow" />
              ) : (
                <div className="w-3 h-3 bg-dark-border rounded-full" />
              )}
            </div>

            {/* Label */}
            <p className={`text-xs mt-2 text-center font-medium transition-colors ${
              isDone || isActive ? 'text-primary' : 'text-gray-600'
            }`}>
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
const OrderStatusPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [order, setOrder] = useState(mockOrder)
  const [countdown, setCountdown] = useState(30)

  // Auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Replace with real API call later:
          // fetchOrderStatus(orderId).then(data => setOrder(data))
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [orderId])

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      <div className="pt-24 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-2xl">

          {/* ── Main Card ───────────────────────────────── */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">

            {/* Header Row */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-primary font-bold text-2xl">
                  Order #{order.id}
                </h1>
                <p className="text-gray-300 text-sm mt-1">{order.customerName}</p>
                <p className="text-gray-500 text-sm">{order.placedAt}</p>
              </div>

              {/* Ready In Badge */}
              {order.status !== 'completed' && (
                <div className="flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-medium px-4 py-2 rounded-full">
                  <FiClock size={14} />
                  Ready in {order.estimatedTime}
                </div>
              )}
            </div>

            {/* Stepper */}
            <OrderStepper currentStatus={order.status} />

            {/* Divider */}
            <div className="border-t border-dark-border mt-8 mb-6" />

            {/* Your Selection */}
            <p className="text-xs text-gray-500 tracking-widest uppercase font-semibold mb-4">
              Your Selection
            </p>

            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item._id} className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                  </div>

                  {/* Price */}
                  <span className="text-primary font-bold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-dark-border mt-6 mb-5" />

            {/* Need Help */}
            <button
              onClick={() => navigate('/reviews')}
              className="w-full text-center text-primary text-sm font-medium hover:text-primary-light transition-colors"
            >
              Need help? →
            </button>
          </div>

          {/* ── Auto-refresh indicator ───────────────────── */}
          <div className="flex items-center justify-center gap-2 mt-5 text-gray-600 text-sm">
            <FiRefreshCw size={13} className={countdown <= 5 ? 'animate-spin' : ''} />
            <span>
              Auto-refreshing in{' '}
              <span className="text-gray-400 font-medium">{countdown}</span>{' '}
              seconds...
            </span>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderStatusPage
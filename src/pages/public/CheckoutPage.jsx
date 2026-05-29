import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiMonitor, FiCreditCard } from 'react-icons/fi'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()

  const TAX_RATE = 0.05
  const tax = cartTotal * TAX_RATE
  const total = cartTotal + tax

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    isDelivery: false,
    tableNumber: '',
    instructions: '',
    paymentMethod: 'counter',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!formData.fullName || !formData.phone) {
      toast.error('Please fill in your name and phone number')
      return
    }
    if (!formData.isDelivery && !formData.tableNumber) {
      toast.error('Please enter your table number')
      return
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)
    try {
      // Replace with real API call later:
      // const res = await orderService.placeOrder({ ...formData, items: cartItems, total })
      // navigate(`/order-status/${res.data.orderId}`)

      // Mock order for now
      const mockOrderId = 'ORD' + Date.now()
      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/order-status/${mockOrderId}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  // If cart is empty redirect to menu
  if (cartItems.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-dark font-poppins">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-primary text-dark font-bold px-8 py-3 rounded-lg"
          >
            Browse Menu
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Your Order ──────────────────────────── */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
            <h2 className="text-white font-bold text-xl mb-6">Your Order</h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{item.description}</p>
                  </div>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <FiMinus size={11} />
                    </button>
                    <span className="text-white text-sm font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <FiPlus size={11} />
                    </button>
                  </div>

                  {/* Price */}
                  <span className="text-primary font-bold text-sm w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-600 hover:text-red-400 transition-colors ml-1"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-dark-border pt-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-300">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax (5%)</span>
                <span className="text-gray-300">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-dark-border">
                <span className="text-primary font-bold text-base">Total</span>
                <span className="text-primary font-bold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* ── Right: Your Details ───────────────────────── */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
            <h2 className="text-white font-bold text-xl mb-6">Your Details</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>

              {/* Delivery Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Delivery Mode</label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isDelivery: !prev.isDelivery }))}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                    formData.isDelivery ? 'bg-primary' : 'bg-dark-border'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                    formData.isDelivery ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Table Number or Address */}
              {!formData.isDelivery ? (
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Table Number</label>
                  <input
                    type="text"
                    name="tableNumber"
                    placeholder="e.g. M-14"
                    value={formData.tableNumber}
                    onChange={handleChange}
                    className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Delivery Address</label>
                  <textarea
                    name="deliveryAddress"
                    placeholder="Enter your delivery address..."
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Any special instructions?</label>
                <textarea
                  name="instructions"
                  placeholder="Any special instructions for your order?"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-sm text-gray-400 block mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'counter' }))}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      formData.paymentMethod === 'counter'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-400 hover:border-primary/40'
                    }`}
                  >
                    <FiMonitor size={20} />
                    <span className="text-sm font-medium">Pay at Counter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online' }))}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      formData.paymentMethod === 'online'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-dark-border text-gray-400 hover:border-primary/40'
                    }`}
                  >
                    <FiCreditCard size={20} />
                    <span className="text-sm font-medium">Online Pay</span>
                  </button>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-center text-gray-600 text-xs italic">
                You'll receive a confirmation shortly
              </p>

            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutPage
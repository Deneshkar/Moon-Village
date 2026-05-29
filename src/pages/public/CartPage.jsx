import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useCart } from '../../context/CartContext'

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart()

  const TAX_RATE = 0.05
  const tax = cartTotal * TAX_RATE
  const total = cartTotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark font-poppins">
        <Navbar />

        <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FiShoppingCart size={28} />
            </div>
            <h1 className="text-white font-bold text-3xl mb-3">Your cart is empty</h1>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
              Add a few dishes from the menu and come back here to review your selection before checkout.
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-dark font-bold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Browse Menu
            </button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <FiShoppingCart size={14} />
              Cart Review
            </div>
            <h1 className="text-4xl font-extrabold text-white">Your Cart</h1>
            <p className="text-gray-500 text-sm mt-2">Review quantities, remove items, and continue to checkout when ready.</p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.9fr] gap-8 items-start">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-xl">Selected Items</h2>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {cartCount} items
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-dark border border-dark-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-44 sm:h-24 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold text-base">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <span className="text-primary font-bold text-base whitespace-nowrap sm:hidden">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 border border-dark-border rounded-full flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="w-8 text-center text-white font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 border border-dark-border rounded-full flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-primary font-bold text-base whitespace-nowrap">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-7 sticky top-24">
            <h2 className="text-white font-bold text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-200">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tax (5%)</span>
                <span className="text-gray-200">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-dark-border pt-4 flex items-center justify-between">
                <span className="text-primary font-bold text-base">Total</span>
                <span className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-3.5 rounded-xl transition-all duration-200"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/menu"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-dark-border text-gray-300 hover:text-primary hover:border-primary/50 font-semibold py-3.5 rounded-xl transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CartPage
import { FiX, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartSidebar = () => {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, updateQuantity } = useCart()
  const navigate = useNavigate()

  const handleViewCart = () => {
    setIsCartOpen(false)
    navigate('/cart')
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsCartOpen(false)}
        aria-label="Close cart sidebar"
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-dark-card border-l border-dark-border z-50 flex flex-col animate-slide-in">

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-dark-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-base">Your Selection</h2>
              <span className="w-5 h-5 bg-primary text-dark text-xs font-bold rounded-full flex items-center justify-center">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-0.5">Moon Village Dining</p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-600">
              <FiShoppingCart size={32} className="mb-3" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="flex items-center gap-3 bg-dark rounded-xl p-3 border border-dark-border">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-primary text-sm font-bold mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-5 h-5 rounded-full border border-dark-border flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <FiMinus size={10} />
                    </button>
                    <span className="text-white text-xs font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-5 h-5 rounded-full border border-dark-border flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <FiPlus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-white font-bold text-xl">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleViewCart}
                className="w-full border border-dark-border text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:border-primary hover:text-primary"
              >
                View Full Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-3 rounded-lg transition-all duration-200"
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar
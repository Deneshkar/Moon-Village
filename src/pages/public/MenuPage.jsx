import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import CartSidebar from '../../components/public/CartSidebar'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Categories ───────────────────────────────────────────────────
const CATEGORIES = ['All', 'Biryani', 'Kottu', 'BBQ', 'Rice', 'Soups', 'Desserts', 'Drinks']

// ─── Mock Menu Data ───────────────────────────────────────────────
const mockMenuItems = [
  {
    _id: '1',
    name: 'Signature Crescent Dish',
    category: 'BBQ',
    price: 36.00,
    description: 'Exquisite pan-seared duck breast with cosmic fig glaze...',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    isAvailable: true,
  },
  {
    _id: '2',
    name: 'Exotic Seafood Pasta',
    category: 'Rice',
    price: 28.00,
    description: 'Medley of premium catches, hand-rolled pasta, and moon...',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
    isAvailable: true,
  },
  {
    _id: '3',
    name: 'Prime Seared Steak',
    category: 'BBQ',
    price: 42.00,
    description: '28-day aged ribeye, charred nebula vegetables, and...',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400',
    isAvailable: true,
  },
  {
    _id: '4',
    name: 'Artisan Gold Leaf Cocoa',
    category: 'Desserts',
    price: 18.00,
    description: 'Dark chocolate dome, gold leaf finish, with a trail of...',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    isAvailable: true,
  },
  {
    _id: '5',
    name: 'Nebula Biryani',
    category: 'Biryani',
    price: 24.00,
    description: 'Fragrant saffron-infused rice layered with spiced stardust...',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    isAvailable: true,
  },
  {
    _id: '6',
    name: 'Starfall Soups',
    category: 'Soups',
    price: 12.00,
    description: 'Seasonal harvest bisque with truffle swirls and silver leaf...',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    isAvailable: false,
  },
]

// ─── Dish Card ────────────────────────────────────────────────────
const MenuDishCard = ({ dish }) => {
  const { addToCart } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }
    addToCart(dish)
    toast.success(`${dish.name} added to cart!`)
  }

  return (
    <div className={`bg-dark-card border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 ${
      dish.isAvailable ? 'border-dark-border' : 'border-dark-border opacity-75'
    }`}>

      {/* Image */}
      <div className="relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-52 object-cover"
        />
        {/* Availability Badge */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
          dish.isAvailable
            ? 'bg-green-500/90 text-white'
            : 'bg-red-500/90 text-white'
        }`}>
          {dish.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base leading-snug mb-2">{dish.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{dish.description}</p>

        {/* Price + Button */}
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold text-lg">${dish.price.toFixed(2)}</span>
          {dish.isAvailable ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 border border-primary/60 text-primary text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-dark transition-all duration-200"
            >
              <FiShoppingCart size={12} />
              Add to Cart
            </button>
          ) : (
            <span className="text-gray-600 text-xs font-semibold px-4 py-2 border border-dark-border rounded-lg">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main MenuPage ────────────────────────────────────────────────
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? mockMenuItems
    : mockMenuItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      {/* Cart Sidebar */}
      <CartSidebar />

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-3">Our Menu</h1>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {/* Left accent bar */}
          <div className="w-1 h-8 bg-primary rounded-full mr-1 hidden md:block" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-primary text-dark border-primary font-semibold'
                  : 'bg-transparent text-gray-400 border-dark-border hover:border-primary/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">No items in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(dish => (
              <MenuDishCard key={dish._id} dish={dish} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MenuPage
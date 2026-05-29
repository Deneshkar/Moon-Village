import { useNavigate } from 'react-router-dom'
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Feature Cards Data ───────────────────────────────────────────
const features = [
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    desc: 'Sourced daily from local moon-valley farms to ensure every bite delivers peak seasonal freshness and vibrant flavor profiles.',
  },
  {
    icon: '🌙',
    title: 'Cozy Atmosphere',
    desc: 'Dine under a canopy of starlight in our intimate, navy-hued sanctuary designed for deep conversations and lasting memories.',
  },
  {
    icon: '🍴',
    title: 'Wide Variety',
    desc: 'From ocean treasures to terrestrial delights, our curated menu spans the globe while maintaining celestial standards.',
  },
]

// ─── Mock Popular Dishes ──────────────────────────────────────────
const popularDishes = [
  {
    _id: '1',
    name: 'Prime Seared Steak',
    price: 42.00,
    description: 'Roasted root vegetables with a red wine reduction and celestial herbs.',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400',
    badge: 'Best Seller',
  },
  {
    _id: '2',
    name: 'Artisan Gold Leaf Cocoa',
    price: 18.00,
    description: 'Dark chocolate mousse layered with 24k gold leaf and velvet ganache.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    badge: null,
  },
  {
    _id: '3',
    name: 'Signature Crescent Dish',
    price: 36.00,
    description: 'Gourmet signature presentation with seasonal reductions and cosmic accents.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    badge: null,
  },
]

// ─── Dish Card Component ──────────────────────────────────────────
const DishCard = ({ dish }) => {
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
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-52 object-cover"
        />
        {dish.badge && (
          <span className="absolute top-3 right-3 bg-primary text-dark text-xs font-bold px-2.5 py-1 rounded">
            {dish.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-bold text-base leading-snug">{dish.name}</h3>
          <span className="text-primary font-bold text-base whitespace-nowrap">
            ${dish.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{dish.description}</p>
        <button
          onClick={handleAddToCart}
          className="w-full border border-primary text-primary text-xs font-bold py-2.5 rounded tracking-widest uppercase hover:bg-primary hover:text-dark transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FiShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// ─── Main HomePage ────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate()
  const [dishStart, setDishStart] = useState(0)

  const handlePrev = () => setDishStart(prev => Math.max(0, prev - 1))
  const handleNext = () => setDishStart(prev => Math.min(popularDishes.length - 3, prev + 1))

  const visibleDishes = popularDishes.slice(dishStart, dishStart + 3)

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600')` }}
        />
        <div className="absolute inset-0 bg-dark/70" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Experience the Taste of{' '}
            <span className="text-primary">Moon Village</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Authentic flavors, unforgettable atmosphere. Embark on a celestial culinary journey where every dish tells a story of tradition and luxury.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/menu')}
              className="bg-primary hover:bg-primary-light text-dark font-bold px-8 py-3 rounded transition-all duration-200"
            >
              View Menu
            </button>
            <button className="border border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-all duration-200">
              Book a Table
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary animate-bounce">
          <FiChevronDown size={28} />
        </div>
      </section>

      {/* ── Features Section ─────────────────────────────── */}
      <section className="py-24 px-6 bg-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-dark-card border border-dark-border rounded-xl p-7 hover:border-primary/40 transition-all duration-300"
            >
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Most Loved Dishes ─────────────────────────────── */}
      <section className="py-20 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-white">
                Most Loved <span className="text-primary">Dishes</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">The crowd favorites of the lunar cycle.</p>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={dishStart === 0}
                className="w-9 h-9 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all disabled:opacity-30"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={dishStart >= popularDishes.length - 3}
                className="w-9 h-9 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all disabled:opacity-30"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Dish Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleDishes.map(dish => (
              <DishCard key={dish._id} dish={dish} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/menu')}
              className="border border-primary text-primary font-semibold px-10 py-3 rounded hover:bg-primary hover:text-dark transition-all duration-200 tracking-wide"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
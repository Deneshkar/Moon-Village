import { useState } from 'react'
import { FiStar, FiMessageSquare } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Mock Data ────────────────────────────────────────────────────
const mockReviews = [
  {
    _id: '1',
    name: 'Aria Sterling',
    initials: 'AS',
    date: '2 days ago',
    rating: 2,
    dish: 'Signature Crescent',
    comment: 'The atmosphere here is truly celestial. The Signature Crescent was cooked to perfection — flavors that dance like moonlight on water. An unforgettable evening.',
    adminReply: null,
  },
  {
    _id: '2',
    name: 'Julian Lane',
    initials: 'JL',
    date: '1 week ago',
    rating: 2,
    dish: 'Nebula Gnocchi',
    comment: 'Great presentation, though the service was a bit slower than expected for a Tuesday night. The gnocchi was a bit rich for my taste but definitely high quality.',
    adminReply: "Hello Julian, we appreciate your honest feedback. We're sorry about the wait time and will look into our Tuesday staffing. We hope to see you again soon for a faster experience!",
  },
  {
    _id: '3',
    name: 'Elena Vance',
    initials: 'EV',
    date: '2 weeks ago',
    rating: 5,
    dish: 'Stardust Risotto',
    comment: 'A true sensory journey. From the moment we walked in, the service was impeccable. The Stardust Risotto is a must-try for any gourmet enthusiast.',
    adminReply: null,
  },
  {
    _id: '4',
    name: 'Marcus Chen',
    initials: 'MC',
    date: '1 month ago',
    rating: 5,
    dish: 'Eclipse Steak',
    comment: 'Expertly seasoned and perfectly medium-rare. The wine pairing suggested by the sommelier was outstanding. Moon Village is now our go-to for special occasions.',
    adminReply: null,
  },
]

const ratingBreakdown = [
  { star: 5, count: 12 },
  { star: 4, count: 8  },
  { star: 3, count: 2  },
  { star: 2, count: 1  },
  { star: 1, count: 1  },
]

const DISHES = [
  'Signature Crescent', 'Exotic Seafood Pasta', 'Prime Seared Steak',
  'Artisan Gold Leaf Cocoa', 'Nebula Biryani', 'Starfall Soups',
]

const FILTER_STARS = ['All', '5★', '4★', '3★', '2★', '1★']
const SORT_OPTIONS = ['Most Recent', 'Worst First']

// ─── Star Display ─────────────────────────────────────────────────
const StarDisplay = ({ rating, size = 14 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        i <= rating
          ? <FaStar key={i} size={size} className="text-primary" />
          : <FaRegStar key={i} size={size} className="text-gray-600" />
      ))}
    </div>
  )
}

// ─── Star Selector ────────────────────────────────────────────────
const StarSelector = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          {i <= (hovered || value)
            ? <FaStar size={24} className="text-primary" />
            : <FaRegStar size={24} className="text-gray-600" />
          }
        </button>
      ))}
    </div>
  )
}

// ─── Review Card ──────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div className="bg-dark-card border border-dark-border rounded-xl p-6">

    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-dark-hover border border-dark-border flex items-center justify-center text-gray-300 text-xs font-bold flex-shrink-0">
          {review.initials}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{review.name}</p>
          <p className="text-gray-500 text-xs">{review.date}</p>
        </div>
      </div>
      <StarDisplay rating={review.rating} />
    </div>

    {/* Dish tag */}
    <span className="inline-block bg-dark border border-dark-border text-gray-400 text-xs font-semibold px-3 py-1 rounded mb-3 tracking-wide uppercase">
      {review.dish}
    </span>

    {/* Comment */}
    <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>

    {/* Admin Reply */}
    {review.adminReply && (
      <div className="mt-4 border-l-2 border-primary pl-4 bg-dark/50 rounded-r-lg py-3 pr-3">
        <p className="text-primary text-xs font-semibold mb-1">Moon Village replied:</p>
        <p className="text-gray-400 text-xs leading-relaxed italic">{review.adminReply}</p>
      </div>
    )}
  </div>
)

// ─── Main ReviewsPage ─────────────────────────────────────────────
const ReviewsPage = () => {
  const { isLoggedIn } = useAuth()

  const [filterStar, setFilterStar] = useState('All')
  const [sortBy, setSortBy]         = useState('Most Recent')
  const [reviews, setReviews]       = useState(mockReviews)

  const [form, setForm] = useState({
    name: '', dish: DISHES[0], rating: 0, message: ''
  })

  const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0)
  const avgRating    = (
    ratingBreakdown.reduce((s, r) => s + r.star * r.count, 0) / totalReviews
  ).toFixed(1)

  // Filter + Sort
  const filtered = reviews
    .filter(r => {
      if (filterStar === 'All') return true
      return r.rating === parseInt(filterStar)
    })
    .sort((a, b) => {
      if (sortBy === 'Worst First') return a.rating - b.rating
      return b._id.localeCompare(a._id)
    })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message || form.rating === 0) {
      toast.error('Please fill in all fields and select a rating')
      return
    }

    // Add review locally (replace with API call later)
    const newReview = {
      _id: Date.now().toString(),
      name: form.name,
      initials: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      date: 'Just now',
      rating: form.rating,
      dish: form.dish,
      comment: form.message,
      adminReply: null,
    }
    setReviews(prev => [newReview, ...prev])
    setForm({ name: '', dish: DISHES[0], rating: 0, message: '' })
    toast.success('Review submitted!')
  }

  return (
    <div className="min-h-screen bg-dark font-poppins">
      <Navbar />

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">

        {/* ── Page Title ───────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-3">Customer Reviews</h1>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        {/* ── Rating Summary ───────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">

          {/* Big Score */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-8 flex flex-col items-center justify-center min-w-[180px]">
            <span className="text-primary font-black text-6xl leading-none">{avgRating}</span>
            <StarDisplay rating={Math.round(parseFloat(avgRating))} size={16} />
            <p className="text-gray-500 text-sm mt-2">Based on {totalReviews} reviews</p>
          </div>

          {/* Breakdown Bars */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex-1">
            <div className="space-y-2.5">
              {ratingBreakdown.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-6 text-right">{star} ★</span>
                  <div className="flex-1 h-2 bg-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-500 text-sm w-4">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filters Row ──────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">

          {/* Star Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTER_STARS.map(f => (
              <button
                key={f}
                onClick={() => setFilterStar(f === 'All' ? 'All' : parseInt(f))}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                  filterStar === (f === 'All' ? 'All' : parseInt(f))
                    ? 'bg-primary text-dark'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:border-primary/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort buttons */}
          <div className="flex items-center gap-2">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-4 py-1.5 rounded border text-sm font-medium transition-all ${
                  sortBy === opt
                    ? 'border-primary text-primary'
                    : 'border-dark-border text-gray-400 hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* ── Reviews Grid ─────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">No reviews found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {filtered.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}

        {/* ── Submit Review Form ───────────────────────── */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-2xl mx-auto">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-dark border border-dark-border rounded-xl flex items-center justify-center">
              <FiMessageSquare size={22} className="text-primary" />
            </div>
          </div>

          <h2 className="text-white font-bold text-xl text-center mb-8">
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name + Dish row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 tracking-widest uppercase block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 tracking-widest uppercase block mb-1.5">
                  Ordered Dish
                </label>
                <select
                  name="dish"
                  value={form.dish}
                  onChange={handleFormChange}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                >
                  {DISHES.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="text-xs text-gray-500 tracking-widest uppercase block mb-3 text-center">
                Your Rating
              </label>
              <div className="flex justify-center">
                <StarSelector
                  value={form.rating}
                  onChange={(val) => setForm(prev => ({ ...prev, rating: val }))}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-gray-500 tracking-widest uppercase block mb-1.5">
                Your Message
              </label>
              <textarea
                name="message"
                placeholder="How was your experience moonlit evening?"
                value={form.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-3.5 rounded-lg tracking-widest uppercase text-sm transition-all duration-200"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ReviewsPage
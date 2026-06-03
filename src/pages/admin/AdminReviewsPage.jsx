import { useState } from 'react'
import {
  FiBell, FiClock, FiUser, FiSend,
  FiSettings, FiHelpCircle
} from 'react-icons/fi'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

import AdminSidebar, { AdminTopBar } from '../../components/admin/AdminSidebar'

// ─── Star Display ─────────────────────────────────────────────────
const StarDisplay = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i =>
      i <= rating
        ? <FaStar key={i} size={size} className="text-primary" />
        : <FaRegStar key={i} size={size} className="text-gray-600" />
    )}
  </div>
)

// ─── Stats Cards Data ─────────────────────────────────────────────
const statsData = [
  {
    label: 'TOTAL REVIEWS',
    value: '1,284',
    sub: '+12% this month',
    subColor: 'text-green-400',
  },
  {
    label: 'AVERAGE RATING',
    value: '4.8',
    isStars: true,
    rating: 5,
  },
  {
    label: 'PENDING RESPONSE',
    value: '12',
    badge: 'HIGH PRIORITY',
    badgeColor: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  },
]

// ─── Tabs ─────────────────────────────────────────────────────────
const TABS = ['All Reviews', 'Unanswered', 'Replied', '1★-2★ (Negative)']

// ─── Mock Reviews ─────────────────────────────────────────────────
const mockReviews = [
  {
    _id: '1',
    name: 'Aria Sterling',
    initials: 'AS',
    date: '2 hours ago',
    rating: 2,
    dish: 'Nebula Gnocchi',
    comment: '"The gnocchi was like biting into a cloud. Truly celestial! The atmosphere at Moon Village is unmatched — the way the light hits the navy textures makes it feel like dining in deep space."',
    adminReply: null,
  },
  {
    _id: '2',
    name: 'Cyrus Vane',
    initials: 'CV',
    date: '1 day ago',
    rating: 4,
    dish: 'Lunar Sea Bass',
    comment: '"Excellent flavor profile, though the portion was slightly smaller than expected. The wine pairing recommendation was spot on."',
    adminReply: '"Thank you for your feedback, Cyrus! We prioritize quality over quantity but will certainly look into our portioning for the Sea Bass. We\'re delighted you enjoyed the sommelier\'s selection."',
  },
  {
    _id: '3',
    name: 'Elena Vance',
    initials: 'EV',
    date: '2 days ago',
    rating: 5,
    dish: 'Stardust Risotto',
    comment: '"A true sensory journey. The risotto was cooked to perfection. Will definitely be back!"',
    adminReply: null,
  },
  {
    _id: '4',
    name: 'Marcus Chen',
    initials: 'MC',
    date: '3 days ago',
    rating: 1,
    dish: 'Eclipse Steak',
    comment: '"Disappointed with the steak — it was overcooked and the sauce was too salty. Expected better for the price."',
    adminReply: null,
  },
]

// ─── Review Card ──────────────────────────────────────────────────
const ReviewCard = ({ review, onReply }) => {
  const [replyText, setReplyText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Please write a reply first')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      onReply(review._id, replyText)
      setReplyText('')
      setSubmitting(false)
      toast.success('Reply sent!')
    }, 500)
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-7">

      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-dark-hover border border-dark-border flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {review.initials}
          </div>
          <div>
            <p className="text-white font-bold text-base">{review.name}</p>
            <p className="text-gray-500 text-xs">{review.date}</p>
          </div>
        </div>

        {/* Right side — replied badge + stars + dish */}
        <div className="flex flex-col items-end gap-1.5">
          {review.adminReply && (
            <span className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
              ✓ REPLIED
            </span>
          )}
          <StarDisplay rating={review.rating} />
          <span className="text-gray-600 text-xs tracking-widest uppercase">
            {review.dish}
          </span>
        </div>
      </div>

      {/* Review Comment */}
      <p className="text-gray-300 text-sm leading-relaxed mb-5">
        {review.comment}
      </p>

      {/* Admin Reply (if exists) */}
      {review.adminReply ? (
        <div className="border-l-2 border-primary pl-5 py-3 bg-dark/40 rounded-r-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-xs">✦</span>
            <p className="text-primary text-sm font-bold">Moon Village Management</p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed italic">
            {review.adminReply}
          </p>
        </div>
      ) : (
        // Reply Box (only if not replied)
        <div>
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write your response as Moon Village..."
            rows={4}
            className="w-full bg-dark border border-dark-border text-white rounded-xl px-5 py-4 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSendReply}
              disabled={submitting}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-dark font-bold text-sm px-6 py-2.5 rounded-xl transition-all disabled:opacity-60"
            >
              <FiSend size={14} />
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
const AdminReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('All Reviews')
  const [reviews, setReviews]     = useState(mockReviews)
  const [showAll, setShowAll]     = useState(false)

  // Filter by tab
  const filtered = reviews.filter(r => {
    if (activeTab === 'All Reviews')        return true
    if (activeTab === 'Unanswered')         return !r.adminReply
    if (activeTab === 'Replied')            return !!r.adminReply
    if (activeTab === '1★-2★ (Negative)')  return r.rating <= 2
    return true
  })

  // Unanswered count for dot badge
  const unansweredCount = reviews.filter(r => !r.adminReply).length

  // Handle reply submit
  const handleReply = (reviewId, replyText) => {
    setReviews(prev =>
      prev.map(r => r._id === reviewId ? { ...r, adminReply: replyText } : r)
    )
  }

  return (
    <div className="flex min-h-screen bg-dark font-poppins">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar title="Review Management" />

        <div className="flex-1 overflow-y-auto p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-white font-black text-4xl">Review Management</h2>
            <p className="text-gray-500 text-sm mt-2">
              Monitor and respond to celestial guest experiences.
            </p>
          </div>

          {/* ── Stats Cards ─────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="bg-dark-card border border-dark-border rounded-2xl p-6"
              >
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">
                  {stat.label}
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-white font-black text-4xl leading-none">
                    {stat.value}
                  </span>
                  {stat.sub && (
                    <span className={`text-xs font-medium mb-1 ${stat.subColor}`}>
                      {stat.sub}
                    </span>
                  )}
                  {stat.badge && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded mb-1 ${stat.badgeColor}`}>
                      {stat.badge}
                    </span>
                  )}
                </div>
                {stat.isStars && (
                  <div className="mt-2">
                    <StarDisplay rating={stat.rating} size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Tabs ────────────────────────────────────── */}
          <div className="flex items-center gap-1 border-b border-dark-border mb-8">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}

                {/* Unanswered dot */}
                {tab === 'Unanswered' && unansweredCount > 0 && (
                  <span className="absolute top-2.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full" />
                )}

                {/* Active underline */}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* ── Review Cards ─────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              No reviews in this category.
            </div>
          ) : (
            <div className="space-y-5">
              {(showAll ? filtered : filtered.slice(0, 4)).map(review => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onReply={handleReply}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {filtered.length > 4 && (
            <div className="flex justify-center mt-10 border-t border-dark-border pt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-gray-500 hover:text-primary text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                {showAll ? 'SHOW LESS' : 'LOAD PAST REVIEWS'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminReviewsPage
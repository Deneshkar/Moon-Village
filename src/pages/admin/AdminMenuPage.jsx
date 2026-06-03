import { useState } from 'react'
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight, FiX,
  FiUploadCloud, FiSave
} from 'react-icons/fi'
import AdminSidebar, { AdminTopBar } from '../../components/admin/AdminSidebar'
import toast from 'react-hot-toast'

// ─── Constants ────────────────────────────────────────────────────
const CATEGORIES = [
  'All Categories', 'Main Courses', 'Appetizers',
  'Biryani', 'Kottu', 'BBQ', 'Soups', 'Desserts', 'Drinks'
]

const FORM_CATEGORIES = CATEGORIES.filter(c => c !== 'All Categories')

// ─── Mock Data ────────────────────────────────────────────────────
const initialItems = [
  {
    _id: '1',
    name: 'Signature Crescent',
    category: 'Main Courses',
    price: 42.00,
    description: 'Exquisite pan-seared duck breast with cosmic fig glaze.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100',
    isAvailable: true,
  },
  {
    _id: '2',
    name: 'Exotic Seafood Pasta',
    category: 'Appetizers',
    price: 38.50,
    description: 'Medley of premium catches with hand-rolled pasta.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100',
    isAvailable: true,
  },
  {
    _id: '3',
    name: 'Nebula Gnocchi',
    category: 'Main Courses',
    price: 34.00,
    description: 'Cloud-soft gnocchi with truffle and celestial herbs.',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=100',
    isAvailable: true,
  },
  {
    _id: '4',
    name: 'Stardust Risotto',
    category: 'Main Courses',
    price: 45.00,
    description: 'Slow-cooked risotto with saffron and parmesan.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100',
    isAvailable: false,
  },
]

// ─── Toggle Switch ────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
      value ? 'bg-primary' : 'bg-dark-border'
    }`}
  >
    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
      value ? 'left-5' : 'left-0.5'
    }`} />
  </button>
)

// ─── Empty Form State ─────────────────────────────────────────────
const emptyForm = {
  name: '', category: 'Main Courses',
  price: '', description: '', image: '', isAvailable: true,
}

// ─── Main Page ────────────────────────────────────────────────────
const AdminMenuPage = () => {
  const [items, setItems]           = useState(initialItems)
  const [search, setSearch]         = useState('')
  const [catFilter, setCatFilter]   = useState('All Categories')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId]   = useState(null)
  const [form, setForm]             = useState(emptyForm)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 4

  // ── Filter ──────────────────────────────────────────────────────
  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat    = catFilter === 'All Categories' || item.category === catFilter
    return matchSearch && matchCat
  })

  // ── Pagination ──────────────────────────────────────────────────
  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Open Drawer ─────────────────────────────────────────────────
  const openAddDrawer = () => {
    setForm(emptyForm)
    setEditingId(null)
    setDrawerOpen(true)
  }

  const openEditDrawer = (item) => {
    setForm({
      name: item.name, category: item.category,
      price: item.price, description: item.description,
      image: item.image, isAvailable: item.isAvailable,
    })
    setEditingId(item._id)
    setDrawerOpen(true)
  }

  // ── Save ────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error('Dish name and price are required')
      return
    }

    if (editingId) {
      // Edit existing
      setItems(prev => prev.map(i =>
        i._id === editingId ? { ...i, ...form, price: parseFloat(form.price) } : i
      ))
      toast.success('Item updated!')
    } else {
      // Add new
      const newItem = {
        ...form,
        _id: Date.now().toString(),
        price: parseFloat(form.price),
      }
      setItems(prev => [newItem, ...prev])
      toast.success('New item added!')
    }

    setDrawerOpen(false)
    setForm(emptyForm)
    setEditingId(null)
  }

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i._id !== id))
    toast.success('Item removed')
  }

  // ── Toggle Availability ─────────────────────────────────────────
  const toggleAvailability = (id) => {
    setItems(prev => prev.map(i =>
      i._id === id ? { ...i, isAvailable: !i.isAvailable } : i
    ))
  }

  return (
    <div className="flex min-h-screen bg-dark font-poppins">
      <AdminSidebar />

      {/* ── Main Content ──────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar title="Menu Management" />

        <div className="flex-1 overflow-y-auto p-8">

          {/* Page Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-2xl">Menu Management</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your celestial dining offerings</p>
            </div>
            <button
              onClick={openAddDrawer}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-dark font-bold px-5 py-2.5 rounded-lg transition-all"
            >
              <FiPlus size={16} />
              Add New Item
            </button>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-lg">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
              <input
                type="text"
                placeholder="Search dishes by name or category..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
                className="w-full bg-dark-card border border-dark-border text-white rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Category:</span>
              <select
                value={catFilter}
                onChange={e => { setCatFilter(e.target.value); setCurrentPage(1) }}
                className="bg-dark-card border border-dark-border text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden mb-4">
            {/* Table Head */}
            <div className="grid grid-cols-[80px_1fr_140px_100px_120px_100px] gap-4 px-6 py-3 border-b border-dark-border">
              {['IMAGE', 'DISH NAME', 'CATEGORY', 'PRICE', 'AVAILABILITY', 'ACTIONS'].map(h => (
                <span key={h} className="text-xs text-primary font-semibold tracking-widest">{h}</span>
              ))}
            </div>

            {/* Table Rows */}
            {paginated.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No items found.</div>
            ) : (
              paginated.map((item, idx) => (
                <div
                  key={item._id}
                  className={`grid grid-cols-[80px_1fr_140px_100px_120px_100px] gap-4 px-6 py-4 items-center transition-colors hover:bg-dark/40 ${
                    idx !== paginated.length - 1 ? 'border-b border-dark-border' : ''
                  }`}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  {/* Name */}
                  <span className="text-white text-sm font-medium">{item.name}</span>

                  {/* Category */}
                  <span className="bg-dark border border-dark-border text-gray-400 text-xs px-3 py-1 rounded-full w-fit uppercase tracking-wide">
                    {item.category}
                  </span>

                  {/* Price */}
                  <span className="text-primary font-bold text-sm">${item.price.toFixed(2)}</span>

                  {/* Toggle */}
                  <Toggle
                    value={item.isAvailable}
                    onChange={() => toggleAvailability(item._id)}
                  />

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEditDrawer(item)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-1">
            <p className="text-gray-500 text-sm">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{' '}
              {filtered.length} celestial dishes
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all disabled:opacity-30"
              >
                <FiChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-primary text-dark font-bold'
                      : 'border border-dark-border text-gray-400 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 border border-dark-border rounded flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all disabled:opacity-30"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add/Edit Drawer ───────────────────────────── */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-96 bg-dark-card border-l border-dark-border z-50 flex flex-col overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex items-start justify-between p-6 border-b border-dark-border">
              <div>
                <h3 className="text-white font-bold text-lg">
                  {editingId ? 'Edit Item' : 'Add New Item'}
                </h3>
                <p className="text-gray-500 text-xs tracking-widest uppercase mt-0.5">
                  Celestial Collection
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Drawer Form */}
            <div className="flex-1 p-6 space-y-5">

              {/* Dish Name */}
              <div>
                <label className="text-xs text-gray-400 tracking-widest uppercase block mb-1.5">
                  Dish Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Midnight Truffle Pasta"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>

              {/* Category + Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 tracking-widest uppercase block mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-dark border border-dark-border text-white rounded-lg px-3 py-3 text-sm outline-none focus:border-primary transition-colors"
                  >
                    {FORM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 tracking-widest uppercase block mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                    className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-gray-400 tracking-widest uppercase block mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Describe the flavors, origins, and celestial notes of this dish..."
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-dark border border-dark-border text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-xs text-gray-400 tracking-widest uppercase block mb-1.5">
                  Dish Image
                </label>
                <div className="border-2 border-dashed border-dark-border rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <FiUploadCloud size={28} className="text-gray-500" />
                  <p className="text-gray-500 text-sm text-center">
                    Upload high-res celestial food shot
                  </p>
                  <p className="text-gray-600 text-xs">PNG, JPG, MAX 10MB</p>
                </div>
                {/* Image URL fallback for mock */}
                <input
                  type="text"
                  placeholder="Or paste image URL..."
                  value={form.image}
                  onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                  className="w-full mt-2 bg-dark border border-dark-border text-white rounded-lg px-4 py-2.5 text-xs outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center justify-between bg-dark border border-dark-border rounded-xl px-5 py-4">
                <div>
                  <p className="text-white text-sm font-semibold">Immediate Availability</p>
                  <p className="text-gray-600 text-xs uppercase tracking-wide mt-0.5">Set to active in menu</p>
                </div>
                <Toggle
                  value={form.isAvailable}
                  onChange={() => setForm(p => ({ ...p, isAvailable: !p.isAvailable }))}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="p-6 border-t border-dark-border">
              <button
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <FiSave size={16} />
                {editingId ? 'Update Item' : 'Save New Item'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminMenuPage
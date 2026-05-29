import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [role, setRole] = useState('customer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      // Replace this with real API call later:
      // const res = await authService.login({ email, password, role })
      // login(res.data.user, res.data.token)

      // Temporary mock login for testing UI:
      const mockUser = { name: 'Test User', email, role }
      const mockToken = 'mock-token-123'
      login(mockUser, mockToken)
      toast.success(`Welcome back!`)
      navigate(role === 'admin' ? '/admin/dashboard' : '/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-dark-card/90 backdrop-blur-sm border border-dark-border rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Moon Village</h1>
          <p className="text-gray-400 mt-1 text-sm">Welcome back</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-dark rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              role === 'customer'
                ? 'bg-primary text-dark'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiUser size={15} />
            Customer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              role === 'admin'
                ? 'bg-primary text-dark'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiShield size={15} />
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-11 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-light">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-dark font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
            ) : (
              <>Login →</>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-dark-border" />
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-dark-border" />
        </div>

        {/* Register link — only for customers */}
        {role === 'customer' && (
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:text-primary-light">
              Register
            </Link>
          </p>
        )}

        {/* Bottom note */}
        <div className="mt-5 border border-dark-border rounded-lg p-3">
          <p className="text-center text-xs text-gray-500 italic">
            {role === 'admin'
              ? '"Admin access is restricted to authorized staff only."'
              : '"Enjoy exclusive deals and personalized celestial dining experiences as a member."'}
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
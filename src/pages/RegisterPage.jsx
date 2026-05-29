import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'

const RegisterPage = () => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeTerms: false,
	})
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}))
	}

	const handleRegister = async (e) => {
		e.preventDefault()

		if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
			toast.error('Please fill in all fields')
			return
		}
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match')
			return
		}
		if (formData.password.length < 6) {
			toast.error('Password must be at least 6 characters')
			return
		}
		if (!formData.agreeTerms) {
			toast.error('Please agree to the Terms of Service')
			return
		}

		setLoading(true)
		try {
			toast.success('Account created! Please login.')
			navigate('/login')
		} catch (err) {
			toast.error(err.response?.data?.message || 'Registration failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen relative flex items-center justify-center px-4">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')` }}
			/>
			<div className="absolute inset-0 bg-black/70" />

			<div className="relative z-10 w-full max-w-md bg-dark-card/90 backdrop-blur-sm border border-dark-border rounded-2xl p-8">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-bold text-primary">Moon Village</h1>
					<p className="text-gray-400 mt-1 text-sm">Create your account</p>
				</div>

				<form onSubmit={handleRegister} className="space-y-4">
					<div>
						<label htmlFor="register-full-name" className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
						<div className="relative">
							<FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
							<input
								id="register-full-name"
								type="text"
								name="fullName"
								placeholder="Alexander Moon"
								value={formData.fullName}
								onChange={handleChange}
								className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="register-email" className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
						<div className="relative">
							<FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
							<input
								id="register-email"
								type="email"
								name="email"
								placeholder="alexander@celestial.com"
								value={formData.email}
								onChange={handleChange}
								className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="register-password" className="text-sm text-gray-400 mb-1.5 block">Password</label>
						<div className="relative">
							<FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
							<input
								id="register-password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								placeholder="••••••••"
								value={formData.password}
								onChange={handleChange}
								className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-11 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(prev => !prev)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
							>
								{showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
							</button>
						</div>
					</div>

					<div>
						<label htmlFor="register-confirm-password" className="text-sm text-gray-400 mb-1.5 block">Confirm Password</label>
						<div className="relative">
							<FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
							<input
								id="register-confirm-password"
								type={showPassword ? 'text' : 'password'}
								name="confirmPassword"
								placeholder="••••••••"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="w-full bg-dark border border-dark-border text-white rounded-lg pl-11 pr-11 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-600"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(prev => !prev)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
							>
								{showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
							</button>
						</div>
					</div>

					<label className="flex items-center gap-2 cursor-pointer pt-1">
						<input
							type="checkbox"
							name="agreeTerms"
							checked={formData.agreeTerms}
							onChange={handleChange}
							className="w-4 h-4 accent-primary"
						/>
						<span className="text-sm text-gray-400">
							I agree to the{' '}
							<span className="text-primary font-semibold hover:text-primary-light">
								Terms of Service
							</span>
						</span>
					</label>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary hover:bg-primary-light text-dark font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
					>
						{loading ? (
							<div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
						) : (
							<>Register →</>
						)}
					</button>
				</form>

				<div className="flex items-center gap-3 my-5">
					<div className="flex-1 h-px bg-dark-border" />
					<span className="text-gray-500 text-xs">OR</span>
					<div className="flex-1 h-px bg-dark-border" />
				</div>

				<p className="text-center text-sm text-gray-400">
					Already have an account?{' '}
					<Link to="/login" className="text-primary font-semibold hover:text-primary-light">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default RegisterPage
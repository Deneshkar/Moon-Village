import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../utils/constants'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const savedCart = localStorage.getItem(STORAGE_KEYS.CART)
			return savedCart ? JSON.parse(savedCart) : []
		} catch {
			return []
		}
	})
	const [isCartOpen, setIsCartOpen] = useState(false)

	const addToCart = (item) => {
		setCartItems(prev => {
			const existingItem = prev.find(cartItem => cartItem._id === item._id)

			if (existingItem) {
				return prev.map(cartItem => (
					cartItem._id === item._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				))
			}

			return [...prev, { ...item, quantity: item.quantity || 1 }]
		})
	}

	const updateQuantity = (itemId, quantity) => {
		setCartItems(prev => {
			if (quantity <= 0) {
				return prev.filter(cartItem => cartItem._id !== itemId)
			}

			return prev.map(cartItem => (
				cartItem._id === itemId
					? { ...cartItem, quantity }
					: cartItem
			))
		})
	}

	const removeFromCart = (itemId) => {
		setCartItems(prev => prev.filter(cartItem => cartItem._id !== itemId))
	}

	const clearCart = () => {
		setCartItems([])
	}

	const cartTotal = useMemo(() => (
		cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)
	), [cartItems])

	const cartCount = useMemo(() => (
		cartItems.reduce((total, item) => total + item.quantity, 0)
	), [cartItems])

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems))
		} catch {
			// Ignore storage write failures.
		}
	}, [cartItems])

	const value = useMemo(() => ({
		cartItems,
		cartCount,
		cartTotal,
		isCartOpen,
		setIsCartOpen,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
	}), [cartItems, cartCount, cartTotal, isCartOpen])

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

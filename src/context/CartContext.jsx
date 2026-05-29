import PropTypes from 'prop-types'
import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	const [isCartOpen, setIsCartOpen] = useState(false)

	const addToCart = (item) => {
		setCartItems(prev => [...prev, item])
	}

	const value = useMemo(() => ({
		cartItems,
		cartCount: cartItems.length,
		isCartOpen,
		setIsCartOpen,
		addToCart,
	}), [cartItems, isCartOpen])

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

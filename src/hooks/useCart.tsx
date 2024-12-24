import { useContext } from 'react'
import { CartContext } from '../store/cart-context/CartContext'

export default function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('userCart error!')
  }
  return context
}

import { useContext } from 'react'
import { FavoriteContext } from '../store/favorite-context/FavoriteContext'

export default function useFavorite() {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('userCart error!')
  }
  return context
}

import React, { createContext, ReactNode, useReducer, useState } from 'react'
import { CART_ACTIONS, CART_TYPE } from '../../constants'
import { CartAction, ICart, IDataProduct } from '../../types'
import { getFromLocalStorage, saveToLocalStorage } from '../../utils'

const cartReducer = (state: ICart, action: CartAction): ICart => {
  const existingItem = state.items.find((item) => item.id === action.payload.id)

  let dataCart: ICart
  let index: number
  let newTotal: number
  let newItems: IDataProduct[]
  switch (action.type) {
    case CART_ACTIONS.ADD:
      if (existingItem) {
        dataCart = {
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
                colors: Array.from(new Set([...item.colors, ...action.payload.colors])),
                sizes: Array.from(new Set([...item.sizes, ...action.payload.sizes]))
              }
            }
            return item
          }),
          total: state.total + action.payload.price * action.payload.quantity
        }
      } else {
        dataCart = {
          items: [...state.items, action.payload],
          total: state.total + action.payload.price * action.payload.quantity
        }
      }

      saveToLocalStorage(dataCart)
      return dataCart
    case CART_ACTIONS.UPDATE:
      newItems = [...state.items]
      index = newItems.findIndex((item) => item.id === action.payload.id)
      newTotal = state.total + newItems[index].price * (action.payload.quantity - newItems[index].quantity)
      newItems[index] = {
        ...newItems[index],
        quantity: action.payload.quantity
      }

      dataCart = {
        items: newItems,
        total: newTotal
      }

      saveToLocalStorage(dataCart)
      return dataCart
    case CART_ACTIONS.REMOVE:
      dataCart = {
        items: state.items.filter((product) => product.id !== action.payload.id),
        total: +Number(state.total - action.payload.quantity * action.payload.price).toFixed(2)
      }

      saveToLocalStorage(dataCart)
      return dataCart
    default:
      return state
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<{
  cartState: ICart
  dispatch: React.Dispatch<CartAction>
  cartType: CART_TYPE
  setCartType: React.Dispatch<React.SetStateAction<CART_TYPE>>
  openCart: boolean
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initData = getFromLocalStorage()
  const [cartState, dispatch] = useReducer(cartReducer, initData)
  const [cartType, setCartType] = useState(CART_TYPE.SHOPPING)
  const [openCart, setOpenCart] = useState(false)

  return (
    <CartContext.Provider value={{ cartState, dispatch, cartType, setCartType, openCart, setOpenCart }}>
      {children}
    </CartContext.Provider>
  )
}

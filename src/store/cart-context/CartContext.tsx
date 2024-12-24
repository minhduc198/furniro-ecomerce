import React, { createContext, ReactNode, useReducer } from 'react'
import { CART_ACTIONS } from '../../constants'
import { CartAction, ICart } from '../../types'
import { getFromLocalStorage, saveToLocalStorage } from '../../utils'

const cartReducer = (state: ICart, action: CartAction): ICart => {
  const existingItem = state.items.find((item) => item.id === action.payload.id)
  let dataCart: ICart
  switch (action.type) {
    case CART_ACTIONS.ADD:
      if (existingItem) {
        dataCart = {
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity
              }
            }
            return item
          }),
          total: state.total + action.payload.price
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
      // TODO:
      return state
    case CART_ACTIONS.REMOVE:
      // TODO:
      return state
    default:
      return state
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<{
  cartState: ICart
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initData = getFromLocalStorage()
  const [cartState, dispatch] = useReducer(cartReducer, initData)

  return <CartContext.Provider value={{ cartState, dispatch }}>{children}</CartContext.Provider>
}

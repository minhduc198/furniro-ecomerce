import React, { createContext, ReactNode, useReducer, useState } from 'react'
import { CART_ACTIONS, CART_TYPE } from '../../constants'
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
      // TODO:
      return state
    case CART_ACTIONS.REMOVE:
      dataCart = {
        items: state.items.filter((product) => product.id !== action.payload.id),
        total: state.total - action.payload.quantity * action.payload.price
      }

      console.log(action.payload)

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
} | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initData = getFromLocalStorage()
  const [cartState, dispatch] = useReducer(cartReducer, initData)
  const [cartType, setCartType] = useState(CART_TYPE.SHOPPING)

  return <CartContext.Provider value={{ cartState, dispatch, cartType, setCartType }}>{children}</CartContext.Provider>
}

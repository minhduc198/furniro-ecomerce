import { CART_ACTIONS, FAVORITE_ACTIONS, SIZE } from '../constants'

export interface ApiResponse<T> {
  data: T[]
  currentPage: number
  totalItems: number
  totalPages: number
}

export interface IDataProduct {
  id: number
  name: string
  categories: string
  description: string
  price: number
  discount: number
  createdAt: string
  rate: number
  customerReview: number
  sizes: SIZE[]
  colors: string[]
  images: string[]
  quantity: number
}

export interface ICart {
  items: IDataProduct[]
  total: number
}

export type CartAction =
  | {
      type: CART_ACTIONS.ADD
      payload: IDataProduct
    }
  | {
      type: CART_ACTIONS.UPDATE
      payload: { id: number; quantity: number }
    }
  | {
      type: CART_ACTIONS.REMOVE
      payload: IDataProduct
    }

export interface IFavorite {
  items: IDataProduct[]
}

export type FavoriteAction =
  | {
      type: FAVORITE_ACTIONS.ADD
      payload: IDataProduct
    }
  | {
      type: FAVORITE_ACTIONS.REMOVE
      payload: IDataProduct
    }

export interface ISelectOption {
  label: string
  value: string | number
}

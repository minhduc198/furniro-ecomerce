import { SIZE } from '../constants'

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
}

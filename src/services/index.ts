import { ApiResponse, IDataProduct } from '../types'

const baseUrl = 'https://furniro-api-j4bw.onrender.com'

export async function getListProduct(page: number, limit: number): Promise<ApiResponse<IDataProduct>> {
  const response = await fetch(`${baseUrl}/product?page=${page}&limit=${limit}`)
  const data = await response.json()
  return data
}

export async function getProductDetail(id: number): Promise<IDataProduct> {
  const response = await fetch(`${baseUrl}/product/${id}`)
  const data = await response.json()
  return data
}

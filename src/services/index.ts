import { ApiResponse, IDataProduct } from '../types'

const baseUrl = 'http://localhost:4000'

export async function getListProduct(page: number, limit: number): Promise<ApiResponse<IDataProduct>> {
  const response = await fetch(`${baseUrl}/product?page=${page}&limit=${limit}`)
  const data = await response.json()
  return data
}

import { ICart } from '../types'

const storageName = 'products'

export function saveToLocalStorage(data: ICart) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(storageName, dataString)
}

export function getFromLocalStorage(): ICart {
  const data = localStorage.getItem(storageName) || ''
  if (data) {
    return JSON.parse(data)
  }
  return {
    items: [],
    total: 0
  }
}

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

export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD') => {
  if (!amount) return 0
  return new Intl.NumberFormat(locale, {
    currency: currency
  }).format(+amount.toFixed(2))
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

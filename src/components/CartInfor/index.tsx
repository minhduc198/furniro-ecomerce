import { useState } from 'react'
import bin from '../../assets/common/bin.svg'
import { CART_ACTIONS, MAX_QUANTITY_OF_PRODUCT } from '../../constants'
import useCart from '../../hooks/useCart'
import { IDataProduct } from '../../types'
import { formatCurrency } from '../../utils'

interface Props {
  product: IDataProduct
}

export default function CartInfo({ product }: Props) {
  const [quantity, setQuantity] = useState<string | number>(product.quantity)
  const { dispatch } = useCart()
  const handleRemove = (product: IDataProduct) => {
    dispatch({
      type: CART_ACTIONS.REMOVE,
      payload: product
    })
  }

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuantity(value)
  }

  const handleChangeProduct = () => {
    const newQuantity = Number(quantity)
    if (newQuantity >= 1 && newQuantity <= MAX_QUANTITY_OF_PRODUCT) {
      dispatch({
        type: CART_ACTIONS.UPDATE,
        payload: {
          ...product,
          quantity: newQuantity
        }
      })
    } else {
      setQuantity(product.quantity)
    }
  }

  return (
    <div className='cart-information'>
      <div className='cart-img'>
        <img src={product.images[0]} alt='' />
      </div>
      <div className='cart-name'>{product.name}</div>
      <div className='cart-price'>Rs. {product.price}</div>
      <div className='cart-quantity'>
        <input type='number' value={quantity} onChange={handleQuantity} onBlur={handleChangeProduct} />
      </div>
      <div className='cart-page-subtotal'>Rs. {formatCurrency(product.quantity * product.price)}</div>
      <div className='remove-product' onClick={() => handleRemove(product)}>
        <img src={bin} alt='' />
      </div>
    </div>
  )
}

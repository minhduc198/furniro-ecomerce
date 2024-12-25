import { IDataProduct } from '../../types'
import cancel from '../../assets/cartItem/icons/cancelItem.svg'
import { CART_TYPE } from '../../constants'
import useCart from '../../hooks/useCart'

interface Props {
  product: IDataProduct
  handleRemoveItem: () => void
}

export default function CartItem({ product, handleRemoveItem }: Props) {
  const { cartType } = useCart()
  return (
    <div className='cart-item'>
      <div className='cart-item-img'>
        <img src={product.images[0]} alt='' />
      </div>
      <div className='cart-item-content'>
        <div className='item-name'>{product.name}</div>
        <div className='item-bill'>
          {cartType === CART_TYPE.SHOPPING && (
            <>
              <div className='item-quantity'>{product.quantity}</div>
              <div className='X'>X</div>
              <div className='item-price'>Rs. {product.price}</div>
            </>
          )}
        </div>
      </div>
      <div className='item-filter' onClick={handleRemoveItem}>
        <img src={cancel} alt='' />
      </div>
    </div>
  )
}

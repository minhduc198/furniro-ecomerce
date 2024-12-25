import lock from '../../assets/shoppingCart/icons/lock.svg'
import { CART_ACTIONS } from '../../constants'
import useCart from '../../hooks/useCart'
import { IDataProduct } from '../../types'
import CartItem from '../CartItem'

interface Props {
  setOpenShoppingCart: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShoppingCart({ setOpenShoppingCart }: Props) {
  const { cartState, dispatch } = useCart()
  const total = Math.floor(cartState.total * 100) / 100

  const handleRemoveItem = (product: IDataProduct) => {
    dispatch({
      type: CART_ACTIONS.REMOVE,
      payload: product
    })
  }

  return (
    <div className='shopping-cart'>
      <div className='cart-header'>
        <div className='cart-title'>Shopping Cart</div>
        <div className='cart-close' onClick={() => setOpenShoppingCart(false)}>
          <img src={lock} alt='' />
        </div>
      </div>
      <div className='cart-list'>
        {cartState.items.map((item) => (
          <CartItem key={item.id} product={item} handleRemoveItem={() => handleRemoveItem(item)} />
        ))}
      </div>

      <div className='cart-subtotal'>
        <p>Subtotal</p>
        <div className='cart-total-price'>Rs. {total}</div>
      </div>

      <div className='shopping-cart-btn'>
        <div className='btn-cart'>Cart</div>
        <div className='btn-checkout'>Checkout</div>
        <div className='btn-comparison'>Comparison</div>
      </div>
    </div>
  )
}

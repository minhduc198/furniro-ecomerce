import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import lock from '../../assets/shoppingCart/icons/lock.svg'
import { CART_ACTIONS, CART_COMPARE_PARAM, CART_TYPE, FAVORITE_ACTIONS } from '../../constants'
import useCart from '../../hooks/useCart'
import useFavorite from '../../hooks/useFavorite'
import { ICart, IDataProduct, IFavorite } from '../../types'
import CartItem from '../CartItem'
import { path } from '../../routers'
import { formatCurrency } from '../../utils'

interface Props {
  onClose: () => void
}

export default function CartProduct({ onClose }: Props) {
  const navigate = useNavigate()
  const { cartState, dispatch: cartDispatch, cartType, setOpenCart } = useCart()
  const { favoriteState, dispatch: favoriteDispatch } = useFavorite()
  const [cart, setCart] = useState<ICart | IFavorite>({
    items: [],
    total: 0
  })

  const goToProductComparison = () => {
    navigate(`${path.comparison}/${CART_COMPARE_PARAM}`)
    setOpenCart(false)
  }

  const goToCart = () => {
    navigate(path.cart)
    setOpenCart(false)
  }

  const goToCheckout = () => {
    navigate(path.checkout)
    setOpenCart(false)
  }

  const handleRemoveItem = (product: IDataProduct) => {
    if (cartType === CART_TYPE.SHOPPING) {
      cartDispatch({
        type: CART_ACTIONS.REMOVE,
        payload: product
      })
    } else {
      favoriteDispatch({
        type: FAVORITE_ACTIONS.REMOVE,
        payload: product
      })
    }
  }

  useEffect(() => {
    if (cartType === CART_TYPE.SHOPPING) {
      setCart(cartState)
    } else {
      setCart(favoriteState)
    }
  }, [cartType, cartState, favoriteState])

  return (
    <div className='cart'>
      <div className='cart-header'>
        <div className='cart-title'>{cartType === CART_TYPE.SHOPPING ? 'Shopping Cart' : 'Favorite'}</div>
        <div className='cart-close' onClick={onClose}>
          <img src={lock} alt='' />
        </div>
      </div>
      <div className='cart-list'>
        {cart.items.length > 0 &&
          cart.items.map((item) => (
            <CartItem key={item.id} product={item} handleRemoveItem={() => handleRemoveItem(item)} />
          ))}
        {cart.items.length === 0 && <p className='cart-empty'>No products in the cart.</p>}
      </div>
      {cartType === CART_TYPE.SHOPPING && (
        <div className='cart-footer'>
          <div className='cart-subtotal'>
            <p>Subtotal</p>
            <div className='cart-total-price'>Rs. {formatCurrency((cart as ICart).total)}</div>
          </div>
          <div className='cart-btn'>
            <div className='btn-cart' onClick={goToCart}>
              Cart
            </div>
            <div className='btn-checkout' onClick={goToCheckout}>
              Checkout
            </div>
            <div className='btn-comparison' onClick={goToProductComparison}>
              Comparison
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

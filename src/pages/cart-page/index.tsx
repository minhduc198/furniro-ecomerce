import { useNavigate } from 'react-router'
import Banner from '../../components/Banner'
import CartInfo from '../../components/CartInfor'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import useCart from '../../hooks/useCart'
import { formatCurrency } from '../../utils'
import { path } from '../../routers'

export default function CartPage() {
  const { cartState } = useCart()
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate(path.checkout)
  }

  return (
    <div className='container cart-page'>
      <HeroBreadCrumb page={'Cart'} />

      <div className='cart-page-pay'>
        <div className='cart-page-product'>
          <div className='cart-page-detail'>
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartState.items.length ? (
            <div className='cart-page-list'>
              {cartState.items.map((item) => (
                <CartInfo key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className='cart-empty'>No products in the cart</div>
          )}
        </div>
        <div className='cart-page-total'>
          <h2>Cart Totals</h2>
          <div className='sub-total'>
            <p>Subtotal</p>
            <p>Rs. {formatCurrency(cartState.total)}</p>
          </div>
          <div className='total'>
            <p>Total</p>
            <p>Rs. {formatCurrency(cartState.total)}</p>
          </div>
          <div className='btn-checkout' onClick={goToCheckout}>
            Check Out
          </div>
        </div>
      </div>

      <Banner />
    </div>
  )
}

import logo from '../../assets/common/logo-funiro.svg'
import Banner from '../../components/Banner'
import BreadCrumb from '../../components/BreadCrumb'
import CartInfo from '../../components/CartInfor'
import useCart from '../../hooks/useCart'
import { formatCurrency } from '../../utils'

export default function CartPage() {
  const { cartState } = useCart()

  return (
    <div className='container cart-page'>
      <div className='cart-page-hero'>
        <div className='logo-cart'>
          <img src={logo} alt='' />
        </div>
        <div className='cart-page-hero-title'>Cart</div>
        <BreadCrumb />
      </div>

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
          <div className='btn-checkout'>Check Out</div>
        </div>
      </div>

      <Banner />
    </div>
  )
}

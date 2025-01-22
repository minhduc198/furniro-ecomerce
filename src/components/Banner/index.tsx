import highQuality from '../../assets/shop/icons/high-quality.svg'
import protection from '../../assets/shop/icons/protection.svg'
import shipping from '../../assets/shop/icons/shipping.svg'
import sp from '../../assets/shop/icons/support.svg'

export default function Banner() {
  return (
    <div>
      <div className='banner'>
        <div className='banner-content'>
          <div className='banner-img'>
            <img src={highQuality} alt='' />
          </div>
          <div className='banner-context'>
            <div className='banner-title'>High Quality</div>
            <div className='banner-desc'>crafted from top materials</div>
          </div>
        </div>

        <div className='banner-content'>
          <div className='banner-img'>
            <img src={protection} alt='' />
          </div>
          <div className='banner-context'>
            <div className='banner-title'>Warranty Protection</div>
            <div className='banner-desc'>Over 2 years</div>
          </div>
        </div>

        <div className='banner-content'>
          <div className='banner-img'>
            <img src={shipping} alt='' />
          </div>
          <div className='banner-context'>
            <div className='banner-title'>Free Shipping</div>
            <div className='banner-desc'>Order over 150 $</div>
          </div>
        </div>

        <div className='banner-content'>
          <div className='banner-img'>
            <img src={sp} alt='' />
          </div>
          <div className='banner-context'>
            <div className='banner-title'>24 / 7 Support</div>
            <div className='banner-desc'>Dedicated support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

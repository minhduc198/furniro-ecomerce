import compare from '../../assets/cardProduct/icons/compare.svg'
import like from '../../assets/cardProduct/icons/like.svg'
import share from '../../assets/cardProduct/icons/share.svg'
import { IDataProduct } from '../../types'

interface Props {
  productItem: IDataProduct
}

export default function ProductCard({ productItem }: Props) {
  const currentDate = new Date().getTime()
  const productDate = new Date(productItem.createdAt).getTime()
  const date = (currentDate - productDate) / (1000 * 60 * 60 * 24)

  const status = () => {
    if (!productItem.discount) {
      if (date < 30) {
        return ['product-new', 'New']
      } else return ''
    } else {
      return ['product-discount', `${productItem.discount}%`]
    }
  }

  return (
    <div className='product-item'>
      <div className='product-img'>
        <img src={productItem.images[0]} alt='' />
      </div>
      <div className={status()[0]}>{status()[1]}</div>
      <div className='product-content'>
        <div className='product-name'>{productItem.name}</div>
        <div className='product-desc'>{productItem.description}</div>
        <div className='product-price'>
          <div className='discount-price'>
            Rp{' '}
            {!productItem.discount
              ? productItem.price
              : Math.floor(((productItem.price * productItem.discount) / 100) * 100) / 100}
          </div>
          <div className='origin-price'>{!productItem.discount ? '' : `Rp ${productItem.price}`}</div>
        </div>
      </div>
      <div className='product-action'>
        <div className='btn-add'>Add to cart</div>
        <div className='card-menu'>
          <div className='menu-action'>
            <div className='menu-icon'>
              <img src={share} alt='' />
            </div>
            <p>Share</p>
          </div>

          <div className='menu-action'>
            <div className='menu-icon'>
              <img src={compare} alt='' />
            </div>
            <p>Compare</p>
          </div>

          <div className='menu-action'>
            <div className='menu-icon'>
              <img src={like} alt='' />
            </div>
            <p>like</p>
          </div>
        </div>
      </div>
    </div>
  )
}

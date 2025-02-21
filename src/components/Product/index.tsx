import { IDataProduct } from '../../types'
import halfStar from '../../assets/productDetail/icons/halfStar.svg'
import star from '../../assets/productDetail/icons/star.svg'
import { formatCurrency } from '../../utils'

interface Props {
  product: IDataProduct
}
export default function Product({ product }: Props) {
  const rateItem = (rate?: number) => {
    if (rate) {
      return Array(Math.ceil(rate))
        .fill(0)
        .map((_, idx) => {
          return <div key={idx}>{idx + 1 > rate ? <img src={halfStar} alt='' /> : <img src={star} alt='' />}</div>
        })
    }
    return null
  }

  return (
    <div className='view-product-wrapper'>
      <div className='view-product-img'>
        <img src={product.images[0]} alt='' />
      </div>
      <div className='view-product-name'>{product.name}</div>
      <div className='view-product-price'>Rs. {formatCurrency(product.price)}</div>
      <div className='view-product-rate'>
        <div className='number-rate'>{product.rate}</div>
        <div className='star'>{rateItem(product.rate)}</div>
        <div className='review'>{product.customerReview} Review</div>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import compare from '../../assets/cardProduct/icons/compare.svg'
import share from '../../assets/cardProduct/icons/share.svg'
import { FAVORITE_ACTIONS, PRODUCT_NEW_EXPIRE } from '../../constants'
// import useCart from '../../hooks/useCart'
import { useNavigate } from 'react-router'
import useFavorite from '../../hooks/useFavorite'
import { path } from '../../routers'
import { IDataProduct } from '../../types'
import { formatCurrency } from '../../utils'

interface Props {
  productItem: IDataProduct
}

export default function ProductCard({ productItem }: Props) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { favoriteState, dispatch: favoriteDispatch } = useFavorite()
  const navigate = useNavigate()

  const handleFavorite = () => {
    favoriteDispatch({
      type: isFavorite ? FAVORITE_ACTIONS.REMOVE : FAVORITE_ACTIONS.ADD,
      payload: productItem
    })
  }

  const handleViewDetail = () => {
    navigate(`${path.product}/${productItem.id}`)
  }

  const goToComparison = () => {
    navigate(`${path.comparison}/${productItem.id}`)
  }

  const isNewProduct = useMemo(() => {
    const currentDate = new Date().getTime()
    const productDate = new Date(productItem.createdAt).getTime()
    const date = Math.round(Math.abs(currentDate - productDate) / (1000 * 60 * 60 * 24))
    return date < PRODUCT_NEW_EXPIRE
  }, [productItem.createdAt])

  useEffect(() => {
    const isProductInFavorite = !!favoriteState.items.find((item) => item.id === productItem.id)
    setIsFavorite(isProductInFavorite)
  }, [favoriteState.items, productItem.id])

  return (
    <div className='product-item'>
      <div className='CheckoutPage'>
        <img src={productItem.images[0]} alt='' />
      </div>
      <div className='product-state'>
        {!!productItem.discount && <div className='product-discount'>-{productItem.discount}%</div>}
        {isNewProduct && <div className='product-new'>New</div>}
      </div>
      <div className='product-content'>
        <div className='product-name'>{productItem.name}</div>
        <div className='product-desc'>{productItem.description}</div>
        <div className='product-price'>
          <div className='discount-price'>
            Rp{' '}
            {!productItem.discount
              ? formatCurrency(productItem.price)
              : formatCurrency(Math.floor(productItem.price * productItem.discount))}
          </div>
          <div className='origin-price'>{!productItem.discount ? '' : `Rp ${formatCurrency(productItem.price)}`}</div>
        </div>
      </div>
      <div className='product-action'>
        <div className='btn-add' onClick={handleViewDetail}>
          View detail
        </div>
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
            <p onClick={goToComparison}>Compare</p>
          </div>

          <div className='menu-action' onClick={handleFavorite}>
            <div>{isFavorite ? <FaHeart color='white' /> : <FaRegHeart color='white' />}</div>
            <p>Like</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import dining from '../../assets/category/images/category-dining.png'
import living from '../../assets/category/images/category-living.png'
import bedroom from '../../assets/category/images/category-bedroom.png'
import { useNavigate } from 'react-router'
import { path } from '../../routers'
import ProductCard from '../../components/ProductCard'
import { useEffect, useState } from 'react'
import { IDataProduct } from '../../types'
import { getListProduct } from '../../services'

export default function Home() {
  const navigate = useNavigate()
  const [ourProducts, setOurProducts] = useState<IDataProduct[]>([])
  const [getProductFromData, setGetProductFromData] = useState(8)

  const getData = async () => {
    const productData = await getListProduct(1, getProductFromData)
    setOurProducts(productData.data)
  }

  const getMoreProduct = () => {
    if (getProductFromData >= 32) {
      setGetProductFromData(8)
    } else {
      setGetProductFromData(getProductFromData + 8)
    }
  }

  const goToShop = () => {
    navigate(path.shop)
  }

  useEffect(() => {
    getData()
  }, [getProductFromData])

  return (
    <div className='container home'>
      {/* HERO */}
      <div className='hero'>
        <div className='hero-intro'>
          <p className='intro-label font-600'>New Arrival</p>
          <p className='intro-title font-700'>Discover Our New Collection</p>
          <p className='intro-desc font-500'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <div className='btn-primary font-700'>BUY NOW</div>
        </div>
      </div>

      {/* CATEGORY */}
      <div className='category'>
        <div className='category-title'>Browse The Range</div>
        <div className='category-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <div className='category-list'>
          <div className='category-item'>
            <div className='category-img' onClick={() => goToShop()}>
              <img src={dining} alt='' />
            </div>
            <div className='item-name'>Dining</div>
          </div>
          <div className='category-item'>
            <div className='category-img' onClick={() => goToShop()}>
              <img src={living} alt='' />
            </div>
            <div className='item-name'>Living</div>
          </div>
          <div className='category-item'>
            <div className='category-img' onClick={() => goToShop()}>
              <img src={bedroom} alt='' />
            </div>
            <div className='item-name'>Bedroom</div>
          </div>
        </div>
      </div>

      {/* OUR PRODUCT */}
      <div className='our-product'>
        <div className='our-product-title'>Our Products</div>
        <div className='product-list'>
          {ourProducts.map((productItem: IDataProduct) => (
            <ProductCard key={productItem.id} productItem={productItem} />
          ))}
        </div>
        <div className='btn-show-more' onClick={getMoreProduct}>
          {getProductFromData <= 31 ? 'Show More' : 'Show Less'}
        </div>
      </div>
    </div>
  )
}

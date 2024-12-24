import dining from '../../assets/category/images/category-dining.png'
import living from '../../assets/category/images/category-living.png'
import bedroom from '../../assets/category/images/category-bedroom.png'
import { useNavigate } from 'react-router'
import { path } from '../../routers'
import ProductCard from '../../components/ProductCard'
import { useEffect, useState } from 'react'
import { IDataProduct } from '../../types'
import { getListProduct } from '../../services'
import { MAX_OUR_PRODUCTS } from '../../constants'
import Carousel from '../../components/Carousel'
import furniture1 from '../../assets/furniture/imgs/furniture_1.png'
import furniture2 from '../../assets/furniture/imgs/furniture_2.png'
import furniture3 from '../../assets/furniture/imgs/furniture_3.png'
import furniture4 from '../../assets/furniture/imgs/furniture_4.png'
import furniture5 from '../../assets/furniture/imgs/furniture_5.png'
import furniture6 from '../../assets/furniture/imgs/furniture_6.png'
import furniture7 from '../../assets/furniture/imgs/furniture_7.png'
import furniture8 from '../../assets/furniture/imgs/furniture_8.png'
import furniture9 from '../../assets/furniture/imgs/furniture_9.png'

let limit = 0
export default function Home() {
  const navigate = useNavigate()
  const [ourProducts, setOurProducts] = useState<IDataProduct[]>([])

  const getData = async () => {
    limit = limit < MAX_OUR_PRODUCTS ? limit + 8 : 8
    const productData = await getListProduct(1, limit)
    setOurProducts(productData.data)
  }

  const goToShop = () => {
    navigate(path.shop)
  }

  useEffect(() => {
    getData()
  }, [])

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
        <div className='btn-show-more' onClick={() => getData()}>
          {ourProducts.length < MAX_OUR_PRODUCTS ? 'Show More' : 'Show Less'}
        </div>
      </div>
      {/* INSPIRATION */}
      <div className='inspiration'>
        <div className='inspiration-content'>
          <div className='inspiration-title'>50+ Beautiful rooms inspiration</div>
          <div className='inspiration-desc'>
            Our designer already made a lot of beautiful prototipe of rooms that inspire you
          </div>
          <div className='btn-primary'>Explore More</div>
        </div>
        <div className='inspiration-carousel'>
          <Carousel />
        </div>
      </div>
      {/* Furniture */}
      <div className='furniture'>
        <div className='furniture-header'>
          <div className='furniture-subtitle'>Share your setup with</div>
          <div className='furniture-title'>#FuniroFurniture</div>
        </div>
        <div className='furniture-picture'>
          <div className='picture-left'>
            <div className='picture-top-left'>
              <div className='pic1'>
                <img src={furniture1} alt='' />
              </div>
              <div className='pic3'>
                <img src={furniture3} alt='' />
              </div>
            </div>
            <div className='picture-bottom-left'>
              <div className='pic2'>
                <img src={furniture2} alt='' />
              </div>
              <div className='pic4'>
                <img src={furniture4} alt='' />
              </div>
            </div>
          </div>
          <div className='picture-middle'>
            <div className='pic5'>
              <img src={furniture5} alt='' />
            </div>
          </div>
          <div className='picture-right'>
            <div className='picture-top-right'>
              <div className='pic6'>
                <img src={furniture6} alt='' />
              </div>
              <div className='pic9'>
                <img src={furniture9} alt='' />
              </div>
            </div>
            <div className='picture-bottom-right'>
              <div className='pic7'>
                <img src={furniture7} alt='' />
              </div>
              <div className='pic8'>
                <img src={furniture8} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

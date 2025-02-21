import { useEffect, useMemo, useState } from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaFacebook, FaLinkedin } from 'react-icons/fa6'
import { Link, useParams } from 'react-router'
import halfStar from '../../assets/productDetail/icons/halfStar.svg'
import star from '../../assets/productDetail/icons/star.svg'
import ProductCard from '../../components/ProductCard'
import { CART_ACTIONS, MAX_OUR_PRODUCTS, SIZE } from '../../constants'
import { getListProduct, getProductDetail } from '../../services'
import { IDataProduct } from '../../types'
import { toast, ToastOptions } from 'react-toastify'
import useCart from '../../hooks/useCart'
import { path } from '../../routers'

interface IFormProduct {
  size: SIZE
  img: string
  color: string
  quantity: number
}

type Tab = 'description' | 'additional' | 'reviews'

export default function ProductDetail() {
  const params = useParams()
  const { dispatch } = useCart()
  const [detailData, setDetailData] = useState<IDataProduct>()
  const [formProduct, setFormProduct] = useState<IFormProduct>({
    size: '' as SIZE,
    img: '',
    color: '',
    quantity: 1
  })
  const [relatedProducts, setRelatedProducts] = useState<IDataProduct[]>([])
  const [relatedProductSize, setRelatedProductSize] = useState(4)
  const [isTabActive, setIsTabActive] = useState<Tab>('description')

  const toastSetting: ToastOptions<unknown> = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  }

  const handleAddToCart = (productItem?: IDataProduct) => {
    if (productItem) {
      dispatch({
        type: CART_ACTIONS.ADD,
        payload: {
          ...productItem,
          quantity: formProduct.quantity,
          colors: [formProduct.color],
          sizes: [formProduct.size]
        }
      })
      toast.success(`Add ${productItem.name} to cart success!`, toastSetting)
    }
  }

  const onActiveTab = (tab: Tab) => {
    setIsTabActive(tab)
  }

  const handleFormProduct = (name: keyof IFormProduct) => (value: string | number) => {
    if (name === 'quantity') {
      setFormProduct((prev) => ({
        ...prev,
        quantity: Math.max(prev.quantity + Number(value), 1)
      }))
    } else {
      setFormProduct((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

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

  const renderRelatedProducts = useMemo(() => {
    if (!detailData) return []

    const sortRelatedProduct = relatedProducts.sort((a, b) => {
      const aRange = Math.abs(a.rate - detailData?.rate)
      const bRange = Math.abs(b.rate - detailData?.rate)

      if (aRange === bRange) {
        return b.customerReview - a.customerReview
      }

      return aRange - bRange
    })

    return sortRelatedProduct.slice(0, relatedProductSize)
  }, [relatedProducts, detailData, relatedProductSize])

  const showMoreRelatedProduct = () => {
    if (relatedProductSize >= relatedProducts.length || relatedProductSize >= MAX_OUR_PRODUCTS) {
      setRelatedProductSize(4)
    } else {
      setRelatedProductSize(relatedProductSize + 8)
    }
  }

  useEffect(() => {
    if (params.id) {
      getProductDetail(Number(params.id))
        .then((data) => {
          setDetailData(data)
          setFormProduct({
            size: data.sizes[0],
            color: data.colors[0],
            img: data.images[0],
            quantity: 1
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [params.id])

  useEffect(() => {
    if (detailData) {
      getListProduct(1, 100)
        .then((data) => {
          const relatedProducts = data.data.filter(
            (product) => product.categories === detailData?.categories && product.id !== detailData.id
          )
          setRelatedProducts(relatedProducts)
        })
        .catch((err) => console.log(err))
    }
  }, [detailData])

  return (
    <div className='container product-detail'>
      <div className=''></div>
      <div className='all-detail'>
        <div className='detail-left'>
          <div className='alternative-img'>
            {detailData?.images.map((image) => {
              return (
                <div
                  key={image}
                  className={`small-img ${formProduct.img === image ? 'select-item' : ''}`}
                  onClick={() => handleFormProduct('img')(image)}
                >
                  <img src={image} alt='' />
                </div>
              )
            })}
          </div>
          <div className='big-img'>
            <img src={formProduct.img} alt='' />
          </div>
        </div>
        <div className='detail-right'>
          <div className='detail-price'>Rs. {detailData?.price}</div>
          <div className='customer-review'>
            <div className='detail-rate'>{rateItem(detailData?.rate)}</div>
            <div className='slash'></div>
            <div className='review-count'>{detailData?.customerReview} Customer Review</div>
          </div>
          <div className='detail-desc'>{detailData?.description}</div>
          <div className='detail-size'>Size</div>
          <div className='list-size'>
            {detailData?.sizes.map((size) => {
              return (
                <div
                  key={size}
                  className={size === formProduct.size ? 'size-item-active' : 'size-item'}
                  onClick={() => handleFormProduct('size')(size)}
                >
                  {size}
                </div>
              )
            })}
          </div>
          <div className='detail-color'>Color</div>
          <div className='list-color'>
            {detailData?.colors.map((color) => {
              return (
                <div
                  key={color}
                  className={`color-item ${formProduct.color === color ? 'select-item' : ''}`}
                  onClick={() => handleFormProduct('color')(color)}
                  style={{ backgroundColor: color }}
                ></div>
              )
            })}
          </div>
          <div className='btn-form-product'>
            <div className='btn-quantity'>
              <div className='minus' onClick={() => handleFormProduct('quantity')(-1)}>
                -
              </div>
              <div>{formProduct.quantity}</div>
              <div className='plus' onClick={() => handleFormProduct('quantity')(1)}>
                +
              </div>
            </div>
            <div className='btn' onClick={() => handleAddToCart(detailData)}>
              Add To Cart
            </div>

            <Link to={`${path.comparison}/${detailData?.id}`}>
              <div className='btn'>+ Compare</div>
            </Link>
          </div>
          <div className='line'></div>
          <div className='more-info'>
            <div className='info-text'>
              <p>SKU</p>
              <p>:</p>
              <p>SS001</p>
            </div>

            <div className='info-text'>
              <p>Category</p>
              <p>:</p>
              <p>{detailData?.categories}</p>
            </div>

            <div className='info-text'>
              <p>Tags</p>
              <p>:</p>
              <p>Sofa, Chair, Home, Shop</p>
            </div>

            <div className='info-text'>
              <p>Share</p>
              <p>:</p>
              <div className='social-icon'>
                <FaFacebook size={20} />
                <FaLinkedin size={20} />
                <AiFillTwitterCircle size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='tabs'>
        <div className='tab-menu'>
          <div
            onClick={() => onActiveTab('description')}
            className={`tab ${isTabActive === 'description' && 'tab-active'}`}
          >
            Description
          </div>
          <div
            onClick={() => onActiveTab('additional')}
            className={`tab ${isTabActive === 'additional' && 'tab-active'}`}
          >
            Additional Information
          </div>
          <div onClick={() => onActiveTab('reviews')} className={`tab ${isTabActive === 'reviews' && 'tab-active'}`}>
            Reviews
          </div>
        </div>
        <div className='tab-content'>
          {isTabActive === 'description' && (
            <div className='description-content'>
              <p>
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
                unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting
                the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a
                well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate
                and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences
                while the guitar-influenced leather strap enables easy and stylish travel.
              </p>
              <div className='description-img'>
                <div className='img'>
                  <img src={detailData?.images[1]} alt='' />
                </div>
                <div className='img'>
                  <img src={detailData?.images[2]} alt='' />
                </div>
              </div>
            </div>
          )}
          {isTabActive === 'additional' && (
            <div className='description-content'>
              <p>
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
                unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting
                the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a
                well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate
                and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences
                while the guitar-influenced leather strap enables easy and stylish travel.
              </p>

              <p>
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
                unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting
                the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a
                well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate
                and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences
                while the guitar-influenced leather strap enables easy and stylish travel.
              </p>
            </div>
          )}
          {isTabActive === 'reviews' && (
            <p>
              Embodying the raw, wayward spirit of rock roll, the Kilburn portable active stereo speaker takes the
              unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.Embodying the
              raw, wayward spirit of rock roll, the Kilburn portable active stereo speaker takes the unmistakable look
              and sound of Marshall, unplugs the chords, and takes the show on the road.
            </p>
          )}
        </div>
      </div>
      <div className='related-products'>
        <h2>Related Products</h2>
        <div className='related-list'>
          {renderRelatedProducts.map((item) => {
            return <ProductCard key={item.id} productItem={item} />
          })}
        </div>
        <div className='btn-show-more' onClick={showMoreRelatedProduct}>
          {relatedProductSize >= relatedProducts.length || relatedProductSize >= MAX_OUR_PRODUCTS
            ? 'Show Less'
            : 'Show More'}
        </div>
      </div>
    </div>
  )
}

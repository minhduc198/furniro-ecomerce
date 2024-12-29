import highQuality from '../../assets/shop/icons/high-quality.svg'
import iconFilter1 from '../../assets/shop/icons/icon-filter1.svg'
import iconFilter2 from '../../assets/shop/icons/icon-filter2.svg'
import iconFilter3 from '../../assets/shop/icons/icon-filter3.svg'
import protection from '../../assets/shop/icons/protection.svg'
import shipping from '../../assets/shop/icons/shipping.svg'
import sp from '../../assets/shop/icons/support.svg'
import { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import ProductCard from '../../components/ProductCard'
import Select from '../../components/Select'
import { getListProduct } from '../../services'
import { IDataProduct } from '../../types'
import { CATEGORY, SORT } from '../../constants'

interface IShopState {
  products: IDataProduct[]
  totalItem: number
}

export default function Shop() {
  const [dataToShow, setDataToShow] = useState(16)
  const [shopState, setShopState] = useState<IShopState>({
    products: [],
    totalItem: 0
  })
  const [onOpenFilter, setOnOpenFilter] = useState(false)

  const showOptions = [
    {
      label: '4',
      value: 4
    },
    {
      label: '8',
      value: 8
    },
    {
      label: '12',
      value: 12
    },
    {
      label: '16',
      value: 16
    }
  ]

  const sortOptions = [
    {
      label: 'Default',
      value: ''
    },
    {
      label: 'Sort by name A-Z',
      value: SORT.ASC
    },
    {
      label: 'Sort by name Z-A',
      value: SORT.DESC
    }
  ]

  const categoryOptions = [
    { label: CATEGORY.BEDROOM, value: CATEGORY.BEDROOM },
    { label: CATEGORY.DINING, value: CATEGORY.DINING },
    { label: CATEGORY.LIVING, value: CATEGORY.LIVING }
  ]

  const getData = async () => {
    const productData = await getListProduct(1, dataToShow)
    setShopState({
      products: productData.data,
      totalItem: productData.totalItems
    })
  }

  const handleSelectShow = (limit: React.ChangeEvent<HTMLSelectElement>) => {
    const limitToNumber = Number(limit.target.value)
    setDataToShow(limitToNumber)
  }

  const handleDataToShort = (short: React.ChangeEvent<HTMLSelectElement>) => {
    let sortProduct: IDataProduct[] = []
    const copyShopProduct = [...shopState.products]
    if (short.target.value === SORT.ASC) {
      sortProduct = copyShopProduct.sort((a, b) => {
        if (a.name < b.name) return -1
        return 0
      })
    }

    if (short.target.value === SORT.DESC) {
      sortProduct = copyShopProduct.sort((a, b) => {
        if (a.name > b.name) return -1
        return 0
      })
    }

    setShopState({
      ...shopState,
      products: sortProduct
    })
  }

  const handleFilterByCategory = (item: React.ChangeEvent<HTMLSelectElement>) => {
    const result = shopState.products.filter((product) => product.categories === item.target.value)
    setShopState({
      ...shopState,
      products: result
    })
  }

  useEffect(() => {
    getData()
  }, [dataToShow])

  return (
    <div className='container shop'>
      <div className='shop-hero'>
        <div className='shop-hero-title'>Shop</div>
        <BreadCrumb />
      </div>
      <div className={`shop-filter ${onOpenFilter && 'shop-filter-active'}`}>
        <div className='filter-top'>
          <div className='filter-left'>
            <div className='filter-content'>
              <div className='filter-group' onClick={() => setOnOpenFilter(!onOpenFilter)}>
                <div className='filter-icon'>
                  <img src={iconFilter1} alt='' />
                </div>
                <p>Filter</p>
              </div>
              <div className='filter-icon'>
                <img src={iconFilter2} alt='' />
              </div>
              <div className='filter-icon'>
                <img src={iconFilter3} alt='' />
              </div>
            </div>
            {shopState.products.length && (
              <div className='filter-results'>{`Showing 1–${shopState.products.length} of ${shopState.totalItem} results`}</div>
            )}
          </div>
          <div className='filter-right'>
            <div className='filter-show'>
              Show
              <Select options={showOptions} handleData={handleSelectShow} defaultValue={dataToShow} />
            </div>
            <div className='filter-short'>
              Short by
              <Select options={sortOptions} handleData={handleDataToShort} defaultValue={''} />
            </div>
          </div>
        </div>
        {onOpenFilter && (
          <div className='filter-bottom'>
            <Select options={categoryOptions} handleData={handleFilterByCategory} defaultValue={''} />
          </div>
        )}
      </div>

      {/* CART LIST */}
      <div className='cart-list-shop'>
        {shopState.products.map((item) => (
          <ProductCard key={item.id} productItem={item} />
        ))}
      </div>

      {/* BANNER */}
      <div className='shop-banner'>
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

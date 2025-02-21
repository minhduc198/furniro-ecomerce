import { useEffect, useMemo, useState } from 'react'
import iconFilter1 from '../../assets/shop/icons/icon-filter1.svg'
import iconFilter2 from '../../assets/shop/icons/icon-filter2.svg'
import iconFilter3 from '../../assets/shop/icons/icon-filter3.svg'
import BreadCrumb from '../../components/BreadCrumb'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/ProductCard'
import Select from '../../components/Select'
import { CATEGORY, SORT } from '../../constants'
import useQueryParams from '../../hooks/useQueryParams'
import { getListProduct } from '../../services'
import { IDataProduct, IPagination } from '../../types'
import Banner from '../../components/Banner'

interface IShopState {
  products: IDataProduct[]
  totalItems: number
  totalPages: number
}

const validCategories = [CATEGORY.BEDROOM, CATEGORY.DINING, CATEGORY.LIVING]

export default function Shop() {
  const { getAllParams, setParam, deleteParam } = useQueryParams()
  const queryParams = getAllParams()

  const [shopState, setShopState] = useState<IShopState>({
    products: [],
    totalItems: 0,
    totalPages: 0
  })
  const [onOpenFilter, setOnOpenFilter] = useState(false)
  const [filterParams, setFilterParams] = useState({
    category: '' as CATEGORY,
    rate: 0,
    sort: '' as SORT
  })
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 1,
    pageSize: 8
  })

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

  const starOption = [
    { label: 'Default', value: '' },
    { label: '⭐', value: 1 },
    { label: '⭐⭐', value: 2 },
    { label: '⭐⭐⭐', value: 3 },
    { label: '⭐⭐⭐⭐', value: 4 },
    { label: '⭐⭐⭐⭐⭐', value: 5 }
  ]

  const categoryOptions = [
    { label: 'Default', value: '' },
    { label: CATEGORY.BEDROOM, value: CATEGORY.BEDROOM },
    { label: CATEGORY.DINING, value: CATEGORY.DINING },
    { label: CATEGORY.LIVING, value: CATEGORY.LIVING }
  ]

  const goToPreviousPage = () => {
    setPagination({
      ...pagination,
      pageNumber: pagination.pageNumber - 1
    })
  }

  const goToNextPage = () => {
    setPagination({
      ...pagination,
      pageNumber: pagination.pageNumber + 1
    })
  }

  const goToPage = (page: number | string) => {
    if (typeof page === 'string') return

    setPagination({
      ...pagination,
      pageNumber: page
    })
  }

  const getData = async () => {
    try {
      const productData = await getListProduct(pagination.pageNumber, pagination.pageSize)
      setShopState({
        products: productData.data,
        totalItems: productData.totalItems,
        totalPages: productData.totalPages
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = (name: 'limit' | 'sort' | 'category' | 'rate') => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      setParam(name, value)
    } else {
      deleteParam(name)
    }

    if (name === 'limit') {
      setPagination({
        pageSize: Number(value),
        pageNumber: 1
      })
    } else {
      setFilterParams((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const renderProduct = useMemo(() => {
    let list = [...shopState.products]

    if (filterParams.category) {
      list = list.filter((item) => item.categories === filterParams.category)
    }

    if (filterParams.rate) {
      list = list.filter((item) => Math.floor(item.rate) === filterParams.rate)
    }

    let sortProduct: IDataProduct[] = [...list]
    if (filterParams.sort === SORT.ASC) {
      sortProduct = sortProduct.sort((a, b) => {
        if (a.name < b.name) return -1
        return 0
      })
    }

    if (filterParams.sort === SORT.DESC) {
      sortProduct = sortProduct.sort((a, b) => {
        if (a.name > b.name) return -1
        return 0
      })
    }

    return sortProduct
  }, [filterParams.category, filterParams.sort, filterParams.rate, shopState.products])

  useEffect(() => {
    getData()
  }, [pagination.pageNumber, pagination.pageSize])

  useEffect(() => {
    if (Object.keys(queryParams).length === 0) return

    const category = queryParams.category as CATEGORY
    const rate = Number(queryParams.rate)
    const limit = Number(queryParams.limit)
    const sort = queryParams.sort as SORT

    if (category || rate) {
      setOnOpenFilter(true)
    }
    const params = { ...filterParams }

    if (validCategories.includes(category)) {
      params.category = category
    }

    if (rate) {
      params.rate = rate
    }

    if (limit) {
      setPagination({
        ...pagination,
        pageSize: limit
      })
    }

    if (sort) {
      params.sort = sort
    }

    setFilterParams(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryParams)])

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
            {!!renderProduct.length && (
              <div className='filter-results'>{`Showing 1–${renderProduct.length} of ${shopState.totalItems} results`}</div>
            )}
          </div>
          <div className='filter-right'>
            <div className='filter-show'>
              <div>Show</div>
              <div className='select-limit'>
                <Select options={showOptions} onChange={handleFilter('limit')} defaultValue={pagination.pageSize} />
              </div>
            </div>
            <div className='filter-sort'>
              <div>Sort by</div>
              <div className='select-sort'>
                <Select options={sortOptions} onChange={handleFilter('sort')} defaultValue={''} />
              </div>
            </div>
          </div>
        </div>
        {onOpenFilter && (
          <div className='filter-bottom'>
            <Select options={categoryOptions} onChange={handleFilter('category')} defaultValue={queryParams.category} />
            <Select options={starOption} onChange={handleFilter('rate')} defaultValue={queryParams.rate} />
          </div>
        )}
      </div>

      {/* CART LIST */}
      <div className='cart-list-container'>
        {renderProduct.length ? (
          <div className='cart-list-shop'>
            {renderProduct.map((item) => (
              <ProductCard key={item.id} productItem={item} />
            ))}
          </div>
        ) : (
          <div className='empty-product'>Sorry we can't find the product</div>
        )}
        <div className='pagination'>
          <Pagination
            siblingCount={1}
            totalPages={shopState.totalPages}
            currentPage={pagination.pageNumber}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
          />
        </div>
      </div>

      {/* BANNER */}
      <Banner />
    </div>
  )
}

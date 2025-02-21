import { useEffect, useState } from 'react'
import { Params, useNavigate, useParams } from 'react-router'
import Banner from '../../components/Banner'
import CompareLine from '../../components/Compare-line'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import { path } from '../../routers'
import { getListProduct, getProductDetail } from '../../services'
import { IDataProduct } from '../../types'
import Product from '../../components/Product'
import useQueryParams from '../../hooks/useQueryParams'
import useCart from '../../hooks/useCart'
import { CART_COMPARE_PARAM } from '../../constants'

export default function ProductComparison() {
  const navigate = useNavigate()
  const [productOptions, setProductOptions] = useState<IDataProduct[]>([])
  const [productDetail, setProductDetail] = useState<IDataProduct>()
  const [productCompare, setProductCompare] = useState<IDataProduct>()

  const param: Readonly<Params<string>> = useParams()
  const { setParam, getAllParams, deleteParam } = useQueryParams()
  const { cartState } = useCart()
  const queryParams = getAllParams()

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value

    if (!id) {
      deleteParam('compareId')
      deleteParam('compareId2')
      setProductCompare(undefined)
      return
    }

    if (param.id === CART_COMPARE_PARAM) {
      if (queryParams.compareId1) {
        setParam('compareId2', id)
      } else {
        setParam('compareId1', id)
      }
    } else {
      setParam('compareId', id)
    }
  }

  useEffect(() => {
    if (queryParams.compareId) {
      getProductDetail(Number(queryParams.compareId)).then((productCompare: IDataProduct) => {
        setProductCompare(productCompare)
      })
    }
  }, [queryParams.compareId])

  useEffect(() => {
    if (queryParams.compareId1) {
      getProductDetail(Number(queryParams.compareId1)).then((product: IDataProduct) => {
        setProductDetail(product)
      })
    }
  }, [queryParams.compareId1])

  useEffect(() => {
    if (queryParams.compareId2) {
      getProductDetail(Number(queryParams.compareId2)).then((productCompare: IDataProduct) => {
        setProductCompare(productCompare)
      })
    }
  }, [queryParams.compareId2])

  useEffect(() => {
    if (param.id && param.id !== CART_COMPARE_PARAM) {
      getProductDetail(Number(param.id)).then((productDetail: IDataProduct) => {
        setProductDetail(productDetail)
      })
    }
  }, [param.id])

  useEffect(() => {
    if (param.id === CART_COMPARE_PARAM) {
      setProductOptions(cartState.items)
    } else {
      getListProduct(1, 100).then((allProducts) => {
        setProductOptions(allProducts.data)
      })
    }
  }, [param.id, cartState.items])

  return (
    <div className='container comparison'>
      <HeroBreadCrumb page='Product Comparison' />
      <div className='compare-product'>
        <div className='view-more-product'>
          <p>Go to Product page for more Products</p>
          <p onClick={() => navigate(path.comparison)}>View More</p>
        </div>

        <div className='list-add-product'>
          <div className='two-compare'>
            {productDetail && <Product product={productDetail} />}
            {productCompare && <Product product={productCompare} />}
          </div>

          {productOptions.length && (
            <div className='add-product'>
              <label htmlFor='idSelect'>Add A Product</label>
              <select id='idSelect' defaultValue={queryParams.compareId ?? ''} onChange={onChangeSelect}>
                <option value={''}>Chọn</option>
                {productOptions
                  .filter((item) => item.id !== productDetail?.id)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className='compare-detail'>
        {productDetail && (
          <div className='compare-content'>
            <CompareLine title='General' titleClassName='compare-title' />
            {Object.keys(productDetail).map((key: string) => {
              if (
                key === 'colors' ||
                key == 'id' ||
                key === 'rate' ||
                key == 'customerReview' ||
                key === 'images' ||
                key === 'createdAt'
              )
                return null

              if (key === 'sizes') {
                return (
                  <CompareLine
                    key={key}
                    title={key}
                    leftValue={productDetail.sizes.join(', ')}
                    rightValue={productCompare?.sizes.join(', ')}
                  />
                )
              }

              return (
                <CompareLine
                  key={key}
                  title={key}
                  leftValue={productDetail[key as keyof IDataProduct].toString()}
                  rightValue={productCompare?.[key as keyof IDataProduct].toString()}
                />
              )
            })}
          </div>
        )}
      </div>
      <Banner />
    </div>
  )
}

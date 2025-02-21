import { useEffect, useState } from 'react'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import { getListProduct } from '../../services'
import { IDataProduct } from '../../types'
import Product from '../../components/Product'

export default function ProductPage() {
  const [data, setData] = useState<IDataProduct[]>([])

  const getData = async () => {
    try {
      const productData = await getListProduct(1, 100)
      setData(productData.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='container product-page'>
      <HeroBreadCrumb page='More Product' />
      <div className='list-view-product'>
        {data.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

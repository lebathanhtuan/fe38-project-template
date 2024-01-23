import { useEffect } from 'react'
import { useParams, Link, generatePath } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getProductDetailRequest } from '../../../redux/slicers/product.slice'
import { ROUTES } from 'constants/routes'

function ProductDetailPage() {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { productDetail } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }))
  }, [id])

  return (
    <div>
      <div>Name: {productDetail.data.name}</div>
      <div>Price: {productDetail.data.price?.toLocaleString()} VND</div>
      <div>Category: {productDetail.data.category?.name}</div>
      <br />
      <div>Sản phẩm tương tự:</div>
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 1 })}>Iphone 14</Link>
    </div>
  )
}

export default ProductDetailPage

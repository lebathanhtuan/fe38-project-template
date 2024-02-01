import { useEffect, useState } from 'react'
import { useParams, Link, generatePath } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputNumber } from 'antd'

import { getProductDetailRequest } from '../../../redux/slicers/product.slice'
import { addToCartRequest } from '../../../redux/slicers/cart.slice'
import { ROUTES } from 'constants/routes'

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)

  const { id } = useParams()

  const dispatch = useDispatch()

  const { productDetail } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }))
  }, [id])

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        id: productDetail.data.id,
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: quantity,
      })
    )
  }

  return (
    <div>
      <div>Name: {productDetail.data.name}</div>
      <div>Price: {productDetail.data.price?.toLocaleString()} VND</div>
      <div>Category: {productDetail.data.category?.name}</div>
      <div>Số lượng:</div>
      <div>
        <InputNumber min={1} defaultValue={1} onChange={(value) => setQuantity(value)} />
      </div>
      <div>
        <Button type="primary" onClick={() => handleAddToCart()}>
          Thêm vào giỏ
        </Button>
      </div>
      <br />
      <div>Sản phẩm tương tự:</div>
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 1 })}>Iphone 14</Link>
    </div>
  )
}

export default ProductDetailPage

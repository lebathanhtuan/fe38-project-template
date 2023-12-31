import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Row, Col, Card } from 'antd'
import { Link, generatePath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { createProduct } from '../../../redux/slicers/product.slice'
import { ROUTES } from 'constants/routes'

function HomePage() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')

  const { productList } = useSelector((state) => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Khởi tạo HomePage')
  }, [])

  const handleAddProduct = () => {
    let isValid = true

    if (!productName) {
      setNameError('Name bắt buộc!')
      isValid = false
    } else if (productName.length < 3) {
      setNameError('Name phải lớn hơn 3 kí tự!')
      isValid = false
    } else {
      setNameError('')
    }

    if (!productPrice) {
      setPriceError('Price bắt buộc!')
      isValid = false
    } else {
      setPriceError('')
    }

    if (isValid) {
      dispatch(
        createProduct({
          name: productName,
          price: parseInt(productPrice),
        })
      )
      setProductName('')
      setProductPrice('')
    }
  }

  const renderProductItems = useMemo(() => {
    return productList.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card size="small" title={item.name}>
              {item.price.toLocaleString()} VND
            </Card>
          </Link>
        </Col>
      )
    })
  }, [productList])

  return (
    <div style={{ width: '100%' }}>
      <div>
        <Link to={ROUTES.USER.ABOUT}>Go to About</Link>
      </div>
      <div>
        <Link to={ROUTES.USER.TO_DO_LIST}>Go to Todolist</Link>
      </div>
      <Row gutter={[16, 16]}>{renderProductItems}</Row>
      <div>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          placeholder="Name"
        />
        <span>{nameError}</span>
        <input
          type="number"
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          placeholder="Price"
        />
        <span>{priceError}</span>
        <div>
          <Button type="primary" onClick={() => handleAddProduct()}>
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

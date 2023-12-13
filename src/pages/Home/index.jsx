import { useState } from 'react'
import { Button, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'

function HomePage() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15',
      price: 22000000,
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 28000000,
    },
    {
      id: 3,
      name: 'iPhone 14 Pro',
      price: 24000000,
    },
    {
      id: 4,
      name: 'Samsung S23 Ultra',
      price: 24000000,
    },
  ])

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
      const newProducts = [
        ...products,
        {
          name: productName,
          price: parseInt(productPrice),
        },
      ]
      setProducts(newProducts)
      setProductName('')
      setProductPrice('')
    }
  }

  const renderProductItems = products.map((item, index) => {
    return (
      <Col lg={6} md={8} sm={12} key={index}>
        <Link to={`/product/${item.id}`}>
          <Card size="small" title={item.name}>
            {item.price.toLocaleString()} VND
          </Card>
        </Link>
      </Col>
    )
  })

  return (
    <div className="wrapper">
      <Link to="/about">Go to About</Link>
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

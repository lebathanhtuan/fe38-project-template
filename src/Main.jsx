import { useState } from 'react'

import Filter from './Filter'
import Item from './Item'

function Main(props) {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const [products, setProducts] = useState([
    {
      name: 'iPhone 15',
      price: 22000000,
    },
    {
      name: 'iPhone 15 Pro',
      price: 28000000,
    },
    {
      name: 'iPhone 14 Pro',
      price: 24000000,
    },
  ])

  const handleAddProduct = () => {
    const newProducts = [
      ...products,
      {
        name: 'Samsung Galaxy S23',
        price: 20000000,
      },
    ]
    setProducts(newProducts)
  }

  const renderProductItems = products.map((item, index) => {
    return <Item key={index} name={item.name} price={item.price} />
  })

  return (
    <>
      <h2>Main</h2>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
      <div>Input value: {text}</div>
      <div>
        <input onChange={(e) => setText(e.target.value)} value={text} />
      </div>
      <button onClick={() => setText('Tuan')}>Set text is Tuan</button>
      <Filter />
      {renderProductItems}
      <div>
        <input placeholder="Name" />
        <input placeholder="Price" />
        <div>
          <button onClick={() => handleAddProduct()}>Add</button>
        </div>
      </div>
    </>
  )
}

export default Main

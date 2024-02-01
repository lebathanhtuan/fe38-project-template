import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { InputNumber } from 'antd'

function CartPage() {
  const { cartList } = useSelector((state) => state.cart)

  const renderCartList = useMemo(() => {
    return cartList.map((item) => {
      return (
        <div key={item.id} style={{ border: '1px solid gray' }}>
          <p>Tên: {item.name}</p>
          <p>Đơn giá: {item.price.toLocaleString()}</p>
          <p>
            Số lượng: <InputNumber defaultValue={item.quantity} />
          </p>
          <p>Thành tiền: {(item.price * item.quantity).toLocaleString()}</p>
        </div>
      )
    })
  }, [cartList])

  return (
    <div>
      <h2>Giỏ hàng</h2>
      <div>{renderCartList}</div>
    </div>
  )
}

export default CartPage

import { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

const OrderHistories = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const { orderList } = useSelector((state) => state.order)

  const tableColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => `${orderDetails.length} sản phẩm`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => dayjs(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'address',
      key: 'address',
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
  ]

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            {record.orderDetails.map((item) => (
              <li key={item.id}>
                {item.name}
                {` - ${item.price}`}
                {` - ${item.quantity}`}
                {` - ${item.price * item.quantity}`}
              </li>
            ))}
          </ul>
        ),
      }}
    />
  )
}

export default OrderHistories

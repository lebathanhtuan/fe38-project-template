import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'antd'

import { ROUTES } from 'constants/routes'
import { getProductListRequest } from '../../../redux/slicers/product.slice'

function ProductManage() {
  const dispatch = useDispatch()

  const { productList } = useSelector((state) => state.product)
  console.log('🚀 ~ file: index.jsx:11 ~ ProductManage ~ productList:', productList)

  const tableColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => <Link to={ROUTES.ADMIN.DASHBOARD}>{item.name}</Link>,
    },
    {
      title: 'Hãng',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => `${item.price.toLocaleString()} VND`,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => <Button danger>Xóa</Button>,
    },
  ]

  useEffect(() => {
    dispatch(getProductListRequest())
  }, [])

  return (
    <div>
      <h2>Product Manage</h2>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={productList.data}
        loading={productList.loading}
        pagination={false}
      />
    </div>
  )
}

export default ProductManage

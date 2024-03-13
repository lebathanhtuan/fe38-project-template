import { useState, useEffect, useMemo } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Input, Select, Table, Space, Avatar, Pagination, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { ROUTES } from 'constants/routes'
import { ADMIN_TABLE_LIMIT } from 'constants/paging'
import { getProductListRequest, deleteProductRequest } from '../../../redux/slicers/product.slice'
import { getCategoryListRequest } from '../../../redux/slicers/category.slice'
import * as S from './styles'

function ProductList() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: '',
    priceOrder: undefined,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productList } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

  const tableColumn = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => {
        return (
          <Space>
            <Avatar />
            <h4>{item.name}</h4>
          </Space>
        )
      },
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category.name,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => navigate(generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: item.id }))}
            >
              Cập nhật
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này không?"
              onConfirm={() =>
                dispatch(
                  deleteProductRequest({
                    id: item.id,
                    callback: () => {
                      dispatch(
                        getProductListRequest({
                          ...filterParams,
                          page: 1,
                          limit: ADMIN_TABLE_LIMIT,
                        })
                      )
                    },
                  })
                )
              }
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button ghost danger icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: ADMIN_TABLE_LIMIT,
      })
    )
    dispatch(getCategoryListRequest())
  }, [])

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    })
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: ADMIN_TABLE_LIMIT,
      })
    )
  }

  const handleChangePage = (page) => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: page,
        limit: ADMIN_TABLE_LIMIT,
      })
    )
  }

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      )
    })
  }, [categoryList.data])

  return (
    <div>
      <Row justify="space-between" align="middle">
        <h2>Danh sách sản phẩm</h2>
        <Button type="primary" onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}>
          Tạo sản phẩm
        </Button>
      </Row>
      <S.FilterWrapper>
        <h5>Bộ lọc</h5>
        <Row gutter={[16, 16]} style={{ marginTop: 4 }}>
          <Col span={8}>
            <S.FilterLabel htmlFor="keyword">Tìm kiếm</S.FilterLabel>
            <Input
              id="keyword"
              onChange={(e) => handleFilter('keyword', e.target.value)}
              placeholder="Tên sản phẩm"
            />
          </Col>
          <Col span={8}>
            <S.FilterLabel htmlFor="categoryId">Thương hiệu</S.FilterLabel>
            <Select
              id="categoryId"
              mode="multiple"
              allowClear
              onChange={(values) => handleFilter('categoryId', values)}
              placeholder="Thương hiệu sản phẩm"
              style={{ width: '100%' }}
            >
              {renderCategoryOptions}
            </Select>
          </Col>
          <Col span={8}>
            <S.FilterLabel htmlFor="keyword">Sắp xếp</S.FilterLabel>
            <Select
              allowClear
              onChange={(values) => handleFilter('priceOrder', values)}
              placeholder="Sắp xếp theo giá"
              style={{ width: '100%' }}
            >
              <Select.Option value="asc">Giá tăng dần</Select.Option>
              <Select.Option value="desc">Giá giảm dần</Select.Option>
            </Select>
          </Col>
        </Row>
      </S.FilterWrapper>
      <Table
        columns={tableColumn}
        dataSource={productList.data}
        rowKey="id"
        pagination={false}
        loading={productList.load}
      />
      <Row justify="center">
        <Pagination
          current={productList.meta.page}
          pageSize={ADMIN_TABLE_LIMIT}
          total={productList.meta.total}
          onChange={(page) => handleChangePage(page)}
          style={{ margin: '16px auto 0' }}
        />
      </Row>
    </div>
  )
}

export default ProductList

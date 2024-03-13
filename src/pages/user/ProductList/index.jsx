import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate, generatePath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Card,
  Checkbox,
  Flex,
  Button,
  Select,
  Skeleton,
  Tag,
  Breadcrumb,
  Space,
} from 'antd'
import qs from 'qs'
import { HomeOutlined } from '@ant-design/icons'

import Container from 'components/Container'
import { ROUTES } from 'constants/routes'
import { PRODUCT_LIMIT } from 'constants/paging'
import { getProductListRequest } from '../../../redux/slicers/product.slice'
import { getCategoryListRequest } from '../../../redux/slicers/category.slice'

import * as S from './styles'

function ProductListPage() {
  const { search } = useLocation()

  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    return {
      categoryId: params.categoryId ? params.categoryId.map((item) => parseInt(item)) : [],
      priceOrder: params.priceOrder,
      keyword: params.keyword || '',
    }
  }, [search])

  const isEmptyFilter = useMemo(() => {
    return !searchParams.categoryId.length && !searchParams.priceOrder && !searchParams.keyword
  }, [searchParams])

  const { productList } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCategoryListRequest())
  }, [])

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
  }, [searchParams])

  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value }
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`)
  }

  const handleClearFilter = (key, newValue) => {
    const newFilterParams = { ...searchParams, [key]: newValue }
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`)
  }

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    )
  }

  const renderCategoryItems = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Col key={item.id} span={24}>
          <Checkbox key={item.id} value={item.id}>
            {item.name}
          </Checkbox>
        </Col>
      )
    })
  }, [categoryList.data])

  const renderCategoryFilter = useMemo(() => {
    return searchParams.categoryId.map((id) => {
      const categoryData = categoryList.data.find((categoryItem) => categoryItem.id === id)
      if (!categoryData) return null
      return (
        <Tag
          key={id}
          closable
          onClose={() =>
            handleClearFilter(
              'categoryId',
              searchParams.categoryId.filter((item) => item !== id)
            )
          }
        >
          {categoryData.name}
        </Tag>
      )
    })
  }, [searchParams.categoryId, categoryList.data])

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              hoverable
              size="small"
              bordered={false}
              cover={
                <img
                  alt="example"
                  src={item.images[0]?.url || 'https://dummyimage.com/800x1000/5f9ea0/fff'}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              }
            >
              <span>{item.category?.name}</span>
              <S.ProductTitle truncateMultiLine={2}>{item.name}</S.ProductTitle>
              <S.ProductPrice>{item.price.toLocaleString()} ₫</S.ProductPrice>
            </Card>
          </Link>
        </Col>
      )
    })
  }, [productList.data])

  return (
    <Container>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: 'Danh sách sản phẩm',
          },
        ]}
        style={{ marginBottom: 8 }}
      />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Thương hiệu" size="small">
            {categoryList.loading ? (
              <Skeleton active />
            ) : (
              <Checkbox.Group
                onChange={(values) => handleFilter('categoryId', values)}
                value={searchParams.categoryId}
              >
                <Row>{renderCategoryItems}</Row>
              </Checkbox.Group>
            )}
          </Card>
        </Col>
        <Col span={16}>
          <Card size="small" bordered={false} style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col md={16} xs={24}>
                <p style={{ marginTop: 6 }}>
                  {`Hiển thị 1 - ${productList.data.length} của ${productList.meta.total} sản phẩm`}
                </p>
              </Col>
              <Col md={8} xs={24} style={{ textAlign: 'right' }}>
                <Select
                  onChange={(value) => handleFilter('priceOrder', value)}
                  value={searchParams.priceOrder}
                  placeholder="Sắp xếp theo"
                  allowClear
                  bordered={false}
                  style={{ width: '100%' }}
                >
                  <Select.Option value="asc">Giá tăng dần</Select.Option>
                  <Select.Option value="desc">Giá giảm dần</Select.Option>
                </Select>
              </Col>
              {!isEmptyFilter && (
                <Col xs={24}>
                  <span>Bộ lọc: </span>
                  {renderCategoryFilter}
                  {searchParams.keyword && (
                    <Tag closable onClose={() => handleClearFilter('keyword', '')}>
                      Từ khoá: {searchParams.keyword}
                    </Tag>
                  )}
                  {searchParams.priceOrder && (
                    <Tag closable onClose={() => handleClearFilter('priceOrder', undefined)}>
                      Sắp xếp: {searchParams.priceOrder === 'asc' ? 'Giá tăng dần' : 'Giá giảm dần'}
                    </Tag>
                  )}
                </Col>
              )}
            </Row>
          </Card>
          <Row gutter={[16, 16]}>{renderProductItems}</Row>
          {productList.data.length < productList.meta.total && (
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Hiển thị thêm</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductListPage

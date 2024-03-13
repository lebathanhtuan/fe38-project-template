import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Space, Button, Badge, Input, Avatar } from 'antd'
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import qs from 'qs'

import { ROUTES } from 'constants/routes'
import { logoutRequest } from '../../../redux/slicers/auth.slice'
import { getCategoryListRequest } from '../../../redux/slicers/category.slice'

import * as S from './styles'

function Header() {
  const [keyword, setKeyword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)
  const { categoryList } = useSelector((state) => state.category)
  const { cartList } = useSelector((state) => state.cart)

  const { search } = useLocation()

  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    return {
      categoryId: params.categoryId ? params.categoryId.map((item) => parseInt(item)) : [],
      priceOrder: params.priceOrder,
      keyword: params.keyword || '',
    }
  }, [search])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryListRequest())
  }, [])

  useEffect(() => {
    setKeyword(searchParams.keyword || '')
  }, [searchParams])

  const handleSearchKeyword = (e) => {
    if (e.key === 'Enter') {
      const newFilterParams = { ...searchParams, keyword: e.target.value }
      navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`)
    }
  }

  const renderNavLink = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Link
          to={{
            pathname: ROUTES.USER.PRODUCT_LIST,
            search: qs.stringify({
              categoryId: [item.id],
            }),
          }}
          key={item.id}
          style={{ textDecoration: 'none' }}
        >
          <S.NavLinkItem>
            <h4>{item.name}</h4>
          </S.NavLinkItem>
        </Link>
      )
    })
  }, [categoryList.data])

  return (
    <S.HeaderWrapper>
      <S.HeaderTopWrapper>
        <Link to={ROUTES.USER.HOME} style={{ color: 'white', textDecoration: 'none' }}>
          <h3>Logo</h3>
        </Link>
        <S.SearchContainer>
          <Input
            size="large"
            placeholder="Tìm kiếm"
            allowClear
            prefix={<SearchOutlined />}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => handleSearchKeyword(e)}
            value={keyword}
            style={{ width: 400 }}
          />
        </S.SearchContainer>
        <Space size={24}>
          <Badge count={cartList.length}>
            <Link to={ROUTES.USER.CART}>
              <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />
            </Link>
          </Badge>
          {userInfo.data.id ? (
            <Space>
              {userInfo.data.avatar ? (
                <S.AvatarPreview src={userInfo.data.avatar} alt="User profile picture" />
              ) : (
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              )}
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      label: 'Dashboard',
                      icon: <DashboardOutlined />,
                      onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
                      style: {
                        display: userInfo.data.role === 'admin' ? 'block' : 'none',
                      },
                    },
                    {
                      key: '2',
                      label: 'Thông tin cá nhân',
                      icon: <UserOutlined />,
                      onClick: () => navigate(ROUTES.USER.PROFILE),
                    },
                    {
                      key: '3',
                      label: 'Đăng xuất',
                      onClick: () => dispatch(logoutRequest()),
                      icon: <LogoutOutlined />,
                    },
                  ],
                }}
              >
                <h3>{userInfo.data.fullName}</h3>
              </Dropdown>
            </Space>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
          )}
        </Space>
      </S.HeaderTopWrapper>
      <S.HeaderBottomWrapper>
        <S.NavLinkContainer>{renderNavLink}</S.NavLinkContainer>
      </S.HeaderBottomWrapper>
    </S.HeaderWrapper>
  )
}

export default Header

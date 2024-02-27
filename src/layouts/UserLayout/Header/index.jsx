import { Dropdown, Space, Button, Badge } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LogoutOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'

import { ROUTES } from 'constants/routes'
import { logoutRequest } from '../../../redux/slicers/auth.slice'

import * as S from './styles'

function Header() {
  const { userInfo } = useSelector((state) => state.auth)
  const { cartList } = useSelector((state) => state.cart)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Link to={ROUTES.USER.HOME}>
          <div>Logo</div>
        </Link>
        <Space size={24}>
          <Badge count={cartList.length}>
            <Link to={ROUTES.USER.CART}>
              <ShoppingCartOutlined style={{ fontSize: 24, color: '#414141' }} />
            </Link>
          </Badge>
          {userInfo.data.id ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Dashboard',
                    icon: <UserOutlined />,
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
              <h2>{userInfo.data.fullName}</h2>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
          )}
        </Space>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

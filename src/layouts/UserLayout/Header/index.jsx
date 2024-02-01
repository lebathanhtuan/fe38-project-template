import { Dropdown, Space, Button, Badge } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ROUTES } from 'constants/routes'
import { logoutRequest } from '../../../redux/slicers/auth.slice'

import * as S from './styles'

function Header() {
  const { userInfo } = useSelector((state) => state.auth)
  const { cartList } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Link to={ROUTES.USER.HOME}>
          <div>Logo</div>
        </Link>

        {userInfo.data.id ? (
          <Space>
            <Link to={ROUTES.USER.CART}>
              <Badge count={cartList.length}>
                <Button size="small" type="text">
                  Giỏ hàng
                </Button>
              </Badge>
            </Link>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>,
                  },
                  {
                    key: '2',
                    label: 'My profile',
                  },
                  {
                    key: '3',
                    label: 'Logout',
                    onClick: () => dispatch(logoutRequest()),
                  },
                ],
              }}
            >
              <div>{userInfo.data.fullName}</div>
            </Dropdown>
          </Space>
        ) : (
          <Link to={ROUTES.LOGIN}>Login</Link>
        )}
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

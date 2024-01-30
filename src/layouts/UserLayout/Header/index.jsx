import { Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ROUTES } from 'constants/routes'
import { logoutRequest } from '../../../redux/slicers/auth.slice'

import * as S from './styles'

function Header() {
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Link to={ROUTES.USER.HOME}>
          <div>Logo</div>
        </Link>

        {userInfo.data.id ? (
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
        ) : (
          <Link to={ROUTES.LOGIN}>Login</Link>
        )}
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

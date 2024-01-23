import { Dropdown } from 'antd'
import { Link } from 'react-router-dom'

import { ROUTES } from 'constants/routes'

import * as S from './styles'

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Link to={ROUTES.USER.HOME}>
          <div>Logo</div>
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
              },
            ],
          }}
        >
          <div>Avatar</div>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

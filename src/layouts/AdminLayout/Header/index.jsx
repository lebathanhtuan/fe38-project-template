import { Button, Space, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MenuOutlined, HolderOutlined, Lo } from '@ant-design/icons'

import { ROUTES } from 'constants/routes'
import { toggleAdminSidebar } from '../../../redux/slicers/common.slice'
import { logoutRequest } from '../../../redux/slicers/auth.slice'
import * as S from './styles'

function Header() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Space size={24}>
          <Button
            onClick={() => dispatch(toggleAdminSidebar(!isShowAdminSidebar))}
            icon={<MenuOutlined />}
          />
          <div>Logo</div>
        </Space>
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: 'Trang chủ',
                icon: <HomeOutlined />,
                onClick: () => navigate(ROUTES.USER.HOME),
              },
              {
                key: '2',
                label: 'Đăng xuất',
                icon: <LogoutOutlined />,
                onClick: () => dispatch(logoutRequest()),
              },
            ],
          }}
        >
          <div>{userInfo.data.fullName}</div>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

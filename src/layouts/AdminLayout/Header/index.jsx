import { Button, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import * as S from './styles'

function Header() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)

  const dispatch = useDispatch()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Space size={24}>
          <Button
            onClick={() =>
              dispatch({
                type: 'common/toggleAdminSidebar',
                payload: !isShowAdminSidebar,
              })
            }
          >
            Menu left
          </Button>
          <div>Logo</div>
        </Space>
        <div>Avatar</div>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header

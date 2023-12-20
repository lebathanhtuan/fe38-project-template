import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SIDEBAR_ITEMS } from './constants'

import * as S from './styles'

function Sidebar() {
  const { pathname } = useLocation()

  const { isShowAdminSidebar } = useSelector((state) => state.common)

  const renderSidebarItems = SIDEBAR_ITEMS.map((item, index) => {
    return (
      <S.SidebarItem key={index} to={item.path} active={pathname === item.path}>
        {item.name}
      </S.SidebarItem>
    )
  })

  return (
    <S.SidebarWrapper isShowAdminSidebar={isShowAdminSidebar}>
      {renderSidebarItems}
    </S.SidebarWrapper>
  )
}

export default Sidebar

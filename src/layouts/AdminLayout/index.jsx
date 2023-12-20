import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header'
import Sidebar from './Sidebar'

import * as S from './styles'

function AdminLayout() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)
  console.log(
    '🚀 ~ file: index.jsx:15 ~ AdminLayout ~ isShowAdminSidebar:',
    isShowAdminSidebar
  )

  // const role = 'user'

  // if (role !== 'amdin') {
  //   return <Navigate to="/asdiashfihaishfoia" />
  // }
  return (
    <S.AppWrapper>
      <Header />
      <S.AppContainer>
        <Sidebar />
        <S.AppContent isShowAdminSidebar={isShowAdminSidebar}>
          <Outlet />
        </S.AppContent>
      </S.AppContainer>
    </S.AppWrapper>
  )
}

export default AdminLayout

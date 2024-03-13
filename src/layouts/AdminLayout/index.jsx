import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header'
import Sidebar from './Sidebar'

import { ROUTES } from 'constants/routes'

import * as S from './styles'

function AdminLayout() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)
  const { userInfo } = useSelector((state) => state.auth)

  const accessToken = localStorage.getItem('accessToken')

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>
  } else if (userInfo.data.role !== 'admin') {
    return <Navigate to={ROUTES.USER.HOME} />
  }
  return (
    <S.AppWrapper>
      <Header />
      <S.AppContainer>
        <Sidebar />
        <S.AppContent $isShowAdminSidebar={isShowAdminSidebar}>
          <Outlet />
        </S.AppContent>
      </S.AppContainer>
    </S.AppWrapper>
  )
}

export default AdminLayout

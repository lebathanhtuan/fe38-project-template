import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import Header from '../Header'
import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
import NotFoundPage from '../pages/NotFound'

import * as S from './styles'

function App() {
  const [isShowLeftSidebar, setIsShowLeftSidebar] = useState(false)
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b6b9',
          borderRadius: 0,
        },
      }}
    >
      <S.AppWrapper>
        <Header
          isShowLeftSidebar={isShowLeftSidebar}
          isShowRightSidebar={isShowRightSidebar}
          setIsShowLeftSidebar={setIsShowLeftSidebar}
          setIsShowRightSidebar={setIsShowRightSidebar}
        />
        <S.AppContainer>
          <S.LeftSidebarWrapper isShowLeftSidebar={isShowLeftSidebar}>
            SideBar SideBar SideBar SideBar SideBar
          </S.LeftSidebarWrapper>
          <S.AppContent isShowLeftSidebar={isShowLeftSidebar}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </S.AppContent>
        </S.AppContainer>
        <S.RightSidebarWrapper isShowRightSidebar={isShowRightSidebar}>
          <S.RightSidebarOverlay onClick={() => setIsShowRightSidebar(false)} />
          <S.RightSidebarContainer>Right sidebar</S.RightSidebarContainer>
        </S.RightSidebarWrapper>
      </S.AppWrapper>
    </ConfigProvider>
  )
}

export default App

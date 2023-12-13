import { Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import AdminLayout from '../layouts/AdminLayout'
import UserLayout from '../layouts/UserLayout'

import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
import ProductDetailPage from '../pages/ProductDetail'
import NotFoundPage from '../pages/NotFound'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b6b9',
          borderRadius: 0,
        },
      }}
    >
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App

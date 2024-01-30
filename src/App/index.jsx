import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ConfigProvider } from 'antd'
import { jwtDecode } from 'jwt-decode'

import AdminLayout from 'layouts/AdminLayout'
import UserLayout from 'layouts/UserLayout'

import HomePage from 'pages/user/Home'
import AboutPage from 'pages/user/About'
import ProductListPage from 'pages/user/ProductList'
import ProductDetailPage from 'pages/user/ProductDetail'
import ToDoListPage from 'pages/user/ToDoList'

import DashboardPage from 'pages/admin/Dashboard'
import ProductManagePage from 'pages/admin/ProductManage'
import CreateProductPage from 'pages/admin/CreateProduct'

import LoginPage from 'pages/Login'
import RegisterPage from 'pages/Register'
import NotFoundPage from 'pages/NotFound'

import { ROUTES } from 'constants/routes'
import { getUserInfoRequest } from '../redux/slicers/auth.slice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const tokenData = jwtDecode(accessToken)
      dispatch(getUserInfoRequest({ id: parseInt(tokenData.sub) }))
    }
  }, [])

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
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.USER.TO_DO_LIST} element={<ToDoListPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.ADMIN.PRODUCT_MANAGE} element={<ProductManagePage />} />
          <Route path={ROUTES.ADMIN.CREATE_PRODUCT} element={<CreateProductPage />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App

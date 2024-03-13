import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ConfigProvider } from 'antd'
import { jwtDecode } from 'jwt-decode'

import AdminLayout from 'layouts/AdminLayout'
import UserLayout from 'layouts/UserLayout'
import ProfileLayout from 'layouts/ProfileLayout'

import HomePage from 'pages/user/Home'
import ProductListPage from 'pages/user/ProductList'
import ProductDetailPage from 'pages/user/ProductDetail'
import CartPage from 'pages/user/Cart'
import CheckoutPage from 'pages/user/Checkout'
import UserInfoPage from 'pages/user/UserInfo'
import OrderHistoryPage from 'pages/user/OrderHistory'
import FavoriteProductsPage from 'pages/user/FavoriteProducts'
import ChangePasswordPage from 'pages/user/ChangePassword'

import AdminDashboardPage from 'pages/admin/Dashboard'
import AdminProductListPage from 'pages/admin/ProductList'
import AdminCreateProductPage from 'pages/admin/CreateProduct'
import AdminUpdateProductPage from 'pages/admin/UpdateProduct'

import LoginPage from 'pages/Login'
import RegisterPage from 'pages/Register'
import NotFoundPage from 'pages/NotFound'

import { ROUTES } from 'constants/routes'
import { getUserInfoRequest } from '../redux/slicers/auth.slice'

function App() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const tokenData = jwtDecode(accessToken)
      dispatch(getUserInfoRequest({ id: parseInt(tokenData.sub) }))
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b6b9',
          borderRadius: 4,
        },
      }}
    >
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route element={<ProfileLayout />}>
            <Route path={ROUTES.USER.PROFILE} element={<Navigate to={ROUTES.USER.USER_INFO} />} />
            <Route path={ROUTES.USER.USER_INFO} element={<UserInfoPage />} />
            <Route path={ROUTES.USER.ORDER_HISTORY} element={<OrderHistoryPage />} />
            <Route path={ROUTES.USER.FAVORITE_PRODUCTS} element={<FavoriteProductsPage />} />
            <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
          </Route>
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={ROUTES.ADMIN.PRODUCT_LIST} element={<AdminProductListPage />} />
          <Route path={ROUTES.ADMIN.CREATE_PRODUCT} element={<AdminCreateProductPage />} />
          <Route path={ROUTES.ADMIN.UPDATE_PRODUCT} element={<AdminUpdateProductPage />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App

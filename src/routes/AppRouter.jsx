import { Route, Routes} from 'react-router'
import RegisterPage from '../auth/register/RegisterPage'
import HomePage from '../views/home/HomePage'
import LoginPage from '../auth/login/LoginPage'
import UserPage from '../views/home/UserPage'
import ProductPage from '../views/home/ProductPage'
import CartPage from '../views/home/CartPage'
import SuccessPage from '../views/home/SuccessPages'
import CancelPage from '../views/home/CancelPage'
import ProtectedRoute from '../context/ProtectedRoute';
import UnauthorizedPage from '../views/home/UnauthorizedPage';
import SellerPage from '../views/seller/SellerPage'
import OrdersCustomerPage from '../views/home/OrdersCustomerPage'
import AddProductPage from '../views/seller/AddProductPage'
import AdminDashboardPage from '../views/admin/pages/AdminDashboardPage'
import AdminProductsPages from '../views/admin/pages/AdminProductsPages'
import ADADDProductPages from '../views/admin/pages/ADADDProductPages'
import ADLTProductsPages from '../views/admin/pages/ADLTProductsPages'
import ADUPDPages from '../views/admin/pages/ADUPDPages'
import ADSEEProductsPages from '../views/admin/pages/ADSEEProductsPages'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/user' element={
        <ProtectedRoute roles={['Admin', 'Customer', 'Seller']}>
          <UserPage />
        </ProtectedRoute>
      } />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={
        <ProtectedRoute roles={['Customer']}>
          <CartPage />
        </ProtectedRoute>
      } />
      <Route path='/seller' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerPage />
        </ProtectedRoute>
      } />
      <Route path='/admin' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
      <Route path='/admin/products' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminProductsPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/add' element={
        <ProtectedRoute roles={['Admin']}>
          <ADADDProductPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/delete' element={
        <ProtectedRoute roles={['Admin']}>
          <ADLTProductsPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/edit' element={
        <ProtectedRoute roles={['Admin']}>
          <ADUPDPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEEProductsPages />
        </ProtectedRoute>
      } />
      <Route path='/sellerproduct' element={
        <ProtectedRoute roles={['Seller']}>
          <AddProductPage />
        </ProtectedRoute>
      } />
      <Route path='/orders' element={
        <ProtectedRoute roles={['Customer','Admin','Seller']}>
          <OrdersCustomerPage />
        </ProtectedRoute>
      } />
      <Route path='/success' element={<SuccessPage />} />
      <Route path='/cancel' element={<CancelPage />} />
      <Route path='/unauthorized' element={<UnauthorizedPage />} />
    </Routes>
  )
}

export default AppRouter
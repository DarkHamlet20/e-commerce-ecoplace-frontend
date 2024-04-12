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
import ADADDProductPages from '../views/admin/pages/ADADDProductPages'
import ADLTProductsPages from '../views/admin/pages/ADLTProductsPages'
import ADUPDPages from '../views/admin/pages/ADUPDPages'
import ADSEEProductsPages from '../views/admin/pages/ADSEEProductsPages'
import ADADCategoriesPages from '../views/admin/pages/ADADCategoriesPages'
import ADLTCategoriesPages from '../views/admin/pages/ADLTCategoriesPages'
import ADUPDCategoriesPages from '../views/admin/pages/ADUPDCategoriesPages'
import ADSEECategoriesPages from '../views/admin/pages/ADSEECategoriesPages'
import ADSEEUsersPages from '../views/admin/pages/ADSEEUsersPages'
import ADSEEOrdersPages from '../views/admin/pages/ADSEEOrdersPages'

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
      
      {/* Rutas para los Admins */}
      {/* Dashboard del Admin */}
      <Route path='/admin' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Products */}
      <Route path='/admin/products/add' element={
        <ProtectedRoute roles={['Admin']}>
          <ADADDProductPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/delete/:id' element={
        <ProtectedRoute roles={['Admin']}>
          <ADLTProductsPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/edit/:id' element={
        <ProtectedRoute roles={['Admin']}>
          <ADUPDPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/products/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEEProductsPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Categories*/}
      <Route path='/admin/categories/add' element={
        <ProtectedRoute roles={['Admin']}>
          <ADADCategoriesPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/categories/delete/:id' element={
        <ProtectedRoute roles={['Admin']}>
          <ADLTCategoriesPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/categories/edit/:id' element={
        <ProtectedRoute roles={['Admin']}>
          <ADUPDCategoriesPages />
        </ProtectedRoute>
      } />
      <Route path='/admin/categories/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEECategoriesPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Users*/}
      <Route path='/admin/users/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEEUsersPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Orders*/}
      <Route path='/admin/orders/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEEOrdersPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los sellers */}
      <Route path='/seller' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerPage />
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
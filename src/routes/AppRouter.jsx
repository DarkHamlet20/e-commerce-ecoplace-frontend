import { Route, Routes} from 'react-router'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterPage from '../auth/register/RegisterPage'
import HomePage from '../views/home/HomePage'
import LoginPage from '../auth/login/LoginPage'
import UserPage from '../views/home/UserPage'
import ProductPage from '../views/home/ProductPage'
import CartPage from '../views/home/CartPage'
import OrdersCustomerPage from '../views/home/OrdersCustomerPage';
import OrderConfirmationPage from '../views/home/OrderConfirmationPage'
import SuccessPage from '../views/home/SuccessPages'
import CancelPage from '../views/home/CancelPage'
import ProtectedRoute from '../context/ProtectedRoute';
import UnauthorizedPage from '../views/home/UnauthorizedPage';
import AdminDashboardPage from '../views/admin/pages/AdminDashboardPage'
import ADADDProductPages from '../views/admin/pages/ADADDProductPages'
import ADLTProductsPages from '../views/admin/pages/ADLTProductsPages'
import ADUPDProductsPages from '../views/admin/pages/ADUPDProductsPages'
import ADSEEProductsPages from '../views/admin/pages/ADSEEProductsPages'
import ADADCategoriesPages from '../views/admin/pages/ADADCategoriesPages'
import ADLTCategoriesPages from '../views/admin/pages/ADLTCategoriesPages'
import ADUPDCategoriesPages from '../views/admin/pages/ADUPDCategoriesPages'
import ADSEECategoriesPages from '../views/admin/pages/ADSEECategoriesPages'
import ADSEEUsersPages from '../views/admin/pages/ADSEEUsersPages'
import ADUPDUsersPages from '../views/admin/pages/ADUPDUsersPages';
import ADSEEOrdersPages from '../views/admin/pages/ADSEEOrdersPages'
import ADSEESalesPages from '../views/admin/pages/ADSEESalesPages'
import SellerDashboardPage from '../views/vendor/pages/SellerDashboardPage';
import SLSEEProductPages from '../views/vendor/pages/SLSEEProductPages';
import SLADDProductPages from '../views/vendor/pages/SLADDProductPages';
import SLUPDProductPages from '../views/vendor/pages/SLUPDProductPages';
import SLDLTProductPages from '../views/vendor/pages/SLDLTProductPages';
import SellerSalesPage from '../views/vendor/pages/SellerSalesPages';
import AdminPagesAccount from '../views/admin/pages/AdminPagesAccount';
import SellerPagesAccount from '../views/vendor/pages/SellerPagesAccount';
import OrderDetailsPage from '../views/home/OrderDetailsPage';
import UserUpdateComponent from '../components/UserUpdateComponent';
import ForgotPasswordPage from '../auth/password/ForgotPasswordPage';
import ResetPasswordPage from '../auth/password/ResetPasswordPage';
import AdminOrderDetails from '../views/admin/pages/AdminOrderDetails';
import AdminUpdateUserMe from '../views/admin/pages/AdminUpdateUserMe';
import SellerUpdateUserMe from '../views/vendor/pages/SellerUpdateUserMe';
import NotFoundPage from '../views/home/NotFoundPage';

const AppRouter = () => {

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const getHomeComponent = () => {
    if(token) {
      switch (role) {
        case 'Admin':
          return <Navigate to='/admin' />;
        case 'Seller':
          return <Navigate to='/seller' />;
        default:
          return <HomePage />;
      }      
    } else {
      return <HomePage />; // Asegúrate de devolver el HomePage como fallback
    }
  }

  return (
    <Routes>
      {/* Rutas de autenticacion */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='/user' element={
        <ProtectedRoute roles={['Admin', 'Customer', 'Seller']}>
          <UserPage />
        </ProtectedRoute>
      } />

      <Route path='/account-settings' element={
        <ProtectedRoute roles={['Customer']}>
          <UserUpdateComponent />
        </ProtectedRoute>
      } />

      {/* Ruta Defecto de la pagina */}
      <Route path='/' element={getHomeComponent()} />

      {/* Rutas de Customer */}

      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={
        <ProtectedRoute roles={['Customer']}>
          <CartPage />
        </ProtectedRoute>
      } />

      <Route path='/order-customer' element={
        <ProtectedRoute roles={['Customer']}>
          <OrdersCustomerPage />
        </ProtectedRoute>
      } />

      <Route path='/order/:orderId' element={
        <ProtectedRoute roles={['Customer']}>
          <OrderDetailsPage />
        </ProtectedRoute>
      } />

      <Route path='/order-confirmation' element={
        <ProtectedRoute roles={['Customer']}>
          <OrderConfirmationPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas para los Admins */}
      {/* Dashboard del Admin */}
      <Route path='/admin' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />

      {/* Account del Admin */}
      <Route path='/admin/account' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminPagesAccount />
        </ProtectedRoute>
      } />

      <Route path='/admin/account/settings' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminUpdateUserMe />
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
          <ADUPDProductsPages />
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
      <Route path='/admin/users/edit/:id' element={
        <ProtectedRoute roles={['Admin']}>
          <ADUPDUsersPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Orders*/}
      <Route path='/admin/orders/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEEOrdersPages />
        </ProtectedRoute>
      } />

      <Route path='/admin/orders/view/:orderId' element={
        <ProtectedRoute roles={['Admin']}>
          <AdminOrderDetails />
        </ProtectedRoute>
      } />

      {/* Rutas para los Admins Sales*/}
      <Route path='/admin/sales/view' element={
        <ProtectedRoute roles={['Admin']}>
          <ADSEESalesPages />
        </ProtectedRoute>
      } />

      {/* Rutas para los sellers */}
      <Route path='/seller' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerDashboardPage />
        </ProtectedRoute>
      } />

      {/* Account del Seller */}
      <Route path='/seller/account' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerPagesAccount />
        </ProtectedRoute>
      } />

      {/* Account Settingd del Seller */}
      <Route path='/seller/account/settings' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerUpdateUserMe />
        </ProtectedRoute>
      } />

      <Route path='/seller/products/view' element={
        <ProtectedRoute roles={['Seller']}>
          <SLSEEProductPages />
        </ProtectedRoute>
      } />
      <Route path='/seller/products/add' element={
        <ProtectedRoute roles={['Seller']}>
          <SLADDProductPages />
        </ProtectedRoute>
      } />
      <Route path='/seller/products/edit/:id' element={
        <ProtectedRoute roles={['Seller']}>
          <SLUPDProductPages />
        </ProtectedRoute>
      } />
      <Route path='/seller/products/delete/:id' element={
        <ProtectedRoute roles={['Seller']}>
          <SLDLTProductPages />
        </ProtectedRoute>
      } />

      {/* Sales of Seller */}
      <Route path='/seller/sales/view' element={
        <ProtectedRoute roles={['Seller']}>
          <SellerSalesPage />
        </ProtectedRoute>
      } />

      <Route path='/success' element={<SuccessPage />} />
      <Route path='/cancel' element={<CancelPage />} />
      <Route path='/unauthorized' element={<UnauthorizedPage />} />
      <Route path='*' element={<NotFoundPage />} />
      
    </Routes>
  );
};

export default AppRouter;

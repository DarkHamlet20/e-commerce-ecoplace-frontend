import { Route, Routes } from 'react-router'
import RegisterPage from '../auth/register/RegisterPage'
import HomePage from '../views/home/HomePage'
import LoginPage from '../auth/login/LoginPage'
import UserPage from '../views/home/UserPage'
import ProductPage from '../views/home/ProductPage'
import CartPage from '../views/home/CartPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/user' element={<UserPage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  )
}

export default AppRouter
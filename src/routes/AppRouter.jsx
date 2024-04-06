import { Route, Routes } from 'react-router'
import RegisterPage from '../auth/register/RegisterPage'
import HomePage from '../views/home/HomePage'
import LoginPage from '../auth/login/LoginPage'
import UserPage from '../views/home/UserPage'

const AppRouter = () => {
  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/user' element={<UserPage />}/>
    </Routes>
  )
}

export default AppRouter
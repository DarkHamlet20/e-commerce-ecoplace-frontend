import { Route, Routes } from 'react-router'
import RegisterPage from '../auth/register/RegisterPage'
import HomePage from '../views/home/HomePage'
import LoginPage from '../auth/login/LoginPage'

const AppRouter = () => {
  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
    </Routes>
  )
}

export default AppRouter
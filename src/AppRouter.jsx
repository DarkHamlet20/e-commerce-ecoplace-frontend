import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import Register from './components/RegisterComponent'
import HomeComponent from './components/HomeComponent'

const AppRouter = () => {
  return (
   <Routes>
      <Route path='*' element={<HomeComponent />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<Register />}/>
   </Routes>
  )
}

export default AppRouter
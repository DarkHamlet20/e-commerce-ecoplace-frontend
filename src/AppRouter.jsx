import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './components/HomeComponent'
import LoginPage from './pages/LoginPage'
import Register from './components/RegisterComponent'
import CatalogoComponent from './components/CatalogoComponent'

const AppRouter = () => {
  return (
   <Routes>
      <Route path='*' element={<CatalogoComponent/>}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<Register />}/>
   </Routes>
  )
}

export default AppRouter
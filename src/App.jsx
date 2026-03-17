import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth-view/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-primary'>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

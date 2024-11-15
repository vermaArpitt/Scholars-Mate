import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Home from './Pages/Home'
import './App.css'

function App() {

  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }
  
  function LogoutAndRegister() {
    localStorage.clear()
    return <RegisterPage />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home/>
         </ProtectedRoutes>
        }/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<LogoutAndRegister/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

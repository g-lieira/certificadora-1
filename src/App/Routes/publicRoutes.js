import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'

const PublicRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/lista-problemas" element={<Login/>}/>
          <Route path="/problema" element={<Login/>}/>
          <Route path="/perfil" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default PublicRoutes

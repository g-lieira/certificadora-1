import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ListaProblemas from '../Pages/Lista-Problemas';
import Problemas from '../Pages/Problemas';
import Perfil from '../Pages/Perfil';

const PrivateRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/lista-problemas" element={<ListaProblemas/>}/>
          <Route path="/problema" element={<Problemas/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default PrivateRoutes

import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'
import ListaProblemas from './Pages/Lista-Problemas';

export default function Router(){

  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/lista-problemas" element={<ListaProblemas/>}/>
      </Routes>
  );
};
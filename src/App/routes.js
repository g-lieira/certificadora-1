import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'

export default function Router(){

  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  );
};
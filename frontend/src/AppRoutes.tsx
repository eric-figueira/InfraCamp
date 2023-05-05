import React from "react";
import { Routes, Route } from "react-router-dom"


import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Mapa from "./pages/Mapa/Mapa";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Cadastro />} />
      <Route path="/recover-password" element={<RecuperacaoSenha />} />

      <Route path="/map" element={<Mapa />} />
      {/* <Route path="/user" element={<Mapa />} />
      <Route path="/about" element={<Mapa />} />
      <Route path="/posts" element={<Mapa />} /> */}
    </Routes>
  );
}

export default AppRoutes;
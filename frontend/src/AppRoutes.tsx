import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"


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

      {/* Private Routes - only accessible when the user is logged */}
      <Route path="/map" element={<Mapa />} />
    </Routes>
  );
}

export default AppRoutes;
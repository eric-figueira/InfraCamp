import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"


import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Mapa from "./pages/Mapa/Mapa";
import Posts from "./pages/Posts/Posts";


import { AuthContext } from "./contexts/AuthContext";


const AppRoutes: React.FC = () => {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Public Routes
      
      <Route path="/signup" element={<Cadastro />} />
      <Route path="/recover-password" element={<RecuperacaoSenha />} />

      Private Routes - only accessible when the user is logged
      <Route path="/map" element={isAuthenticated ? <Mapa /> : <Navigate to="/" />} /> */}

      <Route path="/posts" element={<Posts/>} />
    </Routes>
  );
}

export default AppRoutes;
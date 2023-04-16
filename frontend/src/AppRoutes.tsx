import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"


import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Map from "./components/Map/Map";


import { AuthContext, AuthContextType } from "./contexts/AuthContext";


const AppRoutes: React.FC = () => {

  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Cadastro />} />
      <Route path="/recover-password" element={<RecuperacaoSenha />} />

      {/* Private Routes - only accessible when the user is logged */}
      <Route path="/map" element={isAuthenticated ? <Map /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
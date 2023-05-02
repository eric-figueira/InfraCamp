import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"


import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Mapa from "./pages/Mapa/Mapa";
import Posts from "./pages/Posts/Posts";


import { AuthContext } from "./contexts/AuthContext";
import Usuario from "./pages/Usuario/Usuario";


const AppRoutes: React.FC = () => {

  // const { isAuthenticated } = useContext(AuthContext);
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Cadastro />} />
      <Route path="/recover-password" element={<RecuperacaoSenha/>} />
      
      {/* Private Routes - only accessible when the user is logged */}
      <Route path="/map" element={isAuthenticated ? <Mapa /> : <Navigate to="/" />} />
      <Route path="/posts" element={isAuthenticated ? <Posts /> : <Navigate to="/" />} />
      <Route path="/user" element={isAuthenticated ? <Usuario/> : <Navigate to="/"/>} />
    </Routes>
  );
}

export default AppRoutes;
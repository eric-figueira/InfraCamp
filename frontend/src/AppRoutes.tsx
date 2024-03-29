import React from "react";
import { Routes, Route } from "react-router-dom"


import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Mapa from "./pages/Mapa/Mapa";
import Postagens from "./pages/Postagens/Postagens";
import Usuario from "./pages/Usuario/Usuario";
import SobreNos from "./pages/SobreNos/SobreNos";
import CriarDenuncias from "./pages/CriarDenuncia/CriarDenuncia";
import NotFound from "./pages/NotFound/NotFound";
import Email from "./pages/Email/Email";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup/verify-email" element={<Email type="create" />} />
      <Route path="/signup/signup" element={<Cadastro />} />
      <Route path="/recover-password/verify-email" element={<Email type="recover" />} />
      <Route path="/recover-password/recover" element={<RecuperacaoSenha />} />

      {/* Private Routes - only accessible when the user is logged */}
      <Route path="/map" element={<Mapa />} />
      <Route path="/posts" element={<Postagens />} />
      <Route path="/user" element={<Usuario />} />
      <Route path="/create" element={<CriarDenuncias type="create" />} />
      <Route path="/edit" element={<CriarDenuncias type="edit" />} />
      <Route path="/about" element={<SobreNos />} />

      <Route path='*' element={<NotFound text="A página que você procura não existe." />} />
    </Routes>
  );
}

export default AppRoutes;
import React from 'react';

import './styles/globalStyles.css'

import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
//import Map from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';

import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        {/* <RecuperacaoSenha /> */}
        {/* <Login /> */}
        {/* <Cadastro> */}
        <Navbar />
        {/* {<Map/>} */}
      </div>
    </AuthProvider>
  );
}

export default App;

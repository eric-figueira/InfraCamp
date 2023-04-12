import React from 'react';
import './App.css';

import RecuperacaoSenha from './pages/RecuperacaoSenha/RecuperacaoSenha';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Map from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      {/* <RecuperacaoSenha /> */}
      {/* <Login /> */}
      {/* <Cadastro> */}
      {<Map/>}
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import RecuperacaoSenha from './components/pages/RecuperacaoSenha';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import Map from './components/containers/Map';
import Navbar from './components/layout/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      {/* <RecuperacaoSenha /> */}
      {/* <Login /> */}
      {/* <Cadastro> */}
      {/* <Map/> */}
      <Navbar />
    </div>
  );
}

export default App;

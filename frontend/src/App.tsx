import React from 'react';
import './App.css';

import Button from './components/layout/Button/Button';

function App() {

  function Test() {
    alert('aa')
  }

  return (
    <div className="App">
      <Button text='Entrar' backgroundColor='#000000' fontColor='#FFFFFF' eventHandler={Test} />
      <Button text='Logar' backgroundColor='#FFF' fontColor='#000' borderColor='#000' eventHandler={Test} />
    </div>
  );
}

export default App;

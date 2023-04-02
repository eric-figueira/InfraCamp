import React from 'react';
import './App.css';

import Button from './components/layout/Button/Button';
import TextInput from './components/layout/Input/TextInput';

import { House } from 'phosphor-react'

function App() {

  function Test() {
    alert('aa')
  }

  return (
    <div className="App">
      <Button text='Entrar' backgroundColor='#000000' fontColor='#FFFFFF' eventHandler={Test} />
      <Button text='Logar' backgroundColor='#FFF' fontColor='#000' borderColor='#000' eventHandler={Test} />
      <TextInput placeholder='Senha' backgroundColor='#d4d4d4' fontColor='#000' fontSize={20} icon={House} iconSize={34} iconColor='#fff'/>
    </div>
  );
}

export default App;

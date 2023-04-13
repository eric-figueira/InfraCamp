import React from 'react';

import "./RecuperacaoSenha.css"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"


import Button from '../../components/Button/Button';
//import TextInput from '../../components/Input/TextInput';

import { EnvelopeSimple, Key } from 'phosphor-react'

const RecuperacaoSenha: React.FC = () => {

  function Test() {
  }

  return (
    <div className='wrapper'>
      <div className="img-container">
        <ImagemRecuperacaoSenha className='senha-img'/>
      </div>
      <div className="info-container">
        <div className="form-wrapper">
          <h1>Recupere sua senha</h1>
          <form>
            {/* <TextInput placeholder='Email' backgroundColor='#F2F2F2' fontColor='#C1C2BD' fontSize={25} icon={EnvelopeSimple} iconSize={34} iconColor='#C1C2BD'/> */}
            {/* <TextInput placeholder='Nova Senha' backgroundColor='#F2F2F2' fontColor='#C1C2BD' fontSize={25} icon={Key} iconSize={34} iconColor='#C1C2BD'/> */}
            {/* <TextInput placeholder='Confirme a Senha' backgroundColor='#F2F2F2' fontColor='#C1C2BD' fontSize={25} icon={Key} iconSize={34} iconColor='#C1C2BD'/> */}
            <Button text='Recuperar' backgroundColor='#1F2026' fontColor='#FFF' fontSize={25} eventHandler={Test} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
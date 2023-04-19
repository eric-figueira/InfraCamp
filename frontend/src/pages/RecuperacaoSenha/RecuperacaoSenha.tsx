import React, { useContext, useState } from 'react';

import "./RecuperacaoSenha.css"

import { colorPallete } from "../../styles/colors"
import { Input } from "../../styles/styled-components"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';

import { AuthContext } from '../../contexts/AuthContext';


const RecuperacaoSenha: React.FC = () => {

  const { recoverPassword } = useContext(AuthContext)

  const [email, setEmail] = useState<string>()
  const [senha, setSenha] = useState<string>()
  const [novaSenha, setNovaSenha] = useState<string>()

  function RecoverPassword() {
    try {
    }
    catch {

    }
  }

  return (
    <div className='recover-password-wrapper'>
      <div className="img-container">
        <ImagemRecuperacaoSenha className='senha-img'/>
      </div>
      <div className="info-container">
        <div className="form-wrapper">
          <h1>Recupere sua senha</h1>
          <form>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <EnvelopeSimple />
              </div>
              <input type="text" placeholder='Digite seu email' />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="text" placeholder='Digite uma nova senha' />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="text" placeholder='Confirme sua senha' />
            </Input>
            <Button text='Recuperar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={RecoverPassword} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
import React from 'react';

import "./RecuperacaoSenha.css"

import { colorPallete } from "../../styles/colors"
import { Input } from "./styled"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';


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
            <Button text='Recuperar' backgroundColor='#1F2026' fontColor='#FFF' fontSize={25} eventHandler={Test} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
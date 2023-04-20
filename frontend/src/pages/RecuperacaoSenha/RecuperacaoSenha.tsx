import React, { useContext, useState, MouseEvent } from 'react';

import "./RecuperacaoSenha.css"

import { colorPallete } from "../../styles/colors"
import { Input } from "../../styles/styled-components"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from '../../components/Message/Message';

import { AuthContext } from '../../contexts/AuthContext';


const RecuperacaoSenha: React.FC = () => {

  const { recoverPassword } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [novaSenha, setNovaSenha] = useState<string>("")

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  function showMessage(text: string) {
    setMessageText(text)
    setIsMessageVisible(true)
  }

  function RecoverPassword(event: MouseEvent) {
    event.preventDefault()
    try 
    {
      if (email == "" || senha == "" || novaSenha == "") 
        showMessage('Todos os dados são necessários!')
      else 
      {
        if (senha != novaSenha) 
          showMessage('As senhas não são compatíveis!')
        else 
        {
          console.log('DEU CERTO!')
          setIsMessageVisible(false)
        }
      }
    }
    catch (e: any) { showMessage(e.message) }
  }

  return (
    <div className='recover-password-wrapper'>
      <div className="img-container">
        <ImagemRecuperacaoSenha className='senha-img'/>
      </div>
      <div className="info-container">
        <div className="form-wrapper">
          <h1>Recupere sua senha</h1>
          <Message isVisible={isMessageVisible} text={messageText} type={ ETypes.Warning } />
          <form>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <EnvelopeSimple />
              </div>
              <input type="text" placeholder='Digite seu email' onChange={(event) => setEmail(event.target.value)} />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="text" placeholder='Digite uma nova senha' onChange={(event) => setSenha(event.target.value)} />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="text" placeholder='Confirme sua senha' onChange={(event) => setNovaSenha(event.target.value)} />
            </Input>
            <Button text='Recuperar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={RecoverPassword} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
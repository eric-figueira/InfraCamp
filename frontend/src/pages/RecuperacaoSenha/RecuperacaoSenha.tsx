import React, { useContext, useState, MouseEvent } from 'react';

import "./RecuperacaoSenha.css"

import { colorPallete } from "../../styles/colors"
import { Input } from "../../styles/styled-components"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from '../../components/Message/Message';

import { AuthContext } from '../../contexts/AuthContext';


const cpf_regex: RegExp = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

interface IUser {
  cpf: string,
  novaSenha: string,
  confSenha: string
}


const RecuperacaoSenha: React.FC = () => {

  const { recuperarSenha } = useContext(AuthContext)

  const [user, setUser] = useState<IUser>({ cpf: "", novaSenha: "", confSenha: "" })


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
      if (user.cpf == "" || user.novaSenha == "" || user.confSenha == "") 
        showMessage('Todos os dados são necessários!')
      else 
      {
        if (user.novaSenha != user.confSenha) 
          showMessage('As senhas não são compatíveis!')
        else if (!cpf_regex.test(user.cpf)) 
          showMessage('Padrão de CPF incorreto!')
        else if (user.novaSenha.length < 8)
          showMessage('Senha precisa ter no mínimo 8 caracteres!')
        else
        {
          setIsMessageVisible(false)
          recuperarSenha({ cpf: user.cpf, novaSenha: user.novaSenha })
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
              <input type="text" placeholder='Digite seu CPF' onChange={(event) => setUser({ ...user, cpf: event.target.value })} />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="password" placeholder='Digite uma nova senha' onChange={(event) => setUser({ ...user, novaSenha: event.target.value })} />
            </Input>
            <Input 
              backgroundColor="#FFF"
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
              >
              <div className='icon-container'>
                <Key />
              </div>
              <input type="password" placeholder='Confirme sua senha' onChange={(event) => setUser({ ...user, confSenha: event.target.value })} />
            </Input>
            <Button text='Recuperar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={RecoverPassword} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
import React, { useContext, useState, MouseEvent } from 'react';

import "./Login.css"

import { colorPallete } from '../../styles/colors';
import { Input } from '../../styles/styled-components';

import { ReactComponent as ImagemLogin } from "../../assets/imgs/imgLogin.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from "../../components/Message/Message"

import { AuthContext } from '../../contexts/AuthContext';


const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i


const Login: React.FC = () => {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  function showMessage(text: string) {
    setIsMessageVisible(true)
    setMessageText(text)
  }

  function SignIn(event: MouseEvent) 
  {
    event.preventDefault()
    try 
    {
      if (email == "" || senha == "") 
        showMessage('Todos os dados são necessários!')
      else 
      {
        if (!email_regex.test(email)) 
          showMessage('Padrão de email incorreto!')
        // OBS:  Testar se achou no banco de dados !!!
        else
        {
          console.log('DEU CERTO!')
          setIsMessageVisible(false)
        }
      }
    }
    catch (e: any) { showMessage(e.message) }
  }

  function IDK() {}

  return (
    <div className="login-wrapper">
      <div className="img-container">
        <div className="content">
          <h3>Novo por aqui?</h3>
          <p>Crie sua conta e comece a denunciar</p>
          <Button text='Cadastrar'
            backgroundColor={'transparent'} fontColor={colorPallete.fontWhite}
            fontSize={18} eventHandler={IDK} borderColor={`2px solid ${colorPallete.bgWhite}`} />
        </div>
        <ImagemLogin className='login-img' />
      </div>
      <div className="info-container">
        <div className="form-wrapper">
          <h1>Entrar</h1>
          <Message isVisible={isMessageVisible} text={messageText} type={ETypes.Warning} />
          <form>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <EnvelopeSimple />
              </div>
              <input type='text' placeholder='Digite seu email' onChange={(event) => setEmail(event.target.value)} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Key />
              </div>
              <input type='password' placeholder='Digite sua senha' onChange={(event) => setSenha(event.target.value)} />
            </Input>
            <Button text='Entrar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={18} eventHandler={SignIn} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
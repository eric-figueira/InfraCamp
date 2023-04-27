import React, { useContext, useState, MouseEvent } from 'react';
import { Link } from "react-router-dom"

import "./Login.css"

import { colorPallete } from '../../styles/colors';
import { Input } from '../../styles/styled-components';

import { ReactComponent as ImagemLogin } from "../../assets/imgs/imgLogin.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from "../../components/Message/Message"

import { AuthContext } from '../../contexts/AuthContext';


const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i


interface IUser {
  email: string,
  senha: string
}

const Login: React.FC = () => {

  const { logar } = useContext(AuthContext)

  const [user, setUser] = useState<IUser>({ email: "", senha: "" })

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
      if (user.email == "" || user.senha == "") 
        showMessage('Todos os dados são necessários!')
      else 
      {
        if (!email_regex.test(user.email)) 
          showMessage('Padrão de email incorreto!')
        // OBS:  Testar se achou no banco de dados !!!
        else
        {
          setIsMessageVisible(false)
          logar({ email: user.email, senha: user.senha })
        }
      }
    }
    catch (e: any) { showMessage(e.message) }
  }


  return (
    <div className="login-wrapper">
      <div className="img-container">
        <div className="content">
          <h3>Novo por aqui?</h3>
          <p>Crie sua conta e comece a denunciar</p>
          <Link to="/signup">
            <Button text='Cadastrar'
              backgroundColor={'transparent'} fontColor={colorPallete.fontWhite}
              fontSize={18} eventHandler={() => null} borderColor={`2px solid ${colorPallete.bgWhite}`} />
          </Link>
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
              <input type='text' placeholder='Digite seu email' onChange={(event) => setUser({ ...user, email: event.target.value })} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Key />
              </div>
              <input type='password' placeholder='Digite sua senha' onChange={(event) => setUser({ ...user, senha: event.target.value })} />
            </Input>
            <Link to="/recover-password" className='login-link'>Esqueceu sua senha? Clique aqui!</Link>
            <Button text='Entrar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={18} eventHandler={SignIn} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
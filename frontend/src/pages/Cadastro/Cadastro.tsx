import React, { useState, useContext, MouseEvent } from 'react';
import { Link } from "react-router-dom"

import "./Cadastro.css"

import { colorPallete } from '../../styles/colors';
import { Input } from '../../styles/styled-components';

import { EnvelopeSimple, Key, IdentificationBadge, User, Phone } from 'phosphor-react'
import { ReactComponent as ImagemCadastro } from "../../assets/imgs/imgCadastro.svg"

import Button from '../../components/Button/Button';
import { Message, ETypes } from "../../components/Message/Message"

import { AuthContext } from '../../contexts/AuthContext';


const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i


const Cadastro: React.FC = () => {

  const { signUp } = useContext(AuthContext)

  const [cpf, setCpf] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")
  const [senha, setSenha] = useState<string>("")

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")


  function showMessage(text: string) {
    setIsMessageVisible(true)
    setMessageText(text)
  }

  function SignUp(event: MouseEvent) 
  {
    event.preventDefault()
    try 
    {
      if (cpf == "" || email == "" || username == "" || telefone == "" || senha == "") 
        showMessage('Todos os dados são necessários!')
      else 
      {
        if (!email_regex.test(email)) 
          showMessage('Padrão de email incorreto!')
        else if (senha.length < 8)
          showMessage('Senha precisa ter no mínimo 8 caracteres!')
        // Obs: testar se já não tem no banco de dados!!!
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
    <div className="signup-wrapper">
      <div className="info-container">
        <div className="form-wrapper">
          <h1 className="title">Cadastrar-se</h1>
          <Message isVisible={isMessageVisible} text={messageText} type={ETypes.Warning} />
          <form>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <IdentificationBadge />
              </div>
              <input type='text' placeholder='Digite seu CPF' onChange={(event) => setCpf(event.target.value)} />
            </Input>
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
                <User />
              </div>
              <input type='text' placeholder='Digite seu nome' onChange={(event) => setUsername(event.target.value)} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Phone />
              </div>
              <input type='text' placeholder='Digite seu telefone' onChange={(event) => setTelefone(event.target.value)} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Key />
              </div>
              <input type='text' placeholder='Digite uma senha' onChange={(event) => setSenha(event.target.value)} />
            </Input>
            <Button text='Cadastrar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={18} eventHandler={SignUp} />
          </form>
        </div>
      </div>
      <div className="img-container">
        <div className="content">
          <h3>Já tem uma conta?</h3>
          <p>Entre agora mesmo!</p>
          <Link to="/">
            <Button text='Entrar'
              backgroundColor={'transparent'} fontColor={colorPallete.fontWhite}
              fontSize={18} eventHandler={() => null} borderColor={`2px solid ${colorPallete.bgWhite}`} />
          </Link>
        </div>
        <ImagemCadastro className='signup-img'/>
      </div>
    </div>
  );
}

export default Cadastro;
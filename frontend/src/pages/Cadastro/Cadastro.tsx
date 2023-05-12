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

import { IMaskInput } from 'react-imask';
import { MaskedRange } from "imask";


const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

interface IUser {
  cpf: string,
  email: string,
  nome: string,
  telefone: string,
  senha: string
}


const Cadastro: React.FC = () => {

  const { Cadastrar } = useContext(AuthContext)

  const [user, setUser] = useState<IUser>({ cpf: "", email: "", nome: "", telefone: "", senha: "" });

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  function showMessage(text: string) {
    setIsMessageVisible(true)
    setMessageText(text)
  }

  function SignUp(event: MouseEvent) {
    event.preventDefault()
    try {
      if (user.cpf === "" || user.email === "" || user.nome === "" || user.telefone === "" || user.senha === "")
        showMessage('Todos os dados são necessários!')
      else {
        if (!email_regex.test(user.email))
          showMessage('Padrão de email incorreto!')
        else if (user.senha.length < 8)
          showMessage('Senha precisa ter no mínimo 8 caracteres!')
        // Obs: testar se já não tem no banco de dados!!!
        else {
          setIsMessageVisible(false)
          Cadastrar({ cpf: user.cpf, email: user.email, nome: user.nome, senha: user.senha, telefone: user.telefone })
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
              <IMaskInput
                mask="NNN.NNN.NNN-NN"
                blocks={{
                  N: {
                    mask: MaskedRange,
                    from: 0,
                    to: 9,
                    maxLength: 1
                  }
                }}
                type='text' placeholder='Digite seu CPF' onChange={(event) => setUser({ ...user, cpf: (event.target as HTMLInputElement).value })}
              />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <EnvelopeSimple />
              </div>
              <input type='email' placeholder='Digite seu email' onChange={(event) => setUser({ ...user, email: event.target.value })} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <User />
              </div>
              <input type='text' placeholder='Digite seu nome' onChange={(event) => setUser({ ...user, nome: event.target.value })} />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Phone />
              </div>
              <IMaskInput
                mask="(NN) NNNNN-NNNN"
                blocks={{
                  N: {
                    mask: MaskedRange,
                    from: 0,
                    to: 9,
                    maxLength: 1
                  }
                }}
                type='tel' placeholder='Digite seu telefone' onChange={(event) => setUser({ ...user, telefone: (event.target as HTMLInputElement).value })}
              />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Key />
              </div>
              <input type='password' placeholder='Digite uma senha' onChange={(event) => setUser({ ...user, senha: event.target.value })} />
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
        <ImagemCadastro className='signup-img' />
      </div>
    </div>
  );
}

export default Cadastro;
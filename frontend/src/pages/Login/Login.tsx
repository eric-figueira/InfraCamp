import React, { useContext, useState, MouseEvent } from 'react';
import { Link } from "react-router-dom"

import { IMaskInput } from "react-imask";
import { MaskedRange } from "imask";

import "./Login.css"

import { colorPallete } from '../../styles/colors';
import { Input } from '../../styles/styled-components';

import { ReactComponent as ImagemLogin } from "../../assets/imgs/imgLogin.svg"
import { IdentificationCard, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { Message, ETypes } from "../../components/Message/Message"

import { AuthContext } from '../../contexts/AuthContext';


const cpf_regex: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/


interface IUser {
  cpf: string,
  senha: string
}

const Login: React.FC = () => {

  const { Logar } = useContext(AuthContext);

  const [user, setUser] = useState<IUser>({ cpf: "", senha: "" });

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function showMessage(text: string) {
    setIsMessageVisible(true)
    setMessageText(text)
  }

  async function SignIn(event: MouseEvent) {
    event.preventDefault()
    try {
      if (user.cpf === "" || user.senha === "")
        showMessage('Todos os dados são necessários!')
      else {
        if (!cpf_regex.test(user.cpf))
          showMessage('Padrão de CPF incorreto!')
        else {
          setIsLoading(true);
          if (await Logar({ cpf: user.cpf, senha: user.senha }) === false) {
            setIsLoading(false);
            showMessage('Dados incorretos!');
          }
          else {
            setIsLoading(false);
            setIsMessageVisible(false);
          }
        }
      }
    }
    catch (e: any) { showMessage(e.message) }
  }


  return (
    <div className="login-wrapper">
      <Loader isActive={isLoading} setIsActive={setIsLoading} />
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
                <IdentificationCard />
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
                <Key />
              </div>
              <input type='password' placeholder='Digite sua senha' onChange={(event) => setUser({ ...user, senha: event.target.value })} />
            </Input>
            <Link to="/email" className='login-link'>Esqueceu sua senha? Clique aqui!</Link>
            <Button text='Entrar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={18} eventHandler={SignIn} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
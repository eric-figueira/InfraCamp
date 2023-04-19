import React, { useContext} from 'react';

import "./Login.css"

import { colorPallete } from '../../styles/colors';
import { Input } from '../../styles/styled-components';

import { ReactComponent as ImagemLogin } from "../../assets/imgs/imgLogin.svg"
import { EnvelopeSimple, Key } from 'phosphor-react'

import Button from '../../components/Button/Button';

import { AuthContext } from '../../contexts/AuthContext';

const Login: React.FC = () => {

  const { signIn } = useContext(AuthContext)

  function Test() { }

  return (
    <div className="login-wrapper">
      <div className="img-container">
        <div className="content">
          <h3>Novo por aqui?</h3>
          <p>Crie sua conta e comece a denunciar</p>
          <Button text='Cadastrar'
            backgroundColor={'transparent'} fontColor={colorPallete.fontWhite}
            fontSize={18} eventHandler={Test} borderColor={`2px solid ${colorPallete.bgWhite}`} />
        </div>
        <ImagemLogin className='login-img' />
      </div>
      <div className="info-container">
        <div className="form-wrapper">
          <h1>Entrar</h1>
          <form>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <EnvelopeSimple />
              </div>
              <input type='text' placeholder='Digite seu email' />
            </Input>
            <Input
              backgroundColor='#FFF'
              placeholderColor={colorPallete.fontGray}
              fontColor={colorPallete.fontBlack}
            >
              <div className='icon-container'>
                <Key />
              </div>
              <input type='text' placeholder='Digite sua senha' />
            </Input>
            <Button text='Entrar' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={18} eventHandler={Test} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
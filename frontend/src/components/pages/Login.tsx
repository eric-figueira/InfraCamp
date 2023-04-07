import React from 'react';

import { EnvelopeSimple, Key } from 'phosphor-react'
import { ReactComponent as ImagemLogin } from "../../assets/imgs/imgLogin.svg"

import "./Login.css"

const Login: React.FC = () => {

  function Test() {}

  return (
    <div>
      <div className="container">
        <div className="forms-container">
          <div className="signin">
            <form action="#" className="sign-in-form">
              <h2 className="title">Entrar</h2>
              <div className="input-field">
                <EnvelopeSimple size={32} weight="fill" />
                <input type="text" placeholder="Usuário" />
              </div>
              <div className="input-field">
                <Key size={32} weight="fill"/>
                <input type="password" placeholder="Senha" />
              </div>
              <input type="submit" defaultValue="Entrar" className="btn solid" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Novo por aqui?</h3>
              <p>Crie sua conta e comece a denunciar</p>
              <button className="btn transparent" id="sign-up-btn">
                Cadastrar-se
              </button>
            </div>
            <ImagemLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
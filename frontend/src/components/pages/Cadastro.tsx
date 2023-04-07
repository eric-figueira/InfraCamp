import React from 'react';

import { EnvelopeSimple, Key } from 'phosphor-react'

import { ReactComponent as ImagemCadastro } from "../../assets/imgs/imgCadastro.svg"

import "./Cadastro.css"

const Cadastro: React.FC = () => {
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signup">
          <form action="#" className="sign-up-form">
            <h2 className="title">Cadastrar-se</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input type="text" placeholder="Usuário" />
            </div>
            <div className="input-field">
              <EnvelopeSimple />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Senha" />
            </div>
            <input type="submit" className="btn" defaultValue="Criar" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel right-panel">
          <div className="content">
            <h3>Um de nós?</h3>
            <p>Popopo volte a marcar sla oq de buraco n sei onde</p>
            <button className="btn transparent" id="sign-in-btn">
              Entrar
            </button>
          </div>
          <ImagemCadastro />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
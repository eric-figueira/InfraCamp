import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

import Cookies from "universal-cookie"


interface IProps {
  children? : ReactNode
}

interface ISignIn {
  email: string,
  senha: string
}

interface IRecoverPassword {
  email: string,
  novaSenha: string
}

interface ISignUp {
  nome: string,
  email: string,
  senha: string,
  telefone: string,
  cpf: string
}

interface IUser {
  nome: string,
  email: string,
  avatar_url: string,
  cpf: string
}

interface AuthContextType {
  isAuthenticated: boolean,
  user: IUser | null,
  signIn: (data: ISignIn) => Promise<void>,
  signUp: (data: ISignUp) => Promise<void>,
  recoverPassword: (data: IRecoverPassword) => Promise<void>,
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  const cookie = new Cookies();

  const [user, setUser] = useState<IUser | null>(null);

  // Se usuário não existe, não está autenticado
  const isAuthenticated = true;

  // Quando for carregado, verificará se já existe cookies salvos
  useEffect(() => {

    let token = cookie.get('_infracamp_auth_token');

    if (token) {
      // recoverUserInformation(token).then(setUser(response.user))
    }

  }, [])

  async function signUp(data: ISignUp) {

  }

  async function signIn({ email, senha }: ISignIn) {
    // Chama a api passando os dados e recebe o token JWT
    api.post("/api/auth/token", {
      email: email,
      senha: senha
    }).then((resp) => {
      // Seta o token como cookie
      console.log(resp)
    })

    // Retornamos informações do usuário
  }

  async function recoverPassword({ email, novaSenha }: IRecoverPassword) {

  }

  async function logOut() {
    // Precisamos limpar os cookies
    cookie.remove('_infracamp_auth_token')
  }

  // Criamos todo um componente AuthProvider, pois precisamos passar os valores em 'value' 
  // que os elementos de dentro terão acesso, se colocassemos o codigo abaixo em App, nao 
  // conseguiriamos ter esses values, pois App nao é responsavel por pegar essas informacoes
  // value={{ isAuthenticated: isAuthenticated, user, signIn, signUp, recoverPassword, logOut }}
  return (
    <AuthContext.Provider 
      value={{ 
          isAuthenticated: isAuthenticated, 
          user: user, 
          signIn: signIn, 
          signUp: signUp, 
          recoverPassword: recoverPassword, 
          logOut: logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

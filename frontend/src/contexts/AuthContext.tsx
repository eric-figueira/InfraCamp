import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

import Cookies from "universal-cookie";

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

  async function getToken(email: string, senha: string) {
    // Chama a api passando os dados e recebe o token JWT
    api.post("/api/auth/getToken", {
      email: email,
      senha: senha
    }).then((resp) => {
      // Seta o token como cookie
      return resp.data
    })
  }

  async function getUserData(token: string) {

  }

  async function signUp(data: ISignUp) {
    // Chama a api passando os dados e recebe o token JWT
    api.post("/api/auth/token", {

    }).then((resp) => {
      // Seta o token como cookie
      console.log(resp)
    })

    // Retornamos informações do usuário
  }

  async function signIn({ email, senha }: ISignIn) {
    const token = getToken(email, senha)
    // Retornamos informações do usuário

    const proxMes = new Date();
    proxMes.setMonth(new Date().getMonth() + 1);

    cookie.set('_infracamp_auth_token', token, { expires: proxMes })
  }

  async function recoverPassword({ email, novaSenha }: IRecoverPassword) {

  }

  async function logOut() {
    // Precisamos limpar os cookies
    cookie.remove('_infracamp_auth_token')
    // Com esse set, fazemos com que os componentes recarreguem e o usuário, caso esteja em uma
    // rota privada, será redirecionado para login
    setUser(null)
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

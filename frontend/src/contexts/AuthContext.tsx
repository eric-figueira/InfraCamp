import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate, Link} from "react-router-dom";

import { api } from "../services/api";

import Cookies from "universal-cookie";

interface IProps {
  children? : ReactNode
}

interface ISignIn {
  cpf: string,
  senha: string
}

interface IRecoverPassword {
  cpf: string,
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
  telefone: string,
  funcionario: boolean,
  cpf: string
}

interface AuthContextType {
  isAuthenticated: boolean,
  user: IUser | null,
  logar: (data: ISignIn) => Promise<void>,
  cadastrar: (data: ISignUp) => Promise<void>,
  recuperarSenha: (data: IRecoverPassword) => Promise<void>,
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  const cookie = new Cookies();

  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Quando for carregado, verificará se já existe cookies salvos
  useEffect(() => {

    let token = cookie.get('_infracamp_auth_token');

    if (token) 
    {
      api.post(`/api/auth/validateToken&returnData?token=${token}`).then((resp) => {
          setIsAuthenticated(resp.data.isTokenValid)

          if (resp.data.isTokenValid && window.location.pathname !== '/map') window.location.href = '/map'

          // Seta o user para o que recebeu
          //setUser(resp.data.user)
      })
    }
    else if (window.location.pathname !== '/') window.location.href = '/'
  }, [])

  function setCookie(token: string) {
    const proxMes = new Date();
    proxMes.setMonth(new Date().getMonth() + 1);

    cookie.set('_infracamp_auth_token', token, { expires: proxMes })
  }

  async function Cadastrar(data: ISignUp) {
    // Chama a api passando os dados e recebe o token JWT e os dados do usuário
    api.post('/api/auth/cadastrar&returnTokenData', {
      // cpf: 
    }).then((resp) => {
      // Seta o token como cookie
      console.log(resp.data)
      // ?
      //setCookie(resp.data.token)
      //setUser(resp.data.user)
    })

    // Retornamos informações do usuário
  }


  async function Logar({ cpf, senha }: ISignIn) 
  {
    try 
    {
      const resp = await api.post(`/api/auth/logar&returnTokenData?CPF=${cpf}&Senha=${senha}`)
    
      // Se teve uma resposta, pois pode ter passados dados inválidos
      if (resp) 
      {
        console.log(resp.data)

        // Seta o token como cookie
        setCookie(resp.data.token)

        const user: IUser = resp.data.user

        setUser(user)
        setIsAuthenticated(true)

        window.location.href = '/map'
      }
    }
    catch (error) { console.log(error); }
  }

  async function recoverPassword({ cpf, novaSenha }: IRecoverPassword) {
    api.post(`/api/auth/recuperarSenha&returnTokenData?CPF=${cpf}&Senha=${novaSenha}`).then((resp) => {
      // Seta o token como cookie
      console.log(resp.data)
      // ?
      //setCookie(resp.data.token)
      //setUser(resp.data.user)
      //window.location.href="/map"
    })
  }

  async function logOut() {
    // Precisamos limpar os cookies
    cookie.remove('_infracamp_auth_token')

    // Com esse set, fazemos com que os componentes recarreguem e o usuário, caso esteja em uma
    // rota privada, será redirecionado para login
    setUser(null)
    setIsAuthenticated(false)

    // se não der certo, colocar window.... = '/'
  }

  // Criamos todo um componente AuthProvider, pois precisamos passar os valores em 'value' 
  // que os elementos de dentro terão acesso, se colocassemos o codigo abaixo em App, nao 
  // conseguiriamos ter esses values, pois App nao é responsavel por pegar essas informacoes
  // value={{ isAuthenticated: isAuthenticated, user, signIn, signUp, recoverPassword, logOut }}
  return (
    <AuthContext.Provider 
      value={{ 
          isAuthenticated, 
          user: user, 
          logar: Logar, 
          cadastrar: Cadastrar, 
          recuperarSenha: recoverPassword, 
          logOut: logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

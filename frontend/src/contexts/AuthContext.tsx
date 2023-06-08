import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";

interface IProps {
  children?: ReactNode
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

export interface IUser {
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
  token: string | null,
  email: string | null,
  Logar: (data: ISignIn) => Promise<boolean>,
  Cadastrar: (data: ISignUp) => Promise<boolean>,
  RecuperarSenha: (data: IRecoverPassword) => Promise<boolean>,
  GerarTokenPassword: (email: string) => Promise<boolean>,
  LogOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = new Cookies();

  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);


  // Quando for carregado, verificará se já existe cookies salvos
  useEffect(() => {

    let token = cookie.get('_infracamp_auth_token');

    if (token) {
      api.post(`api/auth/validateToken&returnData?token=${token}`).then((resp) => {
        setIsAuthenticated(resp.data.isTokenValid)

        // Seta o user para o que recebeu
        setUser(resp.data.user)
      })
    }
    else if (window.location.pathname !== '/') window.location.href = '/'

    let t = cookie.get('_infracamp_reset_token');

    if (t) {
      api.post(`api/auth/validateToken&returnData?token=` + t).then(({ data }) => {
        if (data.isTokenValid) {
          setEmail(data.user.email);
          setToken(t);
        }
      });
    }
  }, [cookie])

  function setCookie(token: string, title: string) {
    const proxMes = new Date();
    proxMes.setMonth(new Date().getMonth() + 1);

    cookie.set(title, token, { expires: proxMes })
  }

  function authenticateUser(resp: AxiosResponse) {
    console.log(resp.data)

    // Seta o token como cookie
    setCookie(resp.data.token, '_infracamp_auth_token')

    const user: IUser = resp.data.user

    setUser(user)
    setIsAuthenticated(true)

    window.location.href = '/map'
  }

  async function Cadastrar({ nome, email, telefone, senha, cpf }: ISignUp) {
    try {
      const resp = await api.post(`api/auth/cadastrar&returnTokenData?CPF=${cpf}&Email=${email}&Nome=${nome}&Telefone=${telefone}&Senha=${senha}`, {
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
      })

      // Se teve uma resposta, pois pode ter passados dados inválidos
      if (resp) {
        authenticateUser(resp);
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function Logar({ cpf, senha }: ISignIn) {
    try {
      const resp = await api.post(`api/auth/logar&returnTokenData?CPF=${cpf}&Senha=${senha}`)

      // Se teve uma resposta, pois pode ter passados dados inválidos
      if (resp) {
        authenticateUser(resp);
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function RecuperarSenha({ cpf, novaSenha }: IRecoverPassword) {
    try {
      const resp = await api.post(`api/auth/recuperarSenha&returnTokenData?CPF=${cpf}&NovaSenha=${novaSenha}`)

      // Se teve uma resposta, pois pode ter passados dados inválidos
      if (resp) {
        authenticateUser(resp);
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function GerarTokenPassword(email: string) {
    try {
      const resp = await api.post('api/auth/setResetPasswordToken?email=' + email);

      if (resp.data.token) {
        setCookie(resp.data.token, '_infracamp_reset_token');
        setToken(resp.data.token);
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function LogOut() {
    // Precisamos limpar os cookies
    cookie.remove('_infracamp_auth_token')

    // Com esse set, fazemos com que os componentes recarreguem e o usuário, caso esteja em uma
    // rota privada, será redirecionado para login
    setUser(null)
    setIsAuthenticated(false)

    window.location.href = '/'
  }

  // Criamos todo um componente AuthProvider, pois precisamos passar os valores em 'value' 
  // que os elementos de dentro terão acesso, se colocassemos o codigo abaixo em App, nao 
  // conseguiriamos ter esses values, pois App nao é responsavel por pegar essas informacoes
  // value={{ isAuthenticated: isAuthenticated, user, signIn, signUp, recoverPassword, logOut }}
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        email,
        Logar,
        Cadastrar,
        RecuperarSenha,
        GerarTokenPassword,
        LogOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

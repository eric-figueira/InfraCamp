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
  resetToken: string | null,
  resetEmail: string | null,
  signupToken: string | null,
  signupEmail: string | null,
  Logar: (data: ISignIn) => Promise<boolean>,
  Cadastrar: (data: ISignUp) => Promise<boolean>,
  RecuperarSenha: (data: IRecoverPassword) => Promise<boolean>,
  GerarTokenSignup: (email: string) => Promise<boolean>,
  GerarTokenResetPassword: (email: string) => Promise<boolean>,
  LogOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authCookie = new Cookies();
  const resetCookie = new Cookies();
  const signupCookie = new Cookies();

  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [resetToken, setResetToken] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState<string | null>(null);

  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [signupEmail, setSignupEmail] = useState<string | null>(null);


  // Quando for carregado, verificará se já existe cookies salvos
  useEffect(() => {
    let authToken = authCookie.get('_infracamp_auth_token');
    alert("auth" + authToken);

    if (authToken) {
      api.post(`api/auth/validateToken&returnData?token=${authToken}`).then((resp) => {
        setIsAuthenticated(resp.data.isTokenValid)

        // Seta o user para o que recebeu
        setUser(resp.data.user)
      })
    }
  }, [])

  useEffect(() => {
    let resetToken = resetCookie.get('_infracamp_reset_token')
    alert("reset" + resetToken)

    if (resetToken) {
      api.post(`api/auth/validateTokenEmail&returnData?token=${resetToken}`).then((resp) => {
        if (resp.data.isTokenValid) {
          setResetToken(resp.data.token);
          setResetEmail(resp.data.email);
        }
      })
    }
  }, [])

  useEffect(() => {
    let signupToken = signupCookie.get('_infracamp_signup_token')
    alert("signup" + signupToken)

    if (signupToken) {
      api.post(`api/auth/validateTokenEmail&returnData?token=${signupToken}`).then((resp) => {
        if (resp.data.isTokenValid) {
          setSignupToken(resp.data.token);
          setSignupEmail(resp.data.email);
        }
      })
    }
  }, [])

  function setCookie(cookie: Cookies, token: string, title: string, time: Date) {
    cookie.set(title, token, { expires: time })
  }

  function authenticateUser(resp: AxiosResponse) {
    console.log(resp.data)

    const proxMes = new Date();
    proxMes.setMonth(new Date().getMonth() + 1);
    // Seta o token como cookie
    setCookie(authCookie, resp.data.token, '_infracamp_auth_token', proxMes)

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
        signupCookie.remove("_infracamp_signup_token");
        setSignupToken(null);
        setSignupEmail(null);
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
        resetCookie.remove("_infracamp_reset_token");
        setResetToken(null);
        setResetEmail(null);
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
      if (resp.data.user && resp.data.token) {
        resetCookie.remove("_infracamp_reset_token");
        setResetToken(null);
        setResetEmail(null);

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

  async function GerarTokenResetPassword(email: string) {
    try {
      const resp = await api.post(`api/auth/gerarTokenResetPassword?email=${email}`);

      if (resp.data.token && resp.data.email) {
        const amanha = new Date();
        amanha.setDate(new Date().getDay() + 1);

        setCookie(resetCookie, resp.data.token, '_infracamp_reset_token', amanha);
        setResetToken(resp.data.token);
        setResetEmail(resp.data.email);

        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function GerarTokenSignup(email: string) {
    try {
      const resp = await api.post(`api/auth/gerarTokenSignup?email=${email}`)

      if (resp.data.token && resp.data.email) {
        const amanha = new Date();
        amanha.setDate(new Date().getDay() + 1);

        setCookie(signupCookie, resp.data.token, '_infracamp_signup_token', amanha);
        setSignupToken(resp.data.token);
        setSignupEmail(resp.data.email);
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
    authCookie.remove('_infracamp_auth_token')

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
        resetToken,
        resetEmail,
        signupToken,
        signupEmail,
        Logar,
        Cadastrar,
        RecuperarSenha,
        GerarTokenSignup,
        GerarTokenResetPassword,
        LogOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

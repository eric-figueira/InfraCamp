import { createContext, ReactNode, useEffect, useState } from "react";


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
  senha: string
}

interface IUser {
  nome: string,
  email: string,
  senha: string,
  avatar_url: string
}

interface AuthContextType {
  isAuthenticated: boolean,
  user: IUser,
  signUp: (data: ISignUp) => Promise<void>,
  signIn: (data: ISignIn) => Promise<void>,
  recoverPassword: (data: IRecoverPassword) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null);

  // Se usuário não existe, não está autenticado
  const isAuthenticated = !!null;

  // Quando for carregado, verificará se já existe cookies salvos
  useEffect(() => {

  }, [])

  async function signUp(data: ISignUp) {

  }

  async function signIn({ email, senha }: ISignIn) {
    // Chama a api passando os dados e recebe o token JWT

    // Seta o token como cookie

    // Retornamos informações do usuário
  }

  async function recoverPassword({ email, novaSenha }: IRecoverPassword) {

  }

  // Criamos todo um componente AuthProvider, pois precisamos passar os valores em 'value' 
  // que os elementos de dentro terão acesso, se colocassemos o codigo abaixo em App, nao 
  // conseguiriamos ter esses values, pois App nao é responsavel por pegar essas informacoes
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signUp, signIn, recoverPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

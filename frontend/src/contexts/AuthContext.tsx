import { createContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType)

interface IProps {
  children? : ReactNode
}

interface SignInData {
  email: string,
  senha: string
}

interface SignUpData {
  nome: string,
  email: string,
  senha: string
}

interface RecoverPasswordData {
  email: string,
  novaSenha: string
}


export const AuthProvider: React.FC<IProps> = ({ children }) => {

  const isAuthenticated = false;


  useEffect(() => {
    // Quando esse componente for carregado, testar se existe um cookie salvo, se existir
    // busco as informações do usuário no banco de dados
  }, [])


  async function signUp() {

  }

  async function signIn({ email, senha }) {
    // Chama a api passando os dados e recebe o token JWT

    // Seta o token como cookie

    // Retornamos informações do usuário
  }

  // Criamos todo um componente AuthProvider, pois precisamos passar os valores em 'value' que os elementos de dentro terão acesso,
  // se colocassemos o codigo abaixo em App, nao conseguiriamos ter esses values, pois App nao é responsavel por pegar essas
  // informacoes
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

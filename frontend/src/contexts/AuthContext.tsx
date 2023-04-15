import { createContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType)

interface IProps {
  children? : ReactNode
}

export const AuthProvider: React.FC<IProps> = (props) => {

  const isAuthenticated = false;

  async function signIn() {
    // Chama a api passando os dados e recebe o token JWT
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

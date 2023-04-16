import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/globalStyles.css'

import Navbar from './components/Navbar/Navbar';

import Routes from './AppRoutes';

import { AuthProvider, AuthContext, AuthContextType } from './contexts/AuthContext';

function App() {

  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {isAuthenticated ? <Navbar /> : null}
          <Routes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/globalStyles.css'

import Routes from './AppRoutes';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return ( 
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

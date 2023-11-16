import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import AuthProvider from './App/Context/AuthContext';

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </React.StrictMode>
)
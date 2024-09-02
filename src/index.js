import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Cria a raiz da aplicação e renderiza o componente principal
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
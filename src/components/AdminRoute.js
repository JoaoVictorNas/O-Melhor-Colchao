import React from "react";
import { Route, Navigate } from "react-router-dom";

// Verifica se o usuário está autenticado através do token no localStorage
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

// Rota protegida que redireciona para a página inicial se o usuário não estiver autenticado
const AdminRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
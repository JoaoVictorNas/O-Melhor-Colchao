import React from 'react';
import { Navigate } from 'react-router-dom';

// Rota protegida que verifica se o usuário está autenticado
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");

    // Redireciona para a página de login se o token não estiver presente
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Renderiza o conteúdo protegido se o usuário estiver autenticado
    return children;
};

export default ProtectedRoute;
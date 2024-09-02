import React from 'react';
import './AdminHeader.css';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o token de autenticação do localStorage
        localStorage.removeItem("authToken");
        // Redireciona para a página de login
        navigate("/login");
    };

    return (
        <header className="admin-header">
            <h1 className="admin-title">Admin Dashboard</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </header>
    );
};

export default AdminHeader;
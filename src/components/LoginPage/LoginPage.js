import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Manipula o envio do formulário de login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envia os dados de login para o servidor
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            if (response.data.success) {
                // Armazena o token de autenticação e navega para a página de administração
                localStorage.setItem('authToken', response.data.token);
                navigate('/admin');
            } else {
                setError('Usuário ou senha incorretos');
            }
        } catch (err) {
            setError('Erro ao tentar fazer login');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
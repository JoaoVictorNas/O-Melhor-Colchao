import React, { useEffect, useState } from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Função para rolar suavemente até a seção alvo, com navegação condicional
    const handleScroll = (event, targetId, path = '/') => {
        event.preventDefault();

        // Navega até o caminho se estiver em outra página e depois rola até a seção
        if (window.location.pathname !== path) {
            navigate(path, { replace: true });
            setTimeout(() => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Pequeno atraso para garantir o carregamento do conteúdo
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://bfbaby.com.br/up/logo.png" alt="Melhor Colchão Logo" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li>
                            <a href="/" onClick={(e) => handleScroll(e, 'compare', '/')}>Ranking</a>
                        </li>
                        <li>
                            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                        </li>
                        <li>
                            <a href="/" onClick={(e) => handleScroll(e, 'faq', '/')}>Perguntas Frequentes</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-description">
                    <p>
                        O Melhor Colchão foi criado para destacar a importância e os benefícios de investir em um colchão de qualidade certificada. Nosso compromisso é ajudar você a encontrar o colchão ideal para o seu biotipo e preferências de conforto, sempre garantindo o melhor custo-benefício.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
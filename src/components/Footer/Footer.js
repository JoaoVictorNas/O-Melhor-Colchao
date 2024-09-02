import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://bfbaby.com.br/up/logo.png" alt="Melhor Colchão Logo" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="/ranking">Ranking</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/faq">Perguntas frequentes</a></li>
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
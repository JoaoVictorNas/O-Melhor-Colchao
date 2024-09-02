import React, { useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Componente ScrollToTop para garantir que a página role para o topo ao mudar de rota
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Header() {
  const navigate = useNavigate();

  // Função para rolar suavemente até a seção alvo
  const handleScroll = (event, targetId, path = '/') => {
    event.preventDefault();

    if (window.location.pathname !== path) {
      navigate(path, { replace: true });
    }

    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <ScrollToTop />
      <header className="header">
        <a href="/" >
          <img 
            src='https://bfbaby.com.br/up/logo.png'
            alt='Logo O Melhor Colchão'
            className="logo-text"
          />
        </a>
        <nav className="nav-links">
          <a href="/" onClick={(e) => handleScroll(e, 'Compare', '/')}>Ranking</a>
          <Link to='/blog'>Blog</Link>
          <a href="/" onClick={(e) => handleScroll(e, 'faq', '/')}>Perguntas Frequentes</a>
        </nav>
      </header>
    </>
  );
}

export default Header;
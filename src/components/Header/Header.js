import React, { useEffect, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o menu hambúrguer
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

    // Fecha o menu após o clique em uma opção
    setMenuOpen(false);
  };

  return (
    <>
      <ScrollToTop />
      <header className="header">
        <a href="/">
          <img
            src="https://bfbaby.com.br/up/logo.png"
            alt="Logo O Melhor Colchão"
            className="logo-text"
          />
        </a>
        {/* Ícone do menu hambúrguer */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Links de navegação, visíveis apenas se menuOpen for true em telas menores */}
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="/" onClick={(e) => handleScroll(e, 'compare', '/')}>Ranking</a>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <a href="/" onClick={(e) => handleScroll(e, 'faq', '/')}>Perguntas Frequentes</a>
        </nav>
      </header>
    </>
  );
}

export default Header;
import React from 'react';
import './TitleSection.css';

// Componente da seção de título
function TitleSection() {
  // Rola suavemente até a seção alvo
  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="title-section">
      <h1 className="main-title">Para o seu melhor sono</h1>
      <p className="sub-title">
        Um guia completo para escolher o melhor colchão
      </p>
      <p className='sub-sub-title'>
        Queremos te ajudar a encontrar o colchão perfeito, com qualidade,<br/>
        preço justo e o conforto que suas noites merecem.
      </p>
      <a href="/" className='cta-button' onClick={(e) => handleScroll(e, 'compare', '/')}>Encontre o Melhor Colchão</a>
    </div>
  );
}

export default TitleSection;
import React, { useState, useEffect } from 'react';
import './CriteriaSection.css';
import dataCache from '../../dataCache';

function CriteriaSection() {
  const [criterios, setCriterios] = useState([]);

  // Carrega os dados de critMarca do dataCache
  useEffect(() => {
    const checkDataLoaded = () => {
      if (dataCache.critMarca && dataCache.critMarca.length > 0) {
        setCriterios(dataCache.critMarca); // Armazena os dados no estado criterios
      } else {
        setTimeout(checkDataLoaded, 500); // Verifica novamente após 500ms
      }
    };

    checkDataLoaded();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div className="criteria-section">
      <h2 className="info-text">Critérios para seleção das marcas</h2>
      <p className='subinfo'>Confira os parâmetros para nossa lista das melhores marcas de colchões</p>
      <div className="criteria-list">
        {criterios.map(criterio => (
          <div className="criteria-item" key={criterio.id}>
            <h3 className="criteria-title">
              <img 
                src="https://bfbaby.com.br/up/icon-criterio.png" 
                alt="Ícone critério" 
                className="criteria-icon" 
              />
              {criterio.titulo}
            </h3>
            <p className="criteria-description">
              {criterio.descricao}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CriteriaSection;
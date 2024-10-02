import React, { useState, useEffect } from 'react';
import './CriteriaSection.css';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

function CriteriaSection() {
  const [criterios, setCriterios] = useState([]);

  // Verifica se os dados de critMarca já foram carregados no dataCache
  useEffect(() => {
    const checkDataLoaded = () => {
      if (dataCache.critMarca && dataCache.critMarca.length > 0) {
        console.log("Dados de critMarca encontrados:", dataCache.critMarca);
        setCriterios(dataCache.critMarca); // Armazena os dados no estado criterios
      } else {
        console.log("Aguardando dados de critMarca serem carregados...");
        setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
      }
    };

    checkDataLoaded(); // Chama a função para verificar os dados
  }, []); // Esse useEffect será executado apenas uma vez ao montar o componente

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

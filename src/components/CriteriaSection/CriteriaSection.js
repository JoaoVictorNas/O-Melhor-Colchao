import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CriteriaSection.css';

function CriteriaSection() {
  const [criterios, setCriterios] = useState([]);

  // Busca os critérios ao carregar o componente
  useEffect(() => {
    axios.get('https://omelhorcolchao.com.br/api.php?path=critMarca')
      .then(response => {
        setCriterios(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os critérios:", error);
      });
  }, []);

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
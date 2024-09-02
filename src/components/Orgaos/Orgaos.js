import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orgaos.css';

function Reguladores() {
    const [orgaos, setOrgaos] = useState([]);

    // Requisição dos dados dos órgãos reguladores ao carregar o componente
    useEffect(() => {
        axios.get('http://localhost:3001/api/orgaos')
            .then(response => {
                setOrgaos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar órgãos reguladores:", error);
            });
    }, []);

    return (
        <div className='reguladores-section'>
            <h2 className="reguladores-info-text">Órgãos reguladores</h2>
            <p className='reguladores-subinfo'>Conheça os órgãos que certificam o mercado de colchões</p>
            <div className='reguladores-list'>
                {orgaos.map(orgao => (
                    <div className='reguladores-item' key={orgao.id}>
                        <h3 className='reguladores-title'>
                            <img 
                                src={`https://bfbaby.com.br/up/orgao-${orgao.id}.png`} 
                                alt={`Ícone ${orgao.title}`} 
                                className="reguladores-icon" 
                            />
                            {orgao.title}
                        </h3>
                        <p className='reguladores-description' id='Compare'>
                            {orgao.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reguladores;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desconto.css';

function Desconto() {
    const [descontoData, setDescontoData] = useState({ description: '', botao: '' });

    // Requisição dos dados do desconto ao carregar o componente
    useEffect(() => {
        axios.get('http://localhost:3001/api/desconto')
            .then(response => {
                setDescontoData(response.data[0]);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do desconto:", error);
            });
    }, []);

    return (
        <div className="simple-section" style={{ backgroundImage: `url(${descontoData.image})` }}>
            <div className="content">
                <h1 className="texto-desconto">
                    {descontoData.description}
                </h1>
                <button className="button">{descontoData.botao}</button>
            </div>
        </div>
    );
}

export default Desconto;
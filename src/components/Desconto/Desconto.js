import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desconto.css';

function Desconto() {
    const [descontoData, setDescontoData] = useState({
        description: '',
        botao: '',
        image: ''
    });

    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.simple-section');
            if (section && isElementVisible(section)) {
                const animatedElements = document.querySelectorAll('.animate');
                animatedElements.forEach(el => {
                    el.classList.add('animate-visible');
                });
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Requisição dos dados de desconto da API
    useEffect(() => {
        axios.get('http://localhost:3003/api/desconto')
            .then(response => {
                const data = response.data[0];
                setDescontoData({
                    description: data.descricao,
                    botao: data.botao_Texto,
                    image: data.url_Imagem
                });
            })
            .catch(error => {
                console.error("Erro ao buscar dados de desconto:", error);
            });
    }, []);

    return (
        <div className="simple-section animate" style={{ backgroundImage: `url(${descontoData.image})` }}>
            <div className="content">
                <h1 className="texto-desconto animate">
                    {descontoData.description}
                </h1>
                <button className="button animate">{descontoData.botao}</button>
            </div>
        </div>
    );
}

export default Desconto;
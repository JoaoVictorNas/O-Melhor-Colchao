import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desconto.css';

function Desconto() {
    const [descontoData, setDescontoData] = useState({ description: '', botao: '' });

    // Função para verificar se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Função para adicionar animação quando o componente estiver visível
    const handleScroll = () => {
        const section = document.querySelector('.simple-section');
        if (section && isElementVisible(section)) {
            const animatedElements = document.querySelectorAll('.animate');
            animatedElements.forEach(el => {
                el.classList.add('animate-visible');
            });
            window.removeEventListener('scroll', handleScroll); // Remove o listener após a ativação
        }
    };

    // Adiciona o listener de scroll para detectar quando a seção está visível
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
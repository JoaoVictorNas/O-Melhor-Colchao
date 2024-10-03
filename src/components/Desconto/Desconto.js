import React, { useState, useEffect } from 'react';
import './Desconto.css';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

function Desconto() {
    const [descontoData, setDescontoData] = useState({
        description: '',
        botao: '',
        image: ''
    });

    // Verifica se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Ativa a animação ao rolar a página e a seção se tornar visível
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

    // Carrega os dados do dataCache
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.desconto && dataCache.desconto.length > 0) {
                const data = dataCache.desconto[0];
                setDescontoData({
                    description: data.descricao,
                    botao: data.botao_Texto,
                    image: data.url_Imagem
                });
            } else {
                setTimeout(checkDataLoaded, 500); // Verifica novamente após 500ms
            }
        };

        checkDataLoaded();
    }, []); // Executa apenas uma vez ao montar o componente

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
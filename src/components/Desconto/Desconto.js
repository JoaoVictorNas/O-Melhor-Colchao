import React, { useState, useEffect } from 'react';
import './Desconto.css';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

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

    // Carrega os dados diretamente do dataCache após garantir que foram carregados
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.desconto && dataCache.desconto.length > 0) {
                const data = dataCache.desconto[0];
                setDescontoData({
                    description: data.descricao,
                    botao: data.botao_Texto,
                    image: data.url_Imagem
                });
                console.log("Dados de desconto encontrados:", dataCache.desconto);
            } else {
                console.log("Aguardando dados de desconto serem carregados...");
                setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
            }
        };

        checkDataLoaded(); // Chama a função para verificar os dados
    }, []); // Esse useEffect será executado apenas uma vez ao montar o componente

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
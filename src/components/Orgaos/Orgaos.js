import React, { useEffect, useState } from 'react';
import './Orgaos.css';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

function Reguladores() {
    const [orgaos, setOrgaos] = useState([]);

    // Lógica de animação ao scroll
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    };

    useEffect(() => {
        const handleScroll = () => {
            const animatedElements = document.querySelectorAll('.animate');
            animatedElements.forEach((el) => {
                if (isElementVisible(el)) {
                    el.classList.add('animate-visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    // Carrega os dados diretamente do dataCache após garantir que foram carregados
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.orgaos && dataCache.orgaos.length > 0) {
                console.log("Dados de órgãos encontrados:", dataCache.orgaos);
                setOrgaos(dataCache.orgaos); // Armazena os dados no estado orgaos
            } else {
                console.log("Aguardando dados de órgãos serem carregados...");
                setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
            }
        };

        checkDataLoaded(); // Chama a função para verificar os dados
    }, []); // Esse useEffect será executado apenas uma vez ao montar o componente

    return (
        <div className='reguladores-section'>
            <h2 className="reguladores-info-text animate">Órgãos reguladores</h2>
            <p className='reguladores-subinfo animate'>Conheça os órgãos que certificam o mercado de colchões</p>
            <div className='reguladores-list'>
                {orgaos.length > 0 ? (
                    orgaos.map(orgao => (
                        <div className='reguladores-item animate' key={orgao.id}>
                            <h3 className='reguladores-title'>
                                <img 
                                    src={`https://bfbaby.com.br/up/orgao-${orgao.id}.png`} 
                                    alt={orgao.titulo || `Ícone órgão regulador`} 
                                    className="reguladores-icon" 
                                />
                                {orgao.titulo}
                            </h3>
                            <p className='reguladores-description'>
                                {orgao.descricao}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Carregando órgãos reguladores...</p>
                )}
            </div>
        </div>
    );
}

export default Reguladores;
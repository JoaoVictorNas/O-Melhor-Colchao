import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orgaos.css';

function Reguladores() {
    const [orgaos, setOrgaos] = useState([]);

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

    useEffect(() => {
        axios.get('https://omelhorcolchao.com.br/api.php?path=orgaos')
            .then(response => {
                setOrgaos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar órgãos reguladores:", error);
            });
    }, []);

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
                                    alt={orgao.titulo || `Ícone orgão regulador`} 
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orgaos.css';

function Reguladores() {
    const [orgaos, setOrgaos] = useState([]);

    // Função para verificar se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        // Verifica se o elemento está parcialmente ou totalmente visível na viewport
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    };

    // Função para adicionar animação quando o componente estiver visível
    const handleScroll = () => {
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach((el) => {
            if (isElementVisible(el)) {
                el.classList.add('animate-visible');
            }
        });
    };

    // Listener de scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Remove o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <h2 className="reguladores-info-text animate">Órgãos reguladores</h2>
            <p className='reguladores-subinfo animate'>Conheça os órgãos que certificam o mercado de colchões</p>
            <div className='reguladores-list'>
                {orgaos.map(orgao => (
                    <div className='reguladores-item animate' key={orgao.id}>
                        <h3 className='reguladores-title'>
                            <img 
                                src={`https://bfbaby.com.br/up/orgao-${orgao.id}.png`} 
                                alt={`Ícone ${orgao.title}`} 
                                className="reguladores-icon" 
                            />
                            {orgao.title}
                        </h3>
                        <p className='reguladores-description'>
                            {orgao.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reguladores;
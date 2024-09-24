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

    // Listener de scroll para ativar as animações
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

        // Remove o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Nenhuma dependência adicional é necessária

    // Requisição dos dados dos órgãos reguladores ao carregar o componente
    useEffect(() => {
        axios.get('http://localhost:3003/api/orgaos') // Rota do backend que retorna os dados do MySQL
            .then(response => {
                setOrgaos(response.data); // Atualiza o estado com os dados vindos do MySQL
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
                                alt={`Ícone ${orgao.titulo}`} 
                                className="reguladores-icon" 
                            />
                            {orgao.titulo}
                        </h3>
                        <p className='reguladores-description'>
                            {orgao.descricao}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reguladores;
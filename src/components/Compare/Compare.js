import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Compare.css';
import { Link } from 'react-router-dom';

function Compare() {
    const [compareItems, setCompareItems] = useState([]);

    // Função para verificar se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Função para adicionar animação a todos os elementos quando visível
    const activateAllAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach(el => {
            el.classList.add('animate-visible');
        });
    };

    // Listener de scroll para ativar animações
    useEffect(() => {
        const handleScroll = () => {
            const firstElement = document.querySelector('.card'); // Pega o primeiro elemento do slider
            if (firstElement && isElementVisible(firstElement)) {
                activateAllAnimations();  // Ativa a animação em todos os elementos
                window.removeEventListener('scroll', handleScroll);  // Remove o listener de scroll após a ativação
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Remove o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Não precisa de dependências aqui, pois handleScroll está dentro do useEffect

    // Requisição dos dados dos itens do compare
    useEffect(() => {        
        const fetchCompareItems = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/compare'); // Atualize a porta
                setCompareItems(response.data);
            } catch (error) {
                console.error("Erro ao buscar itens do Compare:", error);
            }
        };
        fetchCompareItems();
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <h1 className='title-comp animate' id='compare'>Compare O Melhor Colchão</h1>
            {compareItems.map(item => (
                <div className='card animate' key={item.id} id={`item${item.id}`}>
                    <div className="image-container">
                        <img 
                            src={item.image} 
                            alt={item.product} 
                            className='image animate' 
                        />
                        {item.id === 1 && (
                            <img 
                                src="https://bfbaby.com.br/up/tag.png" 
                                alt="Tag" 
                                className='tag-image' 
                            />
                        )}
                    </div>
                    <div className='card-content'>
                        <h2 className='animate'>{item.brand}</h2>
                        <h3 className='animate'>{item.product}</h3>
                        <ul className='features'>
                            {item.features.map((feature, index) => (
                                <li key={index} className="animate">
                                    <span className="material-symbols-outlined check">check_circle</span>
                                    {`${feature.feature} ${feature.rating}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='card-buttons'>
                        <div className='stars'>
                            <img src={item.rating} alt="Estrelas" className='rating-image' />
                            <span className='review-number'>{item.reviewCount}</span>
                        </div>
                        <a href={item.site}>
                            <button className='primary-button'>Ver produto</button>
                        </a>
                        <Link to={`/review/${item.slug}`}>
                            <button className="secondary-button">Saiba mais</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Compare;
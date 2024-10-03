import React, { useState, useEffect, useRef } from 'react';
import './Compare.css';
import { Link } from 'react-router-dom';
import dataCache from '../../dataCache'; 

function Compare() {
    const [compareItems, setCompareItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const cardsRef = useRef([]); 

    // Manipula a animação quando o item entra na visualização
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                },200); 
                observer.unobserve(entry.target); 
            }
        });
    };

    // Configura o IntersectionObserver para observar quando os itens entram na tela
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null, 
            threshold: 0.1, 
        });

        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [compareItems]); 

    // Carrega os dados de comparação do dataCache
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.compare && dataCache.compare.length > 0) {
                setCompareItems(dataCache.compare);
                setLoading(false); 
            } else {
                setTimeout(checkDataLoaded, 500); 
            }
        };

        checkDataLoaded(); 
    }, []);

    if (loading) {
        return <p>Carregando dados de comparação...</p>;
    }

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <h1 className='title-comp animate' id='compare'>Compare O Melhor Colchão</h1>
            {compareItems.map((item, index) => {
                const itemId = parseInt(item.id, 10);
                return (
                    <div
                        className='card animate'
                        key={item.id}
                        id={`item${item.id}`}
                        ref={el => (cardsRef.current[index] = el)} 
                    >
                        <div className="image-container">
                            <img
                                src={item.image}
                                alt={item.product}
                                className='image animate'
                                onLoad={() => cardsRef.current[index]?.classList.add('loaded')} 
                            />
                            {itemId === 1 && (
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
                                <button className='primary-button animate'>Ver produto</button>
                            </a>
                            <Link to={`/review/${item.slug}`}>
                                <button className="secondary-button animate">Saiba mais</button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Compare;
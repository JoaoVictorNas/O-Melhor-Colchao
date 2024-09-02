import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Compare.css';
import { Link } from 'react-router-dom';

function Compare() {
    const [compareItems, setCompareItems] = useState([]);

    useEffect(() => {        
        const fetchCompareItems = async () => {
            try{
                const response = await axios.get('http://localhost:3001/api/compare');
                setCompareItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar itens do Compare:", error);
            }
        };
        fetchCompareItems();
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <h1 className='title-comp'>Compare O Melhor Colchão</h1>
            {compareItems.map(item => (
                <div className='card' key={item.id} id={`item${item.id}`}>
                    <div className="image-container">
                        <img 
                            src={item.image} 
                            alt={item.product} 
                            className='image' 
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
                        <h2>{item.brand}</h2>
                        <h3>{item.product}</h3>
                        <ul className='features'>
                            {item.features.map((feature, index) => (
                                <li key={index}>
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
                        <Link to={`/review/${item.url}`}>
                            <button className="secondary-button">Saiba mais</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Compare;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Review.css';
import Header from "../../components/Header/Header";
import BlogCarrossel from "../../components/BlogCarrossel/BlogCarrossel";
import Footer from "../../components/Footer/Footer";
import dataCache from '../../dataCache'; // Importando o dataCache

const Review = () => {
    const { url } = useParams(); // 'url' é o slug vindo da rota
    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Busca o review no dataCache com base no slug (url)
        const fetchReview = () => {
            const foundReview = dataCache.reviews.find(item => item.slug === url);
            if (foundReview) {
                setReview(foundReview);
            } else {
                setError('Review não encontrado.');
            }
        };

        fetchReview();
    }, [url]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!review) {
        return <p>Carregando ...</p>;
    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <Header />
            <div className="Review-colchao">
                <a href="/">
                    <img src="https://bfbaby.com.br/up/voltar.png" alt="voltar" className="back" />
                </a>
                <h1 className="title-review">{review.product}</h1>
                <div className="review-content-page">
                    <div className="review-image-container">
                        <img className="review-placeholder" src={`https://bfbaby.com.br/up/review-${review.id}.png`} alt='Colchão Destaque'/>
                    </div>
                    <div className="top1">
                        <div className="top1-image">
                            <img 
                                src="https://bfbaby.com.br/up/tag.png"
                                alt="tag"
                                className="tag-review"
                            />
                        </div>
                        <div className="top1-content">
                            <h2>BF Colchões</h2>
                            <p>{review.product}</p>
                        </div>
                        <a href={review.site}>
                            <button className="ver-produto">Ver produto</button>
                        </a>
                    </div>
                </div>
                <hr />
                <div className="conclusao">
                    <h1>Conclusão</h1>
                    <div dangerouslySetInnerHTML={{ __html: review.conclusao }} />
                </div>
                <div className="sobre-a-marca">
                    <h1>Sobre a marca</h1>
                    <div dangerouslySetInnerHTML={{ __html: review.sobre_marca }} />
                </div>
                <div className="sobre-o-colchao">
                    <h1>Sobre o colchão</h1>
                    <div dangerouslySetInnerHTML={{ __html: review.sobre_colchao }} />
                </div>
                <div className="vencedor-do-teste">
                    <h1>Vencedor do teste</h1>
                    <div className="winner-placeholder">
                        <img 
                            src="https://bfbaby.com.br/up/vencedor.png" 
                            alt="Vencedor do teste" 
                            style={{ width: '100%', height: '100%', borderRadius: '24px' }} 
                        />
                    </div>
                </div>
                <div className="como-chegamos">
                    <h1>Como chegamos a esse vencedor?</h1>
                    <p>Nossos cinco melhores colchões são baseados em:<br/><br/></p>
                    <ul>
                        <li><img
                            src="https://bfbaby.com.br/up/icon-criterio.png" 
                            alt="Icone critério" 
                            className="criteria-icon" 
                        />Certificações</li>
                        <li><img
                            src="https://bfbaby.com.br/up/icon-criterio.png" 
                            alt="Icone critério" 
                            className="criteria-icon" 
                        />Reputação da marca</li>
                        <li><img
                            src="https://bfbaby.com.br/up/icon-criterio.png" 
                            alt="Icone critério" 
                            className="criteria-icon" 
                        />Avaliações de clientes</li>
                    </ul>
                </div>
            </div>
            <BlogCarrossel />
            <Footer />
        </>
    );
}

export default Review;

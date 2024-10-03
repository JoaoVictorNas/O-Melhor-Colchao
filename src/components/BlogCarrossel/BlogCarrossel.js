import React, { useState, useEffect } from "react";
import './BlogCarrossel.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import dataCache from '../../dataCache';

function BlogCarrossel() {
    const [blogs, setBlogs] = useState([]);

    // Verifica se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Ativa animações quando o scroll detecta a visibilidade dos elementos
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate');
            elements.forEach(el => {
                if (isElementVisible(el)) {
                    el.classList.add('animate-visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Define o estado inicial das animações
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    // Carrega os blogs do dataCache
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.blog && dataCache.blog.length > 0) {
                setBlogs(dataCache.blog);
            } else {
                setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
            }
        };

        checkDataLoaded();
    }, []); 

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3.67,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (blogs.length === 0) {
        return <p>Carregando blogs...</p>;
    }

    return (
        <>
            <h1 className="BlogTitle animate">Blog</h1>
            <div className="slider-blog">
                <Slider {...settings} className="custom-slider-blog">
                    {blogs.map(blog => (
                        <div key={blog.slug} className="custom-card-blog animate">
                            <div className="card-image-blog" style={{ backgroundImage: `url(${blog.url_Imagem})` }}></div>
                            <div className="card-content-blog">
                                <h2>{blog.titulo}</h2>
                                <p>{blog.descricao}</p>
                                <Link to={`/materia/${blog.slug}`}>
                                    <p id="faq" className="red-more">Leia Mais</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default BlogCarrossel;
import React, { useState, useEffect } from "react";
import './BlogCarrossel.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

function BlogCarrossel() {
    const [blogs, setBlogs] = useState([]);

    // Função para verificar se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Listener de scroll para ativar animações
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
        handleScroll(); // Chamando a função para definir o estado inicial das animações
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Não precisa de dependências aqui, pois handleScroll está dentro do useEffect

    // Carrega os blogs diretamente do dataCache
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.blog && dataCache.blog.length > 0) {
                setBlogs(dataCache.blog);
                console.log("Dados de blogs encontrados:", dataCache.blog);
            } else {
                console.log("Aguardando dados de blogs serem carregados...");
                setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
            }
        };

        checkDataLoaded(); // Chama a função para verificar os dados
    }, []); // Esse useEffect será executado apenas uma vez ao montar o componente

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
import React, { useState, useEffect } from "react";
import './BlogCarrossel.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogCarrossel() {
    const [blogs, setBlogs] = useState([]);

    // Função para verificar se o elemento está visível na viewport
    const isElementVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    };

    // Função para adicionar animação quando o componente estiver visível
    const handleScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(el => {
            if (isElementVisible(el)) {
                el.classList.add('animate-visible');
            }
        });
    };

    // Listener de scroll para ativar animações
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Chamando a função para definir o estado inicial das animações
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // Adicione handleScroll aqui

    // Busca os blogs ao carregar o componente
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Erro ao carregar os blogs:', error);
            }
        };

        fetchBlogs();
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
                            <div className="card-image-blog" style={{ backgroundImage: `url(${blog.image})` }}></div>
                            <div className="card-content-blog">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
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
import React, { useState, useEffect } from "react";
import './Blog.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dataCache from "../../dataCache";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [latestBlog, setLatestBlog] = useState({});

    // Busca os blogs ao carregar o componente
    useEffect(() =>{
        const checkDataLoaded = () => {
            if (dataCache.blog && dataCache.blog.length > 0) {
                // Ordena os blogs do último para o primeiro (decrescente)
                const blogsData = dataCache.blog.sort((a, b) => b.id - a.id);
                
                // Pega o blog mais recente (primeiro da lista ordenada)
                const latest = blogsData[0];
        
                // Atualiza o estado com o blog mais recente e remove ele do array
                setLatestBlog(latest);
                setBlogs(blogsData.filter(blog => blog.id !== latest.id)); // Remove o mais recente do array
                
                console.log("Blogs carregados:", blogsData);
            } else {
                console.log("Aguardando dados de blogs serem carregados...");
                setTimeout(checkDataLoaded, 500);
            }
        };
        
        checkDataLoaded();
    }, []);

    // Calcula o número de placeholders para alinhar os cards
    const numberOfPlaceholders = (3 - (blogs.length % 3)) % 3;

    return (
        <>
            <Header />
            <div className="blogss-container">
                <a href="/">
                    <img src="https://bfbaby.com.br/up/voltar.png" alt="voltar" className="back" />
                </a>
                <h1 className="title-blog">Blog</h1>
                <div className="blogs-content">
                    <div className="images-placeholder-blog" style={{ backgroundImage: `url(${latestBlog.url_Imagem2 || ''})` }}></div>
                    <div className="text-content">
                        <h2>{latestBlog.titulo || 'Título do Blog'}</h2>
                        <p>{latestBlog.descricao || 'Descrição do Blog'}</p>
                        <Link to={`/materia/${latestBlog.slug}`}>
                            <p className="leiaMais">Leia Mais</p>
                        </Link>
                    </div>
                </div>

                <div className="blog-cards-container">
                    {blogs.map((blog) => (
                        <div key={blog.slug} className="blog-card">
                            <div className="blog-card-image" style={{ backgroundImage: `url(${blog.url_Imagem})` }}></div>
                            <div className="blog-card-content">
                                <h2>{blog.titulo}</h2>
                                <p>{blog.descricao}</p>
                                <Link to={`/materia/${blog.slug}`}>
                                    <p className="blog-read-more">Leia Mais</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {/* Renderiza placeholders para alinhamento */}
                    {Array.from({ length: numberOfPlaceholders }).map((_, index) => (
                        <div key={index} className="placeholder-card"></div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Blog;
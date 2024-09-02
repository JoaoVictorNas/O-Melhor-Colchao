import React, { useState, useEffect } from "react";
import './Blog.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [latestBlog, setLatestBlog] = useState({});

    // Busca os blogs ao carregar o componente
    useEffect(() => {
        axios.get('http://localhost:3001/api/blogs')
            .then(response => {
                const blogsData = response.data.sort((a, b) => b.id - a.id); // Ordena em ordem decrescente
                const latest = blogsData[0]; // O blog mais recente
                setLatestBlog(latest);
                setBlogs(blogsData.filter(blog => blog.id !== latest.id)); // Exclui o mais recente do array de blogs
            })
            .catch(error => console.error("Erro ao buscar blogs:", error));
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
                    <div className="images-placeholder-blog" style={{ backgroundImage: `url(${latestBlog.image2 || ''})` }}></div>
                    <div className="text-content">
                        <h2>{latestBlog.title || 'Título do Blog'}</h2>
                        <p>{latestBlog.description || 'Descrição do Blog'}</p>
                        <Link to={`/materia/${latestBlog.slug}`}>
                            <p className="leiaMais">Leia Mais</p>
                        </Link>
                    </div>
                </div>

                <div className="blog-cards-container">
                    {blogs.map((blog) => (
                        <div key={blog.slug} className="blog-card">
                            <div className="blog-card-image" style={{ backgroundImage: `url(${blog.image})` }}></div>
                            <div className="blog-card-content">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
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
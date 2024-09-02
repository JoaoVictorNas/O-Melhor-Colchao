import React, { useEffect, useState } from "react";
import './Materia.css';
import Header from "../../components/Header/Header";
import BlogCarrossel from "../../components/BlogCarrossel/BlogCarrossel";
import Footer from "../../components/Footer/Footer";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Materia = () => {
    const { slug } = useParams();
    const [materia, setMateria] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackClick = () => {
        // Volta uma página na história de navegação
        navigate(-1);
    };

    // Busca a matéria correspondente pelo slug
    useEffect(() => {
        axios.get(`http://localhost:3001/api/blogs/${slug}`)
            .then(response => setMateria(response.data))
            .catch(error => setError('Erro ao carregar a matéria: ' + error.message));
    }, [slug]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!materia) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Header />
            <div className="blog-post">
                <img onClick={handleBackClick} src="https://bfbaby.com.br/up/voltar.png" alt="voltar" className="back" />
                <h1 className="title">{materia.title}</h1>
                <div className="image-placeholder" style={{ backgroundImage: `url(${materia.imageBanner})` }}></div>
                <hr />
                <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: materia.content }} />
                </div>
            </div>
            <BlogCarrossel />
            <Footer />
        </>
    );
}

export default Materia;
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BlogsSection.css';

const BlogSection = ({ Blog, updateBlog, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleContentChange = (id, conteudo) => {
        updateBlog(id, 'conteudo', conteudo);
    };

    return (
        <div className="Blog-section">
            <h2 className="section-title">Editar Blog</h2>
            {Blog.map((blog, index) => (
                <div key={blog.id} className="blog-item">
                    <div 
                        className={`blog-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        {blog.titulo}
                    </div>
                    {activeIndex === index && (
                        <div className="blog-content">
                            <input
                                type="text"
                                value={blog.slug}
                                onChange={(e) => updateBlog(blog.id, 'slug', e.target.value)}
                                className="blog-input"
                                placeholder="Slug"
                            />
                            <input
                                type="text"
                                value={blog.titulo}
                                onChange={(e) => updateBlog(blog.id, 'titulo', e.target.value)}
                                className="blog-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={blog.descricao}
                                onChange={(e) => updateBlog(blog.id, 'descricao', e.target.value)}
                                className="blog-textarea"
                                placeholder="Descrição"
                            />
                            <ReactQuill 
                                value={blog.conteudo}
                                onChange={(conteudo) => handleContentChange(blog.id, conteudo)}
                                placeholder="Escreva a matéria do blog aqui..."
                                className="blog-quill"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('Blog')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default BlogSection;
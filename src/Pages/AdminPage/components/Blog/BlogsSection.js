import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BlogsSection.css';

const BlogsSection = ({ blogs, updateBlog, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleContentChange = (id, content) => {
        updateBlog(id, 'content', content);
    };

    return (
        <div className="blogs-section">
            <h2 className="section-title">Editar Blogs</h2>
            {blogs.map((blog, index) => (
                <div key={blog.id} className="blog-item">
                    <div 
                        className={`blog-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        {blog.title}
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
                                value={blog.title}
                                onChange={(e) => updateBlog(blog.id, 'title', e.target.value)}
                                className="blog-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={blog.description}
                                onChange={(e) => updateBlog(blog.id, 'description', e.target.value)}
                                className="blog-textarea"
                                placeholder="Descrição"
                            />
                            <ReactQuill 
                                value={blog.content}
                                onChange={(content) => handleContentChange(blog.id, content)}
                                placeholder="Escreva a matéria do blog aqui..."
                                className="blog-quill"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('blogs')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default BlogsSection;
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateBlogSection.css';

const CreateBlogSection = ({ onCreate }) => {
    const [newBlog, setNewBlog] = useState({
        slug: '',
        title: '',
        description: '',
        content: '',
    });

    // Atualiza o slug quando o usuário digita
    const handleSlugChange = (e) => {
        const slug = e.target.value;
        setNewBlog({ ...newBlog, slug });
    };

    // Atualiza os demais campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    // Atualiza o conteúdo do editor de texto rico
    const handleContentChange = (content) => {
        setNewBlog({ ...newBlog, content });
    };

    // Função para criar um novo blog
    const handleCreateBlog = async () => {
        const blogToCreate = {
            ...newBlog,
            image: `https://bfbaby.com.br/up/blog-${Date.now()}.png`,
            imageBanner: `https://bfbaby.com.br/up/materia-${Date.now()}.png`,
            image2: `https://bfbaby.com.br/up/pageblog-${Date.now()}.png`,
            link: `/materia/${newBlog.slug}`
        };

        try {
            const response = await fetch('http://localhost:3001/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogToCreate),
            });
            const data = await response.json();

            if (response.ok) {
                onCreate(data);
                setNewBlog({
                    slug: '',
                    title: '',
                    description: '',
                    content: '',
                });
                alert('Blog criado com sucesso!');
            } else {
                console.error("Erro ao criar o blog:", data.message);
                alert('Erro ao criar o blog.');
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            alert('Erro ao criar o blog.');
        }
    };

    return (
        <div className="create-blog-section">
            <h2 className="create-blog-title">Criar Novo Blog</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="slug"
                    value={newBlog.slug}
                    onChange={handleSlugChange}
                    className="form-control"
                    placeholder="Slug"
                />
                <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Título"
                />
                <textarea
                    name="description"
                    value={newBlog.description}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Descrição"
                />
                <ReactQuill
                    value={newBlog.content}
                    onChange={handleContentChange}
                    placeholder="Escreva a matéria do blog aqui..."
                    className="blog-quill-editor"
                />
                <div className="button-group">
                    <button onClick={handleCreateBlog} className="create-button">Criar Blog</button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogSection;
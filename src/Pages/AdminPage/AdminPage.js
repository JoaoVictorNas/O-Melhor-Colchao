import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './components/AdminHeader/AdminHeader';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import CriteriosSection from './components/Criterios/CriteriosSection';
import SliderSection from './components/Slider/SliderSection';
import CompareSection from './components/Compare/CompareSection';
import OrgaosSection from './components/Orgaos/OrgaosSection';
import DescontoSection from './components/Desconto/DescontoSection';
import BlogsSection from './components/Blog/BlogsSection';
import CreateBlogSection from './components/Blog/CreateBlogSection';
import FaqSection from './components/faqSection/faqSection';
import ReviewSection from './components/Review/ReviewSection'; // Novo import
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('home');
    const [criterios, setCriterios] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [compareItems, setCompareItems] = useState([]);
    const [orgaos, setOrgaos] = useState([]);
    const [faq, setFaq] = useState([]);
    const [descontoData, setDescontoData] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [reviews, setReviews] = useState([]); // Novo estado para Reviews
    const [newBlog, setNewBlog] = useState({
        slug: '',
        title: '',
        description: '',
        content: '',
        image: '',
        imageBanner: '',
        image2: '',
        link: ''
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        } else {
            fetchCriterios();
            fetchSliderData();
            fetchCompareItems();
            fetchOrgaos();
            fetchDescontoData();
            fetchBlogs();
            fetchFaq();
            fetchReviews(); // Chame a função fetchReviews
        }
    }, [navigate]);

    // Funções para buscar dados de cada seção
    const fetchCriterios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/criterios');
            setCriterios(response.data);
        } catch (error) {
            console.error("Erro ao buscar critérios:", error);
        }
    };

    const fetchSliderData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/slider');
            setSliderData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do slider:", error);
        }
    };

    const fetchCompareItems = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/compare');
            setCompareItems(response.data);
        } catch (error) {
            console.error("Erro ao buscar itens do Compare:", error);
        }
    };

    const fetchOrgaos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/orgaos');
            setOrgaos(response.data);
        } catch (error) {
            console.error("Erro ao buscar órgãos:", error);
        }
    };

    const fetchDescontoData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/desconto');
            setDescontoData(response.data[0]);
        } catch (error) {
            console.error("Erro ao buscar desconto:", error);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error("Erro ao buscar blogs:", error);
        }
    };

    const fetchFaq = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/faq');
            setFaq(response.data);
        } catch (error) {
            console.error("Erro ao buscar FAQ:", error);
        }
    };

    const fetchReviews = async () => {  // Função para buscar os dados do Review
        try {
            const response = await axios.get('http://localhost:3001/api/compare');
            setReviews(response.data);
        } catch (error) {
            console.error("Erro ao buscar reviews:", error);
        }
    };

    // Função para renderizar a seção selecionada
    const renderSection = () => {
        switch (selectedSection) {
            case 'home':
                return <p className="admin-home-text">Bem-vindo ao painel de administração! Selecione uma seção para editar.</p>;
            case 'criterios':
                return (
                    <CriteriosSection
                        criterios={criterios}
                        updateCriterio={updateCriterio}
                        handleSave={handleSave}
                    />
                );
            case 'slider':
                return (
                    <SliderSection
                        sliderData={sliderData}
                        updateSlider={updateSlider}
                        handleSave={handleSave}
                    />
                );
            case 'compare':
                return (
                    <CompareSection
                        compareItems={compareItems}
                        updateCompare={updateCompare}
                        handleSave={handleSave}
                    />
                );
            case 'orgaos':
                return (
                    <OrgaosSection
                        orgaos={orgaos}
                        updateOrgao={updateOrgao}
                        handleSave={handleSave}
                    />
                );
            case 'desconto':
                return (
                    <DescontoSection
                        descontoData={descontoData}
                        setDescontoData={setDescontoData}
                        handleSave={handleSave}
                    />
                );
            case 'faq':
                return (
                    <FaqSection
                        faq={faq}
                        updateFaq={updateFaq}
                        handleSave={handleSave}
                    />
                );
            case 'blogs':
                return (
                    <>
                        <BlogsSection
                            blogs={blogs}
                            updateBlog={updateBlog}
                            handleContentChange={handleContentChange}
                            handleSave={handleSave}
                        />
                        <CreateBlogSection
                            newBlog={newBlog}
                            setNewBlog={setNewBlog}
                            handleCreateBlog={handleCreateBlog}
                        />
                    </>
                );
            case 'review':  // Nova seção Review
                return (
                    <ReviewSection
                        reviews={reviews}
                        updateReview={updateReview}
                        handleSave={handleSave}
                    />
                );
            default:
                return <p className="admin-home-text">Selecione uma seção no menu lateral.</p>;
        }
    };

    // Funções para atualização de dados em cada seção
    const updateCriterio = (id, field, value) => {
        const updatedCriterios = criterios.map(criterio =>
            criterio.id === id ? { ...criterio, [field]: value } : criterio
        );
        setCriterios(updatedCriterios);
    };

    const updateSlider = (id, field, value) => {
        const updatedSlider = sliderData.map(slider =>
            slider.id === id ? { ...slider, [field]: value } : slider
        );
        setSliderData(updatedSlider);
    };

    const updateCompare = (id, field, value) => {
        const updatedCompare = compareItems.map(compare =>
            compare.id === id ? { ...compare, [field]: value } : compare
        );
        setCompareItems(updatedCompare);
    };

    const updateOrgao = (id, field, value) => {
        const updatedOrgaos = orgaos.map(orgao =>
            orgao.id === id ? { ...orgao, [field]: value } : orgao
        );
        setOrgaos(updatedOrgaos);
    };

    const updateBlog = (id, field, value) => {
        setBlogs(prevBlogs =>
            prevBlogs.map(blog =>
                blog.id === id ? { ...blog, [field]: value } : blog
            )
        );
    };

    const updateFaq = (id, field, value) => {
        const updatedFaq = faq.map(faq =>
            faq.id === id ? { ...faq, [field]: value } : faq
        );
        setFaq(updatedFaq);
    };

    const updateReview = (id, field, value) => {  // Função para atualização de Reviews
        const updatedReviews = reviews.map(review =>
            review.id === id ? { ...review, [field]: value } : review
        );
        setReviews(updatedReviews);
    };

    const handleContentChange = (id, content) => {
        updateBlog(id, 'content', content);
    };

    // Função para salvar alterações
    const handleSave = async (type) => {
        const confirmSave = window.confirm("Você deseja confirmar a edição?");

        if (confirmSave) {
            try {
                switch (type) {
                    case 'criterios':
                        await Promise.all(criterios.map(criterio =>
                            axios.put(`http://localhost:3001/api/criterios/${criterio.id}`, {
                                title: criterio.title,
                                description: criterio.description
                            })
                        ));
                        break;
                    case 'slider':
                        await Promise.all(sliderData.map(slider =>
                            axios.put(`http://localhost:3001/api/slider/${slider.id}`, {
                                title: slider.title,
                                description: slider.description
                            })
                        ));
                        break;
                    case 'compare':
                        await Promise.all(compareItems.map(compare =>
                            axios.put(`http://localhost:3001/api/compare/${compare.id}`, {
                                brand: compare.brand,
                                product: compare.product,
                                reviewCount: compare.reviewCount
                            })
                        ));
                        break;
                    case 'orgaos':
                        await Promise.all(orgaos.map(orgao =>
                            axios.put(`http://localhost:3001/api/orgaos/${orgao.id}`, {
                                title: orgao.title,
                                description: orgao.description
                            })
                        ));
                        break;
                    case 'desconto':
                        if (descontoData) {
                            await axios.put(`http://localhost:3001/api/desconto/${descontoData.id}`, {
                                description: descontoData.description,
                                botao: descontoData.botao
                            });
                        }
                        break;
                    case 'faq':
                        await Promise.all(faq.map(faq =>
                            axios.put(`http://localhost:3001/api/faq/${faq.id}`, {
                                pergunta: faq.pergunta,
                                resposta: faq.resposta
                            })
                        ));
                        break;
                    case 'blogs':
                        await Promise.all(blogs.map(blog =>
                            axios.put(`http://localhost:3001/api/blogs/${blog.id}`, {
                                slug: blog.slug,
                                title: blog.title,
                                description: blog.description,
                                content: blog.content,
                                image: blog.image,
                                link: blog.link
                            })
                        ));
                        break;
                    case 'review':  // Caso de salvamento de Reviews
                        await Promise.all(reviews.map(review =>
                            axios.put(`http://localhost:3001/api/compare/${review.id}`, {
                                product: review.product,
                                conclusao: review.conclusao,
                                sobre_marca: review.sobre_marca,
                                sobre_colchao: review.sobre_colchao
                            })
                        ));
                        break;
                    default:
                        console.error('Tipo desconhecido:', type);
                        return;
                }

                alert("Atualização realizada com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar:", error);
                alert("Ocorreu um erro ao tentar atualizar.");
            }
        }
    };

    // Função para criar novo blog
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
                alert(`Erro ao criar o blog: ${data.message}`);
            }
        } catch (error) {
            alert(`Erro ao fazer a requisição: ${error.message}`);
        }
    };

    // Função de callback para manipular criação de blog
    const onCreate = (newBlog) => {
        setBlogs(prevBlogs => [...prevBlogs, newBlog]);
    };

    return (
        <>
            <AdminHeader />
            <div className="admin-layout">
                <AdminSidebar setSelectedSection={setSelectedSection} />
                <main className="admin-content">
                    {renderSection()}
                </main>
            </div>
        </>
    );
};

export default AdminPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DescontoSection from './components/Desconto/DescontoSection';
import SliderSection from './components/Slider/SliderSection';
import CriteriosSection from './components/Criterios/CriteriosSection';
import ReguladoresAdminSection from './components/Orgaos/OrgaosSection';
import CompareSection from './components/Compare/CompareSection';
import FaqSection from './components/faqSection/faqSection';
import ReviewSection from './components/Review/ReviewSection'; 
import BlogSection from './components/Blog/BlogsSection'; 
import CreateBlogSection from './components/Blog/CreateBlogSection'; // Importação do componente de criação de blogs
import Header from './components/AdminHeader/AdminHeader';
import Sidebar from './components/AdminSidebar/AdminSidebar';

const AdminPage = () => {
  const [descontoData, setDescontoData] = useState(null);
  const [sliderData, setSliderData] = useState([]);
  const [criteriosData, setCriteriosData] = useState([]);
  const [orgaosData, setOrgaosData] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('home');

  useEffect(() => {
    const fetchDescontoData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/desconto');
        setDescontoData(response.data[0]);
      } catch (error) {
        console.error("Erro ao buscar dados de desconto:", error);
      }
    };

    const fetchSliderData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/critColch');
        setSliderData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do critColch:", error);
      }
    };

    const fetchCriteriosData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/critMarca');
        setCriteriosData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados dos critérios de marca:", error);
      }
    };

    const fetchOrgaosData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/orgaos');
        setOrgaosData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados dos órgãos regulamentadores:", error);
      }
    };

    const fetchCompareItems = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/compare');
        setCompareItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do compare:", error);
      }
    };

    const fetchFaqData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/faq');
        setFaqData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do FAQ:", error);
      }
    };

    const fetchReviewsData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/ranking');
        setReviewsData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de reviews:", error);
      }
    };

    const fetchBlogData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/blog');
        setBlogData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do blog:", error);
      }
    };

    fetchDescontoData();
    fetchSliderData();
    fetchCriteriosData();
    fetchOrgaosData();
    fetchCompareItems();
    fetchFaqData();
    fetchReviewsData();
    fetchBlogData();
  }, []);

  // Função para adicionar um novo blog
  const handleBlogCreated = async (newBlog) => {
    try {
      const response = await axios.post('http://localhost:3003/api/blog', newBlog); // Certifique-se de que o endpoint está correto
      setBlogData((prevBlogs) => [...prevBlogs, response.data]);
      alert("Blog criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar blog:", error);
      alert("Erro ao criar o blog.");
    }
  };

  const handleSave = async (type) => {
    try {
      if (type === 'desconto') {
        await axios.put(`http://localhost:3003/api/desconto/${descontoData.id}`, descontoData);
        alert("Desconto atualizado com sucesso!");
      } else if (type === 'critColch') {
        await Promise.all(
          sliderData.map(slider => 
            axios.put(`http://localhost:3003/api/critColch/${slider.id}`, slider)
          )
        );
        alert("Critérios do colchão atualizados com sucesso!");
      } else if (type === 'criterios') {
        await Promise.all(
          criteriosData.map(criterio =>
            axios.put(`http://localhost:3003/api/critMarca/${criterio.id}`, {
              titulo: criterio.titulo,
              descricao: criterio.descricao
            })
          )
        );
        alert("Critérios de marca atualizados com sucesso!");
      } else if (type === 'orgaos') {
        await Promise.all(
          orgaosData.map(orgao =>
            axios.put(`http://localhost:3003/api/orgaos/${orgao.id}`, {
              titulo: orgao.titulo,
              descricao: orgao.descricao
            })
          )
        );
        alert("Órgãos regulamentadores atualizados com sucesso!");
      } else if (type === 'compare') {
        await Promise.all(
          compareItems.map(compare =>
            axios.put(`http://localhost:3003/api/compare/${compare.id}`, compare)
          )
        );
        alert("Itens do ranking de comparação atualizados com sucesso!");
      } else if (type === 'faq') {
        await Promise.all(
          faqData.map(faq =>
            axios.put(`http://localhost:3003/api/faq/${faq.id}`, faq)
          )
        );
        alert("FAQs atualizados com sucesso!");
      } else if (type === 'review') { 
        await Promise.all(
            reviewsData.map(review =>
              axios.put(`http://localhost:3003/api/ranking/${review.id}`, review)
            )
          );
          alert("Reviews atualizados com sucesso!");
      } else if (type === 'Blog') { 
        await Promise.all(
          blogData.map(blog =>
            axios.put(`http://localhost:3003/api/blog/${blog.id}`, blog)
          )
        );
        alert("Blogs atualizados com sucesso!");
      }
    } catch (error) {
      console.error(`Erro ao salvar os dados de ${type}:`, error);
      alert(`Erro ao salvar os dados de ${type}.`);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'home':
        return <p>Bem-vindo ao painel de administração!</p>;
      case 'desconto':
        return (
          <DescontoSection
            descontoData={descontoData}
            setDescontoData={setDescontoData}
            handleSave={handleSave}
          />
        );
      case 'slider':
        return (
          <SliderSection
            sliderData={sliderData}
            updateSlider={(id, field, value) => {
              setSliderData(prev =>
                prev.map(slider =>
                  slider.id === id ? { ...slider, [field]: value } : slider
                )
              );
            }}
            handleSave={handleSave}
          />
        );
      case 'criterios':
        return (
          <CriteriosSection
            criterios={criteriosData}
            updateCriterio={(id, field, value) => {
              setCriteriosData(prev =>
                prev.map(criterio =>
                  criterio.id === id ? { ...criterio, [field]: value } : criterio
                )
              );
            }}
            handleSave={handleSave}
          />
        );
      case 'orgaos':
        return (
          <ReguladoresAdminSection
            orgaos={orgaosData}
            updateOrgao={(id, field, value) => {
              setOrgaosData(prev =>
                prev.map(orgao =>
                  orgao.id === id ? { ...orgao, [field]: value } : orgao
                )
              );
            }}
            handleSave={handleSave}
          />
        );
      case 'compare':
        return (
          <CompareSection
            compareItems={compareItems}
            updateCompare={(id, field, value) => {
              setCompareItems(prev =>
                prev.map(compare =>
                  compare.id === id ? { ...compare, [field]: value } : compare
                )
              );
            }}
            handleSave={handleSave}
          />
        );
      case 'faq':
        return (
          <FaqSection
            faq={faqData}
            setFaqs={setFaqData}
            handleSave={handleSave}
          />
        );
      case 'review':
        return (
            <ReviewSection
              reviews={reviewsData}
              updateReview={(id, field, value) => {
                setReviewsData(prev =>
                  prev.map(review =>
                    review.id === id ? { ...review, [field]: value } : review
                  )
                );
              }}
              handleSave={handleSave}
            />
          );
      case 'blog':
        return (
            <>
              <BlogSection
                Blog={blogData}
                updateBlog={(id, field, value) => {
                  setBlogData(prev =>
                    prev.map(blog =>
                      blog.id === id ? { ...blog, [field]: value } : blog
                    )
                  );
                }}
                handleSave={handleSave}
              />
              <CreateBlogSection onCreate={handleBlogCreated} /> {/* Formulário para criar blogs */}
            </>
        );
      default:
        return <p>Selecione uma seção no menu lateral.</p>;
    }
  };

  return (
    <>
      <Header />
      <div className="admin-layout">
        <Sidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
        <main className="admin-content">
          {renderSection()}
        </main>
      </div>
    </>
  );
};

export default AdminPage;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlider.css";
import axios from 'axios';

function CustomSlider() {
    const [data, setData] = useState([]);

    // Função para verificar se o container do slider está visível na viewport
    const isSliderVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        // Verifica se qualquer parte do container do slider está visível
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    };

    // Função para aplicar animação em todos os elementos do slider
    const activateAllAnimations = () => {
        const animatedElements = document.querySelectorAll('.custom-card, .card-image, .card-content');
        animatedElements.forEach((el) => {
            el.classList.add('animate-visible');
        });
    };

    // Listener de scroll para monitorar a visibilidade do container do slider
    useEffect(() => {
        const handleScroll = () => {
            const sliderContainer = document.querySelector('.slider-container');  // Pega o container do slider
            if (sliderContainer && isSliderVisible(sliderContainer)) {
                activateAllAnimations();  // Ativa a animação em todos os elementos
                window.removeEventListener('scroll', handleScroll);  // Remove o listener após a ativação
            }
        };

        // Adiciona o event listener para o scroll
        window.addEventListener('scroll', handleScroll);

        // Remove o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);  // Não precisa de dependências, pois handleScroll está dentro do useEffect

    // Requisição dos dados para popular o slider
    useEffect(() => {
        axios.get('https://omelhorcolchao.com.br/api.php?path=critColch')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do slider:", error);
            });
    }, []);

    // Configurações do slider
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2.34,
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

    return (
        <div>
            <div>
                <h2 className="info-text">Critérios para a seleção dos colchões</h2>
                <p className='subinfo'>Confira os parâmetros para nossa lista dos melhores colchões</p>
            </div>

            <div className="slider-container">
                <Slider {...settings} className="custom-slider">
                    {data.map((d) => (
                        <div className="custom-card animate" key={d.id}>
                            <div className="card-image animate" style={{ backgroundImage: `url(${d.url_Imagem})` }}></div>
                            <div className="card-content animate">
                                <h2>{d.titulo}</h2>
                                <p>{d.descricao}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default CustomSlider;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlider.css";
import axios from 'axios';

function CustomSlider() {
    const [data, setData] = useState([]);

    // Requisição dos dados para popular o slider
    useEffect(() => {
        axios.get('http://localhost:3001/api/slider')
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
                        <div className="custom-card" key={d.id}>
                            <div className="card-image" style={{ backgroundImage: `url(${d.image})` }}></div>
                            <div className="card-content">
                                <h2>{d.title}</h2>
                                <p>{d.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default CustomSlider;
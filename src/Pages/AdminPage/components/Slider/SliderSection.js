import React, { useState } from 'react';
import './SliderSection.css';

const SliderSection = ({ sliderData, updateSlider, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="slider-section">
            <h2 className="sliders-title">Editar Critérios do Colchão</h2>
            {sliderData.map((slider, index) => (
                <div key={slider.id} className="slider-item">
                    <div 
                        className={`slider-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="slider-title">Critério {index + 1}: {slider.title}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="slider-content">
                            <input
                                type="text"
                                value={slider.title}
                                onChange={(e) => updateSlider(slider.id, 'title', e.target.value)}
                                className="slider-edit-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={slider.description}
                                onChange={(e) => updateSlider(slider.id, 'description', e.target.value)}
                                className="slider-edit-textarea"
                                placeholder="Descrição"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('slider')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default SliderSection;
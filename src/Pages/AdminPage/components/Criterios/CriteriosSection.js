import React, { useState } from 'react';
import './CriteriosSection.css';

const CriteriosSection = ({ criterios, updateCriterio, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="criterios-section">
            <h2 className="criterios-title">Editar Critérios de Marca</h2>
            {criterios.map((criterio, index) => (
                <div key={criterio.id} className="criterio-item">
                    <div 
                        className={`criterio-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="criterio-title">Critério {index + 1}: {criterio.title}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="criterio-content">
                            <input
                                type="text"
                                value={criterio.title}
                                onChange={(e) => updateCriterio(criterio.id, 'title', e.target.value)}
                                className="criterio-edit-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={criterio.description}
                                onChange={(e) => updateCriterio(criterio.id, 'description', e.target.value)}
                                className="criterio-edit-textarea"
                                placeholder="Descrição"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('criterios')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default CriteriosSection;

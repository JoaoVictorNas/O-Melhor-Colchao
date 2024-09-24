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
                        <h3 className="criterio-title">Critério {index + 1}: {criterio.titulo}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="criterio-content">
                            <input
                                type="text"
                                value={criterio.titulo}
                                onChange={(e) => updateCriterio(criterio.id, 'titulo', e.target.value)}
                                className="criterio-edit-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={criterio.descricao}
                                onChange={(e) => updateCriterio(criterio.id, 'descricao', e.target.value)}
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
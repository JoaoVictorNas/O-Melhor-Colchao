import React, { useState } from 'react';
import './OrgaosSection.css';

const ReguladoresAdminSection = ({ orgaos, updateOrgao, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="reguladores-admin-section">
            <h2 className="reguladores-admin-title">Editar Órgãos Regulamentadores</h2>
            {orgaos.map((orgao, index) => (
                <div key={orgao.id} className="reguladores-admin-item">
                    <div 
                        className={`reguladores-admin-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="reguladores-admin-orgao-title">Órgão Regulamentador {index + 1}: {orgao.title}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="reguladores-admin-content">
                            <input
                                type="text"
                                value={orgao.title}
                                onChange={(e) => updateOrgao(orgao.id, 'title', e.target.value)}
                                className="reguladores-admin-edit-input"
                                placeholder="Título"
                            />
                            <textarea
                                value={orgao.description}
                                onChange={(e) => updateOrgao(orgao.id, 'description', e.target.value)}
                                className="reguladores-admin-edit-textarea"
                                placeholder="Descrição"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="reguladores-admin-button-group">
                <button onClick={() => handleSave('orgaos')} className="reguladores-admin-save-button">Salvar</button>
            </div>
        </div>
    );
};

export default ReguladoresAdminSection;
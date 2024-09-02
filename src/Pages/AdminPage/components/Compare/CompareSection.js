import React, { useState } from 'react';
import './CompareSection.css';

const CompareSection = ({ compareItems, updateCompare, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Alterna a visibilidade do conteúdo da seção ativa
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleFeatureChange = (compareId, featureIndex, key, value) => {
        const updatedFeatures = [...compareItems];
        updatedFeatures[compareId].features[featureIndex][key] = value;
        updateCompare(compareId, 'features', updatedFeatures[compareId].features);
    };

    return (
        <div className="compare-section">
            <h2 className="compare-title">Editar Colchões do Ranking</h2>
            {compareItems.map((compare, index) => (
                <div key={compare.id} className="compare-item">
                    <div 
                        className={`compare-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="compare-item-title">Colchão Ranking {index + 1}: {compare.product}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="compare-content">
                            <input
                                type="text"
                                value={compare.brand}
                                onChange={(e) => updateCompare(compare.id, 'brand', e.target.value)}
                                className="compare-edit-input"
                                placeholder="Marca"
                            />
                            <input
                                type="text"
                                value={compare.product}
                                onChange={(e) => updateCompare(compare.id, 'product', e.target.value)}
                                className="compare-edit-input"
                                placeholder="Produto"
                            />
                            <input
                                type="text"
                                value={compare.reviewCount}
                                onChange={(e) => updateCompare(compare.id, 'reviewCount', e.target.value)}
                                className="compare-edit-input"
                                placeholder="Contagem de Avaliações"
                            />
                            {compare.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="feature-edit-group">
                                    <div className="feature-row">
                                        <input
                                            type="text"
                                            value={feature.feature}
                                            onChange={(e) => handleFeatureChange(compare.id, featureIndex, 'feature', e.target.value)}
                                            className="compare-edit-input feature-input"
                                            placeholder="Feature"
                                        />
                                        <input
                                            type="text"
                                            value={feature.rating}
                                            onChange={(e) => handleFeatureChange(compare.id, featureIndex, 'rating', e.target.value)}
                                            className="compare-edit-input rating-input"
                                            placeholder="Rating"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('compare')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default CompareSection;
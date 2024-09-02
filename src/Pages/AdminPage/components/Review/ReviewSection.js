import React, { useState } from 'react';
import './ReviewSection.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReviewSection = ({ reviews, updateReview, handleSave }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleQuillChange = (id, field, content) => {
        // Verifica se o valor atual é diferente do novo valor para evitar loops infinitos
        const currentReview = reviews.find(review => review.id === id);
        if (currentReview[field] !== content) {
            updateReview(id, field, content);
        }
    };

    return (
        <div className="review-section">
            <h2 className="section-title">Editar Reviews</h2>
            {reviews.map((review, index) => (
                <div key={review.id} className="review-item">
                    <div 
                        className={`review-header ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="review-title">Review {index + 1}: {review.product}</h3>
                    </div>
                    {activeIndex === index && (
                        <div className="review-content">
                            <input
                                type="text"
                                value={review.product}
                                onChange={(e) => updateReview(review.id, 'product', e.target.value)}
                                className="review-edit-input"
                                placeholder="Nome do Produto"
                            />
                            <ReactQuill
                                value={review.conclusao}
                                onChange={(content) => handleQuillChange(review.id, 'conclusao', content)}
                                className="review-edit-textarea"
                                placeholder="Conclusão"
                            />
                            <ReactQuill
                                value={review.sobre_marca}
                                onChange={(content) => handleQuillChange(review.id, 'sobre_marca', content)}
                                className="review-edit-textarea"
                                placeholder="Sobre a Marca"
                            />
                            <ReactQuill
                                value={review.sobre_colchao}
                                onChange={(content) => handleQuillChange(review.id, 'sobre_colchao', content)}
                                className="review-edit-textarea"
                                placeholder="Sobre o Colchão"
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="button-group">
                <button onClick={() => handleSave('review')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default ReviewSection;
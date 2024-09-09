import React, { useState } from 'react';
import './faqSection.css';

const FaqSection = ({ faq, setFaqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleVisibility = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFaq = faq.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFaqs(updatedFaq);
  }

  return (
    <div className="faq-section">
      <h2 className="section-title">Editar FAQs</h2>
      {faq.map((item, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
          <div onClick={() => toggleVisibility(index)}>
            {`Pergunta do Faq ${index + 1}: ${item.pergunta}`}
          </div>
          {activeIndex === index && (
            <>
              <input
                type="text"
                value={item.pergunta}
                onChange={(e) => handleInputChange(index, 'pergunta', e.target.value)}
                className="faq-input"
                placeholder="Pergunta"
              />
              <textarea
                value={item.resposta}
                onChange={(e) => handleInputChange(index, 'resposta', e.target.value)}
                className="faq-textarea"
                placeholder="Resposta"
              />
            </>
          )}
        </div>
      ))}
      <div className="button-group">
        <button className="save-button">Salvar</button>
      </div>
    </div>
  );
};

export default FaqSection;
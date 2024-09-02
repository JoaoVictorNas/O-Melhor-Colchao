import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './faq.css';

function Faq() {
    const [faq, setFaq] = useState([]);
        const [activeIndex, setActiveIndex] = useState(null);

    // Função para alternar a visibilidade das respostas
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(()=>{
        fetchFaq();
    }, [])

    const fetchFaq = async () => {
        try{
            const response = await axios.get('http://localhost:3001/api/faq');
            setFaq(response.data);
        } catch(error){
            console.error("Erro ao buscar Faq", error);
        }
    };

    return (
        <div className="faq-container" id="faq">
            <h1 className="faq-title">Perguntas Frequentes</h1>
            <div className="faq-list">
                {faq.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            {faq.pergunta}
                            <img 
                                src="https://bfbaby.com.br/up/seta.png" 
                                alt="Seta" 
                                className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`} 
                            />
                        </div>
                        {activeIndex === index && <div className="faq-answer">{faq.resposta}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Faq;
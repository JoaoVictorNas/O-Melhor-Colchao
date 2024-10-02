import React, { useState, useEffect } from 'react';
import './faq.css';
import dataCache from '../../dataCache'; // Certifique-se de que o caminho está correto

function Faq() {
    const [faq, setFaq] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    // Função para alternar a visibilidade das respostas
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Verifica se os dados de FAQ já foram carregados no dataCache
    useEffect(() => {
        const checkDataLoaded = () => {
            if (dataCache.faq && dataCache.faq.length > 0) {
                console.log("Dados de FAQ encontrados:", dataCache.faq);
                setFaq(dataCache.faq); // Armazena os dados no estado faq
            } else {
                console.log("Aguardando dados de FAQ serem carregados...");
                setTimeout(checkDataLoaded, 500); // Tenta novamente após 500ms
            }
        };

        checkDataLoaded(); // Chama a função para verificar os dados
    }, []); // Esse useEffect será executado apenas uma vez ao montar o componente

    return (
        <div className="faq-container" id="faq">
            <h1 className="faq-title">Perguntas Frequentes</h1>
            <div className="faq-list">
                {faq.map((faqItem, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            {faqItem.pergunta}
                            <img
                                src="https://bfbaby.com.br/up/seta.png"
                                alt="Seta"
                                className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}
                            />
                        </div>
                        <div className="faq-answer">{faqItem.resposta}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Faq;

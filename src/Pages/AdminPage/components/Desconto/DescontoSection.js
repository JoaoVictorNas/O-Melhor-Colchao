import React from 'react';
import './DescontoSection.css';

const DescontoSection = ({ descontoData, setDescontoData, handleSave }) => {
    return (
        <div className="desconto-section">
            <h2 className="section-title">Editar Desconto</h2>
            {descontoData && (
                <div className="desconto-edit-section">
                    <h3 className="desconto-item-label">Desconto</h3>
                    <textarea
                        value={descontoData.description}
                        onChange={(e) => setDescontoData({ ...descontoData, description: e.target.value })}
                        className="desconto-edit-textarea"
                        placeholder="Descrição"
                    />
                    <input
                        type="text"
                        value={descontoData.botao}
                        onChange={(e) => setDescontoData({ ...descontoData, botao: e.target.value })}
                        className="desconto-edit-input"
                        placeholder="Texto do Botão"
                    />
                </div>
            )}
            <div className="button-group">
                <button onClick={() => handleSave('desconto')} className="save-button">Salvar</button>
            </div>
        </div>
    );
};

export default DescontoSection;

import React, { useEffect, useState, useContext } from 'react';
import Map from '../Map/Map';

const CriarDenuncia: React.FC = () => {
  return (
    <div>
      <h1>Criar Denuncia</h1>
      <div className="card">
        <div className="left">
          <Map id="mapa" alt="MapaDeCampinas"/>
        </div>
        <div className="right">
          <p>Tipo</p>
          <select className="combo">
            <option value="Selecionar">Selecionar Tipo...</option>
            <option value="buraco">Buraco</option>
            <option value="asfalto">Asfalto danificado</option>
            <option value="grama">Grama alta</option>
            <option value="caminho">Via obstruída</option>
            <option value="agua">Inundação</option>
          </select>

          <p>Descrição (Conte-nos com detalhes sobre seu problema): </p>
          <textarea id="texto" cols={32} rows={4} style={{ resize: 'none' }}></textarea>

          <p>Imagem (Opcional)</p>
          <div className="image-upload">
            <label htmlFor="file-input">
              <img src="./img/imageDefault.png" alt="Imagem padrão" id="imagem" />
            </label>
            <input id="file-input" type="file" style={{ display: 'none' }} />
          </div>

          <div className="buttons">
            <input type="button" value="Cancelar" id="cancel" />
            <input type="button" value="Criar denuncia" id="create" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarDenuncia;

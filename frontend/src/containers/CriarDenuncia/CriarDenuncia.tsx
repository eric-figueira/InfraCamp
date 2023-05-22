import React, { useEffect, useState, useContext, ChangeEventHandler } from 'react';
import Map from '../Map/Map';
import "./CriarDenuncia.css"
import Imagem from "../../assets/imgs/imageDefault.png";
import plusIcon from "../../assets/imgs/plus-icon.png";

const CriarDenuncia: React.FC = () => {

  const [img1, setImg1] = useState<string>(Imagem);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader();
    reader.onload = e => {
        setImg1(e?.target?.result as string);
    }

    const file = (e.target.files?.item(0));
    if (file !== null && file !== undefined)
        reader.readAsDataURL(file);
}

  const setPlusVisible = (isVisible: boolean) => {
    const img2 = (document.querySelector("#imagem") as HTMLImageElement)
    if (isVisible) {
      img2.src = plusIcon;
      img2.setAttribute("style", "filter: invert() ");
    }
    else {
      img2.src = Imagem
      img2.setAttribute("style", "filter: none");
    }
  }

  return (
    <div>
      <h1 className="title">Criar Denúncia</h1>
      <div className="card">
        <div className="left">
          <Map idDiv="mapa" hasSearchBar={true} />
        </div>
        <div className="right">
          <p>Tipo</p>
          <select title="tipo" className="combo">
            <option value="Selecionar">Selecionar Tipo...</option>
            <option value="buraco">Buraco</option>
            <option value="asfalto">Asfalto danificado</option>
            <option value="grama">Grama alta</option>
            <option value="caminho">Via obstruída</option>
            <option value="agua">Inundação</option>
          </select>

          <p>Descrição (Conte-nos com detalhes sobre seu problema): </p>
          <textarea title="descricao" id="texto" cols={32} rows={4} style={{ resize: 'none' }}></textarea>

          <p>Imagem (Opcional)</p>
          <div className="image-upload">
            <label htmlFor="file-input">
              <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg, image/jfif, image/webp" onChange={handleChange} />
              <img id="imagem" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} src={img1} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)}/> 
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

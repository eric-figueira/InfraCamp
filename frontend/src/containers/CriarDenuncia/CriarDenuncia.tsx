/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, ChangeEventHandler } from 'react';
import Map from '../Map/Map';
import "./CriarDenuncia.css"
import Imagem from "../../assets/imgs/imageDefault.png";
import plusIcon from "../../assets/imgs/plus-icon-large.png";

import { useGet } from '../../hooks/useGet';
import Tipo from '../../types/Tipo';
import Button from '../../components/Button/Button';
import { colorPallete } from '../../styles/colors';
import { api } from '../../services/api';
import Denuncia from '../../types/Denuncia';
import { AuthContext } from '../../contexts/AuthContext';

const CriarDenuncia: React.FC = () => {

  const { user } = useContext(AuthContext);

  const { data: tipos } = useGet<Tipo[]>("api/tiposDenuncia")

  const [denuncia, setDenuncia] = useState<Denuncia>({ cpf: "", dataDenuncia: new Date(), descricao: "", endereco: "", idDenuncia: 0, idStatus: 1, idTipo: 1, latitude: 0, longitude: 0, urlImagem: Imagem });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader();
    reader.onload = e => {
      setDenuncia({ ...denuncia, urlImagem: e?.target?.result as string } as Denuncia);
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
      img2.src = (denuncia as Denuncia).urlImagem;
      img2.setAttribute("style", "filter: none");
    }
  }

  const handleSalvar = () => {
    denuncia.cpf = user ? user.cpf : "";
    denuncia.dataDenuncia = new Date();

    console.log(JSON.stringify(denuncia))
    api.post("api/denuncias", denuncia)
      .then(() => {
        window.location.href = "http://localhost:3000/user";
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleCancelar = () => {
    window.history.back();
  }

  return (
    <div>
      <h1 className="title">Criar Denúncia</h1>
      <div className="create">
        <div className="left">
          <p>Endereço:</p>
          <Map denuncia={denuncia} setDenuncia={setDenuncia} idDiv="mapa" hasSearchBar={true} />
        </div>
        <div className="right">
          <p>Tipo:</p>
          <select title="tipo" className="combo" onChange={({target}) => {
            setDenuncia({...denuncia, idTipo: (target as HTMLSelectElement).selectedIndex + 1} as Denuncia);
          }}>
            {
              tipos?.map(tipo => {
                return <option value={tipo.idTipo as number}>{tipo.tipo}</option>
              })
            }
          </select>

          <p>Descrição (Conte-nos com detalhes sobre seu problema): </p>
          <textarea title="descricao" id="texto" cols={32} rows={4} style={{ resize: 'none' }} placeholder="Digite seu texto aqui" value={denuncia.descricao} 
          onChange={({target}) => setDenuncia({...denuncia, descricao: target.value as string} as Denuncia)}></textarea>

          <p>Imagem (Opcional)</p>
          <div className="image-upload">

            <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg, image/jfif, image/webp" onChange={handleChange} />

            <img id="imagem" alt="imagem" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} src={denuncia?.urlImagem} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)} />

          </div>

          <div className="buttons">
            <Button backgroundColor={"#941D1D"} fontColor={colorPallete.bgWhite} text="Cancelar" eventHandler={() => handleCancelar()} />

            <Button backgroundColor={colorPallete.bgGreen} fontColor={colorPallete.bgWhite} text="Salvar" eventHandler={() => handleSalvar()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarDenuncia;

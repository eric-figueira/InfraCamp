/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, ChangeEventHandler } from 'react';
import Map from '../Map/Map';
import "./CriarDenuncia.css"
import Imagem from "../../assets/imgs/imageDefault.png";
import ImagemDenuncia from "../../assets/imgs/imgDefaultComplaint.png";
import plusIcon from "../../assets/imgs/plus-icon.png";

import { useGet } from '../../hooks/useGet';
import Tipo from '../../types/Tipo';
import Button from '../../components/Button/Button';
import { colorPallete } from '../../styles/colors';
import { api } from '../../services/api';
import Denuncia from '../../types/Denuncia';
import { AuthContext } from '../../contexts/AuthContext';
import { DenunciaContext } from '../../contexts/DenunciaContext';

interface ICriarDenuncia {
  type: string;
}

// {"idDenuncia":11,"latitude":-22.942759,"longitude":-47.154498,"endereco":"Rua Lúcio Esteves, Campinas, São Paulo 13059-107, Brasil","idTipo":9,"tipoDenuncia":null,"idStatus":2,"statusDenuncia":null,"urlImagem":"https://imagens.ebc.com.br/N0TMbOV6Qdaa1s5nNt5fQA2OR-Y=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/atoms/image/torneira_de_agua.jpg?itok=8Z-UUALl","descricao":"Há 12 dias que a água não chega aqui no bairro, e vocês corruptos em suas mansões de luxo. A como eu odeio minha vida aaaaa","cpf":"547.049.728-36","usuario":null,"dataDenuncia":"2023-05-04T01:23:02.487","opinioes":[]}
const CriarDenuncia: React.FC<ICriarDenuncia> = (props) => {
  const { user } = useContext(AuthContext);
  const idDenuncia = useContext(DenunciaContext);

  let { data: previousComplaint } = useGet<Denuncia>("api/denuncias/" + idDenuncia);

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
    }
    else {
      img2.src = (denuncia as Denuncia).urlImagem;
    }
  }

  const handleSalvar = () => {
    denuncia.cpf = user ? user.cpf : "";
    denuncia.dataDenuncia = new Date();
    if (denuncia.urlImagem === Imagem)
      denuncia.urlImagem = ImagemDenuncia;

    console.log(JSON.stringify(denuncia))
    api.post("api/denuncias", denuncia)
      .then(() => {
        window.location.href = "http://localhost:3000/user";
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleEditar = () => {

  }

  const handleCancelar = () => {
    window.history.back();
  }

  return (
    <div>
      <h1 className="title">{props.type === 'edit' ? "Editar Denúncia" : "Criar denúncia"}</h1>
      <div className="create">
        <div className="left">
        <p>Tipo:</p>
          <select title="tipo" className="combo" onChange={({ target }) => {
            setDenuncia({ ...denuncia, idTipo: (target as HTMLSelectElement).selectedIndex + 1 } as Denuncia);
          }}>
            {
              tipos?.map(tipo => {
                return <option value={tipo.idTipo as number} selected={props.type === 'edit' ? (tipo.idTipo === previousComplaint?.idTipo ? true : false) : false} >{tipo.tipo}</option>
              })
            }
          </select>

          <p>Endereço:</p>
          <Map denuncia={props.type === 'edit' ? previousComplaint as Denuncia : denuncia} setDenuncia={setDenuncia} idDiv="mapa" hasSearchBar={true} />
        </div>
        <div className="right">          
          <p>Descrição (Conte-nos com detalhes sobre seu problema): </p>
          <textarea
            title="descricao"
            id="texto" cols={32} rows={4} style={{ resize: 'none' }} placeholder="Digite seu texto aqui" value={props.type === 'edit' ? previousComplaint?.descricao : ""}
            onChange={({ target }) => setDenuncia({ ...denuncia, descricao: target.value as string } as Denuncia)}>
          </textarea>
          <p>Imagem (Opcional)</p>
          <div className="image-upload">

            <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg, image/jfif, image/webp" onChange={handleChange} />

            <img id="imagem" alt="imagem" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} src={denuncia?.urlImagem} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)} />

          </div>

          <div className="buttons">
            <Button backgroundColor={"#941D1D"} fontColor={colorPallete.bgWhite} text="Cancelar" eventHandler={() => handleCancelar()} />

            {props.type === "create" ?
              <Button backgroundColor={colorPallete.bgGreen} fontColor={colorPallete.bgWhite} text="Salvar" eventHandler={() => handleSalvar()} /> :
              <Button backgroundColor={colorPallete.bgGreen} fontColor={colorPallete.bgWhite} text="Salvar" eventHandler={() => handleEditar()} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarDenuncia;

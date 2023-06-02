/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, ChangeEventHandler, useEffect } from 'react';

import "./CriarDenuncia.css"
import { colorPallete } from '../../styles/colors';
import Imagem from "../../assets/imgs/imageDefault.png";
import ImagemDenuncia from "../../assets/imgs/imgDefaultComplaint.png";
import plusIcon from "../../assets/imgs/plus-icon.png";

import { useGet } from '../../hooks/useGet';

import Tipo from '../../types/Tipo';
import Denuncia from '../../types/Denuncia';

import Button from '../../components/Button/Button';
import Map from '../Map/Map';

import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

interface ICriarDenuncia {
  type: string;
}

const CriarDenuncia: React.FC<ICriarDenuncia> = (props) => {
  const { user } = useContext(AuthContext);

  const location = useLocation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParameters = new URLSearchParams(location.search)

  const { data: tipos } = useGet<Tipo[]>("api/tiposDenuncia")

  const [denuncia, setDenuncia] = useState<Denuncia>({ cpf: "", dataDenuncia: new Date(), descricao: "", endereco: "", idDenuncia: 0, idStatus: 1, idTipo: 1, latitude: 0, longitude: 0, urlImagem: Imagem } as Denuncia);

  useEffect(() => {
    api.get("api/denuncias/" + queryParameters.get("id"))
      .then(({ data }) => setDenuncia(data))
      .catch(error => console.log(error));
  }, [])

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
    denuncia.cpf = user ? user.cpf : "";
    denuncia.dataDenuncia = new Date();
    if (denuncia.urlImagem === Imagem)
      denuncia.urlImagem = ImagemDenuncia;

    alert(JSON.stringify(denuncia))
    api.put("api/denuncias", denuncia)
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
      <h1 className="title">{props.type === 'edit' ? "Editar Denúncia" : "Criar denúncia"}</h1>
      <div className="create">
        <div className="left">
          <p>Tipo:</p>
          <select title="tipo" className="combo" onChange={({ target }) => {
            setDenuncia({ ...denuncia, idTipo: Number((target as HTMLSelectElement).value) } as Denuncia);
          }}>
            {
              tipos?.map(tipo => {
                return <option value={tipo.idTipo as number} selected={tipo.idTipo === denuncia?.idTipo ? true : false} >{tipo.tipo}</option>
              })
            }
          </select>

          <p>Endereço:</p>
          <Map denuncia={denuncia} setDenuncia={setDenuncia} idDiv="mapa" hasSearchBar={true} />
        </div>
        <div className="right">
          <p>Descrição (Conte-nos com detalhes sobre seu problema): </p>
          <textarea
            title="descricao"
            id="texto" cols={32} rows={4} style={{ resize: 'none' }} placeholder="Digite seu texto aqui" value={denuncia.descricao}
            onChange={({ target }) => setDenuncia({ ...denuncia, descricao: target.value as string } as Denuncia)}>
          </textarea>
          <p>Imagem (Opcional)</p>
          <div className="image-upload">

            <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg, image/jfif, image/webp" onChange={handleChange} />

            <img id="imagem" alt="imagem" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} src={denuncia.urlImagem} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)} />

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

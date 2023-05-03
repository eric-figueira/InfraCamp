import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Usuario from "../../types/Usuario";
import { api } from "../../services/api";

import './ProfilePage.css';

import Denuncia from "../../types/Denuncia";
import { useGet } from "../../hooks/useGet";
import Card from "../../components/Card/Card";

const ProfilePage: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>();
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias/denunciasUsuario/547.049.728-36");

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/547.049.728-36").then(resp => {
            setUsuario(resp.data);
        })
    }, [])

    const handleClickEditar = () => {
        let a: HTMLCollectionOf<Element> = document.getElementsByClassName("field-input");
        for (let i = 0; i < a.length; i += 1) {
            let b = a.item(i) as HTMLInputElement;
            if (b !== null)
                b.disabled = false;
        }
        let buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("button");
        let c = buttons.item(0) as HTMLButtonElement
        c.textContent = "Salvar";

        c.onclick = handleClickSalvar;
    }

    const handleClickSalvar: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null = () => {

    }

    const handleClickDeletar = () => {

    }

    return (
        <div>
            <div className="card">
                <div className="left">
                    <div className="img">
                        <img src={usuario?.urlImagem} alt="user"/>
                    </div>
                    <h4>{usuario?.nome}</h4>
                    <p>Senha:{usuario?.senha}</p>
                    <p>Telefone:{usuario?.telefone} </p>
                    <p>Email:{usuario?.email}</p>

                    <div className="button">
                        <Button width="200px" backgroundColor="#941D1D" fontColor="#FFFFFF" text="Deletar" eventHandler={handleClickDeletar}></Button>
                        <Button  width="200px" backgroundColor="#222533" fontColor="#FFFFFF" text="Atualizar" eventHandler={handleClickEditar}></Button>
                    </div>

                </div>

                <div className="right">
                    {
                        denuncias?.map(
                            // eslint-disable-next-line array-callback-return
                            function (denuncia) {
                                if (denuncia.cpf === '547.049.728-36') {
                                    return (
                                        <Card key={denuncia.idDenuncia} idDenuncia={denuncia.idDenuncia} cpf={denuncia.cpf} date={denuncia.dataDenuncia} idTipo={denuncia.idTipo} address={denuncia.endereco} description={denuncia.descricao} idStatus={denuncia.idStatus} imgUrl={denuncia.urlImagem}></Card>
                                    )
                                }
                            })
                    }
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;
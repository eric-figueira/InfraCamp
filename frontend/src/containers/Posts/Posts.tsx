import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import Filter from '../../components/Filter/Filter';
import Denuncia from '../../types/Denuncia';

import "./Posts.css";
import { Filtro } from '../../types/Filtro';

const Posts: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");
    const [filtro, setFiltro] = useState<string>("");
    const [index, setIndex] = useState<Number>(-1);

    const filter = (filtro: Filtro, index: Number) => {
        setFiltro(filtro);
        setIndex(index);
    }

    return (
        <div id="postagens">
            <h1>Postagens</h1>
            <div className="header">
                <div className="content">
                    <div className="number">{denuncias?.length}</div>
                    <div className="subtitle">{denuncias?.length !== undefined ? (denuncias?.length > 1 ? "Denúncias feitas" : "Denúncia feita") : ""} </div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus === 5).length}</div>
                    <div className="subtitle">{denuncias?.filter(denuncia => denuncia.idStatus === 5).length !== undefined ? (denuncias?.filter(denuncia => denuncia.idStatus === 5).length !== 1 ? "Problemas resolvidos" : "Problema resolvido") : ""}</div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length}</div>
                    <div className="subtitle">{denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length !== undefined ? (denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length !== 1 ? "Problemas pendentes" : "Problema pendente") : ""}</div>
                </div>
            </div>

            <Filter filterComplaints={filter} />

            <div className="posts">
                {
                    filtro === "" &&
                    denuncias?.map((denuncia) =>
                        <Post
                            key={denuncia.idDenuncia}
                            idDenuncia={denuncia.idDenuncia}
                            cpf={denuncia.cpf}
                            date={denuncia.dataDenuncia}
                            idTipo={denuncia.idTipo}
                            address={denuncia.endereco}
                            description={denuncia.descricao}
                            idStatus={denuncia.idStatus}
                            imgUrl={denuncia.urlImagem}
                        />
                    )
                }
                {
                    filtro === "status" &&
                    denuncias?.filter((denuncia) => denuncia.idStatus === index)
                        .map((denuncia) =>
                            <Post
                                key={denuncia.idDenuncia}
                                idDenuncia={denuncia.idDenuncia}
                                cpf={denuncia.cpf}
                                date={denuncia.dataDenuncia}
                                idTipo={denuncia.idTipo}
                                address={denuncia.endereco}
                                description={denuncia.descricao}
                                idStatus={denuncia.idStatus}
                                imgUrl={denuncia.urlImagem}
                            />
                        )
                }
                {
                    filtro === "tipo" &&
                    denuncias?.filter((denuncia) => denuncia.idTipo === index)
                        .map((denuncia) =>
                            <Post
                                key={denuncia.idDenuncia}
                                idDenuncia={denuncia.idDenuncia}
                                cpf={denuncia.cpf}
                                date={denuncia.dataDenuncia}
                                idTipo={denuncia.idTipo}
                                address={denuncia.endereco}
                                description={denuncia.descricao}
                                idStatus={denuncia.idStatus}
                                imgUrl={denuncia.urlImagem}
                            />
                        )
                }
            </div>
        </div>
    )
}

export default Posts;
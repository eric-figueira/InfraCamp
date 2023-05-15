import React, { useEffect, useState, useContext } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import Filter from '../../components/Filter/Filter';
import Denuncia from '../../types/Denuncia';

import "./Posts.css";
import { ETypes, Message } from '../../components/Message/Message';


import { api } from '../../services/api';

import { AuthContext } from '../../contexts/AuthContext';


const Posts: React.FC = () => {

    const { user } = useContext(AuthContext)

    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");
    const [usedDenuncias, setUsedDenuncias] = useState<Denuncia[]>();

    const [ixStatus, setIxStatus] = useState<Number>(0);
    const [ixTipo, setIxTipo] = useState<Number>(0);
    const [ixOrdem, setIxOrdem] = useState<Number>(0);

    useEffect(() => 
    {
        api.get(`api/denuncias/filtrar/${ixTipo}/${ixStatus}/${ixOrdem}`).then(resp => setUsedDenuncias(resp.data))

    }, [denuncias, ixStatus, ixTipo, ixOrdem])

    const filtrarPorTipo = (ixTipo?: Number) => {
        setIxTipo(ixTipo ? ixTipo : 0);
    }

    const filtrarPorStatus = (ixStatus?: Number) => {
        setIxStatus(ixStatus ? ixStatus : 0);
    }

    const filtrarPorOrdem = (ixOrdem?: Number) => {
        setIxOrdem(ixOrdem ? ixOrdem : 0);
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

            <Filter filtrarPorTipo={filtrarPorTipo} filtrarPorStatus={filtrarPorStatus} filtrarPorOrdem={filtrarPorOrdem} />

            <div className="posts">
                {
                    usedDenuncias?.length !== 0 &&
                    !user?.funcionario ?
                    usedDenuncias?.filter(denuncia => denuncia.idStatus != 3).map((denuncia) =>
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
                    :
                    usedDenuncias?.map((denuncia) =>
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
                    usedDenuncias?.length === 0 &&
                    <div className="message_no_complaints">
                        <Message text="Não há denúncias com as características especificadas" isVisible={true} type={ETypes.Info} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Posts;
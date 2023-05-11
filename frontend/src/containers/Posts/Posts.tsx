import React, { SetStateAction, useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import Filter from '../../components/Filter/Filter';
import Denuncia from '../../types/Denuncia';

import "./Posts.css";
import { ETypes, Message } from '../../components/Message/Message';

const Posts: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");
    const [usedDenuncias, setUsedDenuncias] = useState<Denuncia[]>();
    const [status, setStatus] = useState<boolean>(false);
    const [tipo, setTipo] = useState<boolean>(false)
    const [ixStatus, setIxStatus] = useState<Number>(0);
    const [ixTipo, setIxTipo] = useState<Number>(0);

    useEffect(() => {
        if (status === false && tipo === false)
            setUsedDenuncias(denuncias ? denuncias : []);
        else if (tipo === true && status === false)
            setUsedDenuncias(denuncias?.filter((denuncia) => denuncia.idTipo === ixTipo));
        else if (status === true && tipo === false)
            setUsedDenuncias(denuncias?.filter((denuncia) => denuncia.idStatus === ixStatus));
        else
            setUsedDenuncias(denuncias?.filter((denuncia) => denuncia.idStatus === ixStatus && denuncia.idTipo === ixTipo))
    }, [denuncias, ixStatus, ixTipo, status, tipo])

    const filterTipo = (tipo?: SetStateAction<boolean>, ixTipo?: Number) => {
        setTipo(tipo ? tipo : false)
        setIxTipo(ixTipo ? ixTipo : -1);
    }

    const filterStatus = (status?: SetStateAction<boolean>, ixStatus?: Number) => {
        setStatus(status ? status : false);
        setIxStatus(ixStatus ? ixStatus : -1);
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

            <Filter filterTipo={filterTipo} filterStatus={filterStatus} />

            <div className="posts">
                {
                    usedDenuncias?.length !== 0 &&
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
import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import { api } from '../../services/api';
import Denuncia from '../../types/Denuncia';
import Tipo from '../../types/Tipo';
import Status from '../../types/Status';
import Usuario from '../../types/Usuario';

import "./Postagens.css";

const Postagens: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");

    return (
        <div id="postagens">
            <h1>Postagens</h1>
            <div className="header">
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.length}</p>
                    <p className="statistics_info">denúncias feitas</p>
                </div>
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.filter(denuncia => denuncia.idStatus === 5).length}</p>
                    <p className="statistics_info">problemas resolvidos</p>
                </div>
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length}</p>
                    <p className="statistics_info">problemas pendentes</p>
                </div>
            </div>
            <div className="posts">
                {
                    denuncias?.map(
                        function (denuncia) {
                            return (
                                <Post key={denuncia.idDenuncia} idDenuncia={denuncia.idDenuncia} cpf={denuncia.cpf} date={denuncia.dataDenuncia} idTipo={denuncia.idTipo} address={denuncia.endereco} description={denuncia.descricao} idStatus={denuncia.idStatus} imgUrl={denuncia.urlImagem}></Post>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Postagens;
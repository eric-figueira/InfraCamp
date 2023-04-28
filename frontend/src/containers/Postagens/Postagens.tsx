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
    const [ tipo, setTipo ] = useState<Tipo>({idTipo: 0, tipo: ""});
    const [ status, setStatus ] = useState<Status>({idStatus: 0, status: ""});
    const [ usuario, setUsuario ] = useState<Usuario>();

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
                            api.get("http://localhost:5164/api/tiposDenuncia/"+denuncia.idTipo).then(
                                resp => {setTipo(resp.data)}
                            )
                            api.get("http://localhost:5164/api/statusDenuncia/"+denuncia.idStatus).then(
                                resp => {setStatus(resp.data)}
                            )
                            api.get("http://localhost:5164/api/usuarios/"+denuncia.cpf).then(
                                resp => {setUsuario(resp.data)}
                            )

                            return (
                                <Post idDenuncia={denuncia.idDenuncia} cpf={denuncia.cpf} userName={usuario === undefined ? "" : usuario.nome} date={denuncia.dataDenuncia} type={tipo.tipo} address={denuncia.endereco} description={denuncia.descricao} status={status.status} imgUrl={denuncia.urlImagem}></Post>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Postagens;
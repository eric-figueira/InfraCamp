import React from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import Denuncia from '../../types/Denuncia';

import "./Postagens.css";

const Postagens: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");

    return (
        <div id="postagens">
            <h1>Postagens</h1>
            <div className="header">
                <div className="content">
                    <div className="number">{denuncias?.length}</div>
                    <div className="subtitle">Denuncias feitas</div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus === 5).length}</div>
                    <div className="subtitle">Problemas resolvidos</div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length}</div>
                    <div className="subtitle">Problemas pendentes</div>
                </div>
            </div>

            {
                denuncias?.map((denuncia) => 
                    <Post 
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
    )
}

export default Postagens;
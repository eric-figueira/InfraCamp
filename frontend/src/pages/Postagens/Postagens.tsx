import React from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import Denuncia from '../../types/Denuncia';
import Opiniao from '../../types/Opiniao';
import Usuario from '../../types/Usuario';
import { data } from '@maptiler/sdk';

const Postagens: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("api/denuncias");
    let opinioes = useGet<Opiniao[]>("api/opinioes");
    let usuarios = useGet<Usuario[]>("api/usuarios");

    return (
        <div>
            <h1>Postagens</h1>
            <div className="header">
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.length}</p>
                    <p className="statistics_info">denúncias feitas</p>
                </div>
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.filter(denuncia => denuncia.idStatusDenuncia === 5).length}</p>
                    <p className="statistics_info">problemas resolvidos</p>
                </div>
                <div className="statistics">
                    <p className="statistics_number">{denuncias?.filter(denuncia => denuncia.idStatusDenuncia !== 5 && denuncia.idStatusDenuncia !== 3).length}</p>
                    <p className="statistics_info">problemas pendentes</p>
                </div>
            </div>
            <div className="posts">
                {}
            </div>
        </div>
    )
}

export default Postagens;
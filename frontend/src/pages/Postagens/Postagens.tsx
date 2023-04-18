import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';
import Denuncia from '../../types/Denuncia';
import Opiniao from '../../types/Opiniao';
import Usuario from '../../types/Usuario';
import { data } from '@maptiler/sdk';
import myContext from '../../contexts/postContext'

const Postagens: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("api/denuncias");
    const { data: opiniao } = usePost<Opiniao[]>("api/opinioes");
    let [ opinioes, setOpinioes ] = useState()
    let usuarios = useGet<Usuario[]>("api/usuarios");
    
    return (
        <myContext.Provider value={[opinioes, setOpinioes]}>
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
                {
                    denuncias?.map(denuncia => {
                        let array = usuarios?.data?.map(usuario => 
                            usuario.cpf === denuncia.idUsuario ? usuario : denuncia)

                        <Post cpf={denuncia.idUsuario} userName={} />
                    )})
                }
            </div>
        </myContext.Provider>      
    )
}

export default Postagens;
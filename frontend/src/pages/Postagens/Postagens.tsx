import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import useFetch from '../../hooks/useFetch';
import Denuncia from '../../types/Denuncia';
import Opiniao from '../../types/Opiniao';
import myContext from '../../contexts/postContext'

const Postagens: React.FC = () => {
    const { data: denuncias } = useFetch<Denuncia[]>("api/denuncias");
    const { data: op } = useFetch<Opiniao[]>("api/opinioes");
    let [opinioes, setOpinioes] = useState(op);

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
                    denuncias?.map(
                        denuncia =>
                            <Post cpf={denuncia.idUsuario} userName={denuncia.nome} date={denuncia.dataDenuncia} type={denuncia.tipo} address={denuncia.endereco} description={denuncia.descricao} status={denuncia.status} imgUrl={denuncia.urlImagem} likes={denuncia.likes} ></Post>
                    )
                }
            </div>
        </myContext.Provider>
    )
}

export default Postagens;
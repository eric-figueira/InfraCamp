import React from "react";
import { PlusCircle } from "phosphor-react"
import { useGet } from "../../hooks/useGet";
import Denuncia from "../../types/Denuncia";
import Card from "../Card/Card";

import './Complaints.css';

const Complaints: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias/denunciasUsuario/547.049.728-36");

    return (
        <div id="your_posts">
            <div className="create_denuncia">
                <PlusCircle />
            </div>
            {
                denuncias?.map(
                    function (denuncia) {
                        if (denuncia.cpf === '547.049.728-36') {
                            return (
                                <Card key={denuncia.idDenuncia} idDenuncia={denuncia.idDenuncia} cpf={denuncia.cpf} date={denuncia.dataDenuncia} idTipo={denuncia.idTipo} address={denuncia.endereco} description={denuncia.descricao} idStatus={denuncia.idStatus} imgUrl={denuncia.urlImagem}></Card>
                            )
                        }
                    })
            }
        </div>
    )
}

export default Complaints;
import React, { useState, useEffect } from "react";
import Usuario from "../../types/Usuario";
import Button from "../../components/Button/Button";
import { api } from "../../services/api";
import Denuncia from "../../types/Denuncia";

import './User.css';
import { useGet } from "../../hooks/useGet";
import Card from "../../components/Card/Card";
import Complaint from "../../components/Complaint/Complaint";

export interface ComplaintData {
    idDenuncia?: number;
    cpf?: string,
    date?: Date,
    idTipo?: number,
    address?: string,
    description?: string,
    idStatus?: number,
    imgUrl?: string
}

export const User: React.FC = () => {

    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<ComplaintData>()

    const [usuario, setUsuario] = useState<Usuario>();
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias/denunciasUsuario/547.049.728-36");

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/547.049.728-36").then(resp => {
            setUsuario(resp.data);
        })
    }, [])

    const toggleComplaint = () => { setShowComplaint(!showComplaint) }
    const setComplaintData = (props: ComplaintData) => { setComplaint(props) }

    const handleClickEditar = () => {
    }

    const handleClickDeletar = () => {
    }

    return (
        <div className="user">
            <div className="left">
                <div className="img">
                    <img src={usuario?.urlImagem} alt="user" />
                </div>
                <h4>{usuario?.nome}</h4>
                <p>Senha: {usuario?.senha.replace(/[a-zA-Z0-9]/g, '•')}</p>
                <p>Telefone: {usuario?.telefone} </p>
                <p>Email: {usuario?.email}</p>

                <div className="button">
                    <Button width="200px" backgroundColor="#941D1D" fontColor="#FFFFFF" text="Deletar" eventHandler={handleClickDeletar}></Button>
                    <Button width="200px" backgroundColor="#222533" fontColor="#FFFFFF" text="Atualizar" eventHandler={handleClickEditar}></Button>
                </div>
            </div>
            <div className="right">
                {
                    denuncias?.map(
                        // eslint-disable-next-line array-callback-return
                        function (denuncia) {
                            if (denuncia.cpf === '547.049.728-36') {
                                return (
                                    <Card
                                        key={denuncia.idDenuncia}
                                        idDenuncia={denuncia.idDenuncia}
                                        cpf={denuncia.cpf}
                                        date={denuncia.dataDenuncia}
                                        idTipo={denuncia.idTipo}
                                        address={denuncia.endereco}
                                        description={denuncia.descricao}
                                        idStatus={denuncia.idStatus}
                                        imgUrl={denuncia.urlImagem}
                                        handleToggleComplaint={toggleComplaint}
                                        setComplaint={setComplaintData}
                                    ></Card>
                                )
                            }
                        })
                }
            </div>
            {showComplaint && <Complaint isVisible={showComplaint} setVisible={setShowComplaint} cpf={complaint?.cpf} idDenunia={complaint?.idDenuncia} date={complaint?.date} idTipo={complaint?.idTipo} address={complaint?.address} description={complaint?.description} idStatus={complaint?.idStatus} imgUrl={complaint?.imgUrl} />}
        </div >
    )
}
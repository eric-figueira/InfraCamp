import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";
import Denuncia from "../../types/Denuncia";

import { IMask } from "react-imask";

import './User.css';
import { useGet } from "../../hooks/useGet";
import Card from "../../components/Card/Card";
import Complaint from "../../components/Complaint/Complaint";

import { AuthContext } from "../../contexts/AuthContext";

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

    const { user } = useContext(AuthContext)

    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<ComplaintData>()

    const { data: denuncias } = useGet<Denuncia[]>(`/api/denuncias/denunciasUsuario/${user?.cpf}`);


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
                    <img src={user?.avatar_url} alt="user" />
                </div>
                <h4>{user?.nome}</h4>
                <p>Senha: ••••••••</p>
                <p>Telefone: {user?.telefone} </p>
                <p>Email: {user?.email}</p>

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
                            if (denuncia.cpf === user?.cpf) {
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
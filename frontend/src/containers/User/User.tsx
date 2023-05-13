import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";
import Denuncia from "../../types/Denuncia";

import { IMask } from "react-imask";

import './User.css';
import { useGet } from "../../hooks/useGet";
import Card from "../../components/Card/Card";
import Complaint from "../../components/Complaint/Complaint";

import { AuthContext, IUser } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import Usuario from "../../types/Usuario";

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

    const { user, LogOut } = useContext(AuthContext)

    const [usuario, setUsuario] = useState<IUser>(user ? user : {} as IUser);

    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<ComplaintData>()

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { data: denuncias } = useGet<Denuncia[]>(`/api/denuncias/denunciasUsuario/${user?.cpf}`);

    const toggleComplaint = () => { setShowComplaint(!showComplaint) }
    const setComplaintData = (props: ComplaintData) => { setComplaint(props) }

    const handleClickEditar = () => {
        setIsEditing(true);
    }

    const handleClickDeletar = () => {
        // api.delete('api/usuarios/' + user?.cpf)
        //     .then(() => LogOut());
    }

    const handleClickCancelar = () => {
        setIsEditing(false);
    }

    const handleClickSalvar = () => {
        api.put('api/usuarios', usuario)
            .then(resp => setUsuario(resp.data))
            .catch(error => console.log(error));
    }

    return (
        <div className="user">
            <div className="left">
                <div className="img">
                    {
                        user?.avatar_url && <img src={user?.avatar_url} alt="user" />
                    }
                    {
                        !user?.avatar_url && <img src="../../assets/imgs/user-icon.png" alt="user" />
                    }
                </div>
                {
                    isEditing &&
                    <>
                        <div className="info-titles">
                            <p>Nome:</p>
                            <p>Telefone:</p>
                            <p>Email:</p>
                        </div>
                        <div className="info-values">
                            <input type="text" title="username" value={usuario.nome} onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} />
                            <input type="text" title="phone" value={usuario.telefone} onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })} />
                            <input type="text" title="email" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} />
                        </div>
                    </>
                }
                {
                    !isEditing &&
                    <>
                        <h4>{user?.nome}</h4>
                        <p>Telefone: {user?.telefone} </p>
                        <p>Email: {user?.email}</p>
                        <p>Senha: ••••••••</p>
                    </>
                }

                <div className="button">
                    <Button width="200px" backgroundColor={isEditing ? "#44a676" : "#222533"} fontColor="#FFFFFF" text={isEditing ? "Salvar" : "Editar"} eventHandler={isEditing ? handleClickSalvar : handleClickEditar}></Button>
                    <Button width="200px" backgroundColor={isEditing ? "#222533" : "#941D1D"} fontColor="#FFFFFF" text={isEditing ? "Cancelar" : "Deletar"} eventHandler={isEditing ? handleClickCancelar : handleClickDeletar}></Button>
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
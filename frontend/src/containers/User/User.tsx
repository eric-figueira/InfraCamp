import React, { useState, useEffect, useContext, ChangeEventHandler } from "react";
import Button from "../../components/Button/Button";
import Denuncia from "../../types/Denuncia";

import { IMaskInput } from "react-imask";

import './User.css';
import { useGet } from "../../hooks/useGet";
import Card from "../../components/Card/Card";
import Complaint from "../../components/Complaint/Complaint";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import Usuario from "../../types/Usuario";
import { MaskedRange } from "imask";
import { PlusCircle } from "phosphor-react";

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
    const { user } = useContext(AuthContext);

    const [usuario, setUsuario] = useState<Usuario>();

    const [plusVisible, setPlusVisible] = useState<boolean>();

    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<ComplaintData>()

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { data: denuncias } = useGet<Denuncia[]>(`/api/denuncias/denunciasUsuario/${user?.cpf}`);

    const toggleComplaint = () => { setShowComplaint(!showComplaint) }
    const setComplaintData = (props: ComplaintData) => { setComplaint(props) }

    useEffect(() => {
        api.get('api/usuarios/' + user?.cpf)
            .then(resp => setUsuario(resp.data))
            .catch(error => console.log(error));
    }, [user?.cpf])

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

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const reader = new FileReader();
        reader.onload = e => {
            setUsuario({ ...usuario, urlImagem: e?.target?.result as string } as Usuario);
        }

        const file = (e.target.files?.item(0));
        if (file !== null && file !== undefined)
            reader.readAsDataURL(file);
    }

    const handleClickSalvar = () => {
        api.put('api/usuarios', usuario)
            .then(resp => setUsuario(resp.data))
            .catch(error => console.log(error));
        api.get('api/usuarios/' + user?.cpf)
            .then(resp => setUsuario(resp.data))
            .catch(error => console.log(error));
        setIsEditing(false);
    }

    return (
        <div className="user">
            <div className="left">
                <div className="img">
                    {
                        isEditing ?
                            <>
                                <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />

                                <img id="img-picking" src={usuario?.urlImagem ? usuario.urlImagem : "../../assets/imgs/user-icon.png"} alt="user" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)} />

                                <PlusCircle size={100} weight="bold" id="plus" style={plusVisible ? {display: "inherit"} : {display: "none"}}/>
                            </> :
                            <img id="img" src={usuario?.urlImagem ? usuario.urlImagem : "../../assets/imgs/user-icon.png"} alt="user" />}
                </div>
                {
                    isEditing ?
                        <>
                            <div className="info-titles">
                                <label>Nome:</label>
                                <label>Telefone:</label>
                                <label>Email:</label>
                            </div>
                            <div className="info-values">
                                <input type="text" title="username" value={usuario?.nome} onChange={(e) => setUsuario({ ...usuario, nome: e.target.value } as Usuario)} />

                                <IMaskInput
                                    mask="(NN) NNNNN-NNNN"
                                    blocks={{
                                        N: {
                                            mask: MaskedRange,
                                            from: 0,
                                            to: 9,
                                            maxLength: 1
                                        }
                                    }}
                                    type="text" title="phone" value={usuario?.telefone} onChange={(e) => setUsuario({ ...usuario, telefone: (e.target as HTMLInputElement).value } as Usuario)}
                                />

                                <input type="text" title="email" value={usuario?.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value } as Usuario)} />
                            </div>
                        </>
                        : <>
                            <h4>{usuario?.nome}</h4>
                            <div className="info-titles">
                                <label>Telefone:</label>
                                <label>Email:</label>
                            </div>
                            <div className="info-values">
                                <label>{usuario?.telefone}</label>
                                <label>{usuario?.email}</label>
                            </div>
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
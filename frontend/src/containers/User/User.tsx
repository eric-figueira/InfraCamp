import React, { useState, useEffect, useContext, ChangeEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

import './User.css';

import Denuncia from "../../types/Denuncia";
import Usuario from "../../types/Usuario";

import robot from "../../assets/imgs/robot.png";
import userIcon from "../../assets/imgs/user-icon.png";
import plusIcon from "../../assets/imgs/plus-icon.png";

import { MaskedRange } from "imask";
import { IMaskInput } from "react-imask";

import { useGet } from "../../hooks/useGet";
import { api } from "../../services/api";

import { AuthContext } from "../../contexts/AuthContext";

import Card from "../../components/Card/Card";
import Complaint from "../../components/Complaint/Complaint";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

import { Plus, WarningCircle } from "phosphor-react";

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
    const { user, LogOut } = useContext(AuthContext);

    const [usuario, setUsuario] = useState<Usuario>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>();

    const setPlusVisible = (isVisible: boolean) => {
        const img = (document.querySelector("#img-picking") as HTMLImageElement)
        if (isVisible) {
            img.src = plusIcon;
            img.setAttribute("style", "filter: invert()");
        }
        else {
            img.src = (usuario?.urlImagem !== "" && usuario?.urlImagem !== undefined && usuario?.urlImagem !== null) ? usuario?.urlImagem : userIcon
            img.setAttribute("style", (usuario?.urlImagem !== "" && usuario?.urlImagem !== undefined && usuario?.urlImagem !== null) ? "filter: none" : "filter: invert()");
        }
    }

    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<ComplaintData>();


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

    const [password, setPassword] = useState<string>("");
    const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (password) {
            api.post(`api/auth/verifyPassword?cpf=${user?.cpf}&senha=${password}`)
                .then(({ data }) => {
                    setIsDeleteDisabled(!data)
                    console.log(isDeleteDisabled)
                    setModalContent(modalContent)
                    console.log(modalContent)
                })
                .catch(error => console.log(error));
        }
    }, [password]);


    const handleDelete = async () => {
        console.log('sdasdasd')
        // api.delete('api/denuncias/denunciasUsuario/' + user?.cpf)
        //     .then(() =>
        //         api.delete('api/opinioes/' + user?.cpf)
        //             .then(() => api.delete('api/usuarios/' + user?.cpf)
        //                 .then(() => LogOut())))
        //     .catch(error => console.log(error))
    }

    const handleClickDeletar = () => {
        setIsModalOpen(true);
        setModalContent(
            <>
                <WarningCircle color="#ff4343" weight="bold" size={100} />
                <h1>Confirmação de deleção</h1>
                <p>Tem certeza que deseja deletar seu usuário? Todos os seus dados serão <strong>perdidos</strong>. Esta ação é <strong>irreversível</strong>.</p>

                <p id="p-password">Para deletar, digite sua senha: </p>
                <input type="password" title="password" onChange={(event) => setPassword(event.target.value)} />

                <div className="button-box">
                    <Button backgroundColor="#44a676" fontColor="#FFFFFF" text="Cancelar" eventHandler={() => { setIsModalOpen(false); setPassword("") }}></Button>
                    <Button backgroundColor="#941D1D" fontColor="#FFFFFF" text="Deletar" eventHandler={handleDelete} disabled={isDeleteDisabled}></Button>
                </div>
            </>
        )
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
        setIsEditing(false);
    }

    return (
        <>
            {isModalOpen &&
                <Modal setModalOpen={setIsModalOpen}>
                    {modalContent}
                </Modal>
            }

            <div className="user">
                <div className="left">
                    <div className="img">
                        {
                            isEditing ?
                                <>
                                    <input id="pickImg" title="Browse" type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />

                                    <img draggable={false} id="img-picking" style={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? {} : { filter: "invert()" }} src={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? usuario?.urlImagem : userIcon} alt="user" onClick={() => { (document.querySelector('#pickImg') as HTMLInputElement).click() }} onMouseOver={() => setPlusVisible(true)} onMouseLeave={() => setPlusVisible(false)} />
                                </> :
                                <img draggable={false} id="img" style={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? {} : { filter: "invert()" }} src={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? usuario?.urlImagem : userIcon} alt="user" />}
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
                        <Button width="200px" backgroundColor={isEditing ? "#44a676" : "#222533"} fontColor="#FFFFFF" text={isEditing ? "Salvar" : "Editar"} eventHandler={isEditing ? handleClickSalvar : handleClickEditar} />
                        <Button width="200px" backgroundColor={isEditing ? "#222533" : "#941D1D"} fontColor="#FFFFFF" text={isEditing ? "Cancelar" : "Deletar"} eventHandler={isEditing ? handleClickCancelar : handleClickDeletar} />
                    </div>
                </div>
                {
                    denuncias?.filter(denuncia => denuncia.cpf === user?.cpf).length === 0
                        ?
                        <div className="not-found">
                            <h1>Reclamações</h1>
                            <h4>Você ainda não realizou denúncias.</h4>
                            <img src={robot} alt="Not found" />
                            <Link to="/create" >
                                <Button text="Criar denúncias" fontColor="white" backgroundColor="#11101D" eventHandler={() => { }} />
                            </Link>
                        </div>
                        :
                        (
                            <div className="right">
                                <div className="info" onClick={() => window.location.href = "/create"} style={{ textAlign: "center", padding: "2.2rem", cursor: "pointer" }}>
                                    <Plus size={80} />
                                    <h3>Criar denúncia</h3>
                                </div>

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
                                                        setIsModalOpen={setIsModalOpen}
                                                        setModalContent={setModalContent}
                                                    ></Card>
                                                )
                                            }
                                        })
                                }
                            </div>
                        )

                }
                {showComplaint && <Complaint isVisible={showComplaint} setVisible={setShowComplaint} cpf={complaint?.cpf} idDenunia={complaint?.idDenuncia} date={complaint?.date} idTipo={complaint?.idTipo} address={complaint?.address} description={complaint?.description} idStatus={complaint?.idStatus} imgUrl={complaint?.imgUrl} />}
            </div >
        </>
    )
}
import "./Complaint.css";
import React, { useState, useEffect } from "react";

import "./Complaint.css";
import Usuario from "../../types/Usuario";
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";

import { api } from "../../services/api";

interface ComplaintProps {
    idDenunia?: number;
    cpf?: string,
    date?: Date,
    idTipo?: number,
    address?: string,
    description?: string,
    idStatus?: number,
    imgUrl?: string,
    isVisible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const formatDate = (date: string): string => {
    //2023-04-27

    let day, month, year;
    day = date.substring(8, 10);
    month = date.substring(5, 7);
    year = date.substring(0, 4);

    return day + "/" + month + "/" + year;
}

const Complaint: React.FC<ComplaintProps> = (props) => {
    const [tipo, setTipo] = useState<Tipo>();
    const [status, setStatus] = useState<Status>();
    const [usuario, setUsuario] = useState<Usuario>();

    useEffect(() => {
        api.get("http://localhost:5164/api/tiposDenuncia/"+props.idTipo).then(
        resp => {
            setTipo(resp.data)
        })
    }, [props.idTipo, tipo])
    
    useEffect(() => {
        api.get("http://localhost:5164/api/statusDenuncia/"+props.idStatus).then(
            resp => {setStatus(resp.data)}
        )
    }, [props.idStatus, status])

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/"+props.cpf).then(
            resp => {setUsuario(resp.data)}
        )
    }, [props.cpf, usuario])

    const handleClick = () => {
        props.setVisible(false);
    }

    return (
        <> {
            props.isVisible &&
            <div id="complaint">
                <div className="top_box">
                    <h2 className="title">{usuario?.nome}</h2>
                    <button className="close_button" title="close" onClick={handleClick}>X</button>
                </div>
                <img src={props.imgUrl} alt="Imagem do problema" />
                <h2 className="date">{formatDate(props.date + "")}</h2>
                <p className="description"><span>Descrição:</span> {props.description}</p>
                <p className="address"><span>Endereço:</span> {props.address}</p>
                <p className="type"><span>Tipo:</span> {tipo?.tipo}</p>
                <div>
                    <p className="status"><span>Status:</span>{status?.status}</p>
                    <div className="status_icon"></div>
                </div>
            </div>
        }</>
    )
}

export default Complaint;
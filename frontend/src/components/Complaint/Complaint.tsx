import "./Complaint.css";
import React, { useState, useEffect } from "react";

import "./Complaint.css";
import Usuario from "../../types/Usuario";
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";

import { X } from "phosphor-react";
import userIcon from "../../assets/imgs/user-icon.png";

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

    const [color, setColor] = useState<string>(""); 

    useEffect(() => {
        api.get("http://localhost:5164/api/tiposDenuncia/" + props.idTipo).then(
            resp => {
                setTipo(resp.data)
            })
        api.get("http://localhost:5164/api/statusDenuncia/" + props.idStatus).then(
            resp => { 
                setStatus(resp.data);
                switch (props.idStatus) {
                    case 1: setColor("#5d9fd4"); break;
                    case 2: setColor("#d6950a"); break;
                    case 3: setColor("#d45d6d"); break;
                    case 4: setColor("#956fb4"); break;
                    case 5: setColor("#4faf5f"); break;
                } 
            }
        )
        api.get("http://localhost:5164/api/usuarios/" + props.cpf).then(
            resp => { setUsuario(resp.data) }
        )
    }, [props.idTipo, props.idStatus, props.cpf])

    const handleClick = () => {
        props.setVisible(false);
    }

    return (
        <> {
            props.isVisible &&
            <div id="complaint">
                <div className="top_box">
                    <img src={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? usuario?.urlImagem : userIcon} style={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? {} : {filter: "invert()"}} alt="img"></img>
                    
                    <h2 className="title">{usuario?.nome}</h2>
                    <button className="close_button" title="close" onClick={handleClick}><X weight="bold" color="#FFFFFF"/></button>
                </div>
                <div className="img">
                    <img src={props.imgUrl} draggable={false} alt="Imagem do problema" />
                </div>
                <div className="bottom_box">
                    <h2 className="date">{formatDate(props.date + "")}</h2>
                    <p className="item" id="description"><span>Descrição:</span> {props.description}</p>
                    <p className="item"><span>Endereço:</span> {props.address}</p>
                    <p className="item"><span>Tipo:</span> {tipo?.tipo}</p>
                    <div>
                        <p className="item" style={{color: color}}><span>Status:</span> {status?.status}</p>
                        <div className="status_icon"></div>
                    </div>
                </div>
            </div>
        }</>
    )
}

export default Complaint;
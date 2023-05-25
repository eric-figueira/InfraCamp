import React, { useEffect, useState } from "react";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";
import { ComplaintData } from "../../containers/User/User";

import "./Card.css";

import "./Card.css";
import { ArrowRight } from "phosphor-react";
import Button from "../Button/Button";
import { clearScreenDown } from "readline";

interface CardProps {
    idDenuncia: number;
    cpf: string,
    date: Date,
    idTipo: number,
    address: string,
    description: string,
    idStatus: number,
    imgUrl: string,
    handleToggleComplaint: () => void,
    setComplaint: (props: ComplaintData) => void
}

const formatDate = (date: string): string => {
    //2023-04-27

    let day, month, year;
    day = date.substring(8, 10);
    month = date.substring(5, 7);
    year = date.substring(0, 4);

    return day + "/" + month + "/" + year;
}

const Card: React.FC<CardProps> = (props) => {
    const [tipo, setTipo] = useState<Tipo>();
    const [status, setStatus] = useState<Status>();
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        api.get("http://localhost:5164/api/tiposDenuncia/" + props.idTipo).then(
            resp => {
                setTipo(resp.data)
            })
    }, [])

    useEffect(() => {
        api.get("http://localhost:5164/api/statusDenuncia/" + props.idStatus).then(
            resp => {
                setStatus(resp.data);
                switch (props.idStatus) {
                    case 1: setColor("#5d9fd4"); break;
                    case 2: setColor("#d6950a"); break;
                    case 3: setColor("#d45d6d"); break;
                    case 4: setColor("#956fb4"); break;
                    case 5: setColor("#4faf5f"); break;
                };
            }
        )
    }, [])

    const handleDeletar = () => {
        api.delete("api/delete/"+props.idDenuncia)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    const handleEditar = () => {
        window.location.href = "http://localhost:3000/edit";
    }

    return (
        <div className="info" onClick={() => { props.handleToggleComplaint(); props.setComplaint({ idDenuncia: props.idDenuncia, cpf: props.cpf, date: props.date, idTipo: props.idTipo, address: props.address, description: props.description, idStatus: props.idStatus, imgUrl: props.imgUrl }) }}>
            <h3>{formatDate(props.date + "")}</h3>
            <h4>Tipo: {tipo?.tipo}</h4>
            <h4 style={{ color: color }}>Status: {status?.status}</h4>
            <div className="buttons">
                <Button text="Deletar" eventHandler={() => { () => { handleDeletar() } }} backgroundColor="#E6246f" fontColor="white" />
                <Button text="Editar" eventHandler={() => { () => { handleEditar() } }} backgroundColor="white" fontColor="#0d0c16" />
            </div>
            <h4 style={{ textAlign: "center" }}>
                Mais informações
                <ArrowRight size={15} weight="bold" className="aa" />
            </h4>
        </div>
    )
}

export default Card;
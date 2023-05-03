import React, { useEffect, useState } from "react";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";

import "./Card.css";

interface CardProps {
    idDenuncia: number;
    cpf: string,
    date: Date,
    idTipo: number,
    address: string,
    description: string,
    idStatus: number,
    imgUrl: string,
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

    useEffect(() => {
        api.get("http://localhost:5164/api/tiposDenuncia/" + props.idTipo).then(
            resp => {
                setTipo(resp.data)
            })
    }, [])

    useEffect(() => {
        api.get("http://localhost:5164/api/statusDenuncia/" + props.idStatus).then(
            resp => { setStatus(resp.data) }
        )
    }, [])

    return (
        <div className="info">
            <h3>{formatDate(props.date + "")}</h3>
            <h4>Tipo: {tipo?.tipo}</h4>
            <h4>Status: {status?.status}</h4>

            <div className="more-info">
                <input type="button" value="Mais informações" />
            </div>
        </div>
    )
}

export default Card;
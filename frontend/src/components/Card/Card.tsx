import React, { useEffect, useState } from "react";
import { ArrowFatRight } from "phosphor-react";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";

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
        <div className="card">
            <div className="text_info_box">
                <h3 className="info_date">{formatDate(props.date + "")}</h3>
                <div className="info_item">
                    <p className="label">Tipo:</p>
                    <p className="info">{tipo?.tipo}</p>
                </div>
                <div className="info_item">
                    <p className="label">Status:</p>
                    <p className="info">{status?.status}</p>
                </div>
            </div>
            <div className="more_info">
                <p className="info_text">Mais informações</p>
                <ArrowFatRight />
            </div>
        </div>
    )
}

export default Card;
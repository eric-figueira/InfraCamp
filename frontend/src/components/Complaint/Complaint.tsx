import "./Complaint.css";
import React, { useRef } from "react";
import { unmountComponentAtNode } from "react-dom";

interface ComplaintProps {
    idDenunia: number;
    cpf: string,
    userName: string,
    date: Date,
    type: string,
    address: string,
    description: string,
    status: string,
    imgUrl: string
}

const formatDate = (date: Date): string => {
    let day, month, year;
    day = (date.getDay() <= 9) ? date.getDay() + "0" : date.getDay();
    month = (date.getMonth() <= 9) ? date.getMonth() + "0" : date.getMonth();
    year = date.getFullYear();

    return day + "/" + month + "/" + year;
}

const Complaint: React.FC<ComplaintProps> = (props) => {
    const element = useRef(null);

    const handleClick = () => {
        unmountComponentAtNode(element.current as unknown as Element | DocumentFragment);
    }

    return (
        <div id="complaint" ref={element}>
            <div className="top_box">
                <h2 className="title">{props.cpf}</h2>
                <button className="close_button" title="close" onClick={handleClick}>X</button>
            </div>
            <img src={props.imgUrl} alt="Imagem do problema" />
            <h2 className="date">{formatDate(props.date)}</h2>
            <p className="description"><span>Descrição:</span> {props.description}</p>
            <p className="address"><span>Endereço:</span> {props.address}</p>
            <p className="type"><span>Tipo:</span> {props.type}</p>
            <p className="status"><span>Status:</span> <div className="status_icon"></div> {props.status}</p>
        </div>
    )
}

export default Complaint;
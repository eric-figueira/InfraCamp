import React, { useContext, useEffect, useState } from "react";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react";
import { AuthContext } from "../../contexts/AuthContext";
import Opiniao from "../../types/Opiniao";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";
import Usuario from "../../types/Usuario";

import "./Post.css";

interface PostProps {
    idDenuncia: number;
    cpf: string,
    date: Date,
    idTipo: number,
    address: string,
    description: string,
    idStatus: number,
    imgUrl: string,
}

interface ItemPostProps {
    title: string,
    description: string
}

const formatDate = (date: string): string => {
    //2023-04-27

    let day, month, year;
    day = date.substring(8, 10);
    month = date.substring(5, 7);
    year = date.substring(0, 4);

    return day + "/" + month + "/" + year;
}

const ItemPost: React.FC<ItemPostProps> = (props) => {
    return (
        <div className="text_info_item">
            <h4 className="item_title">{props.title}</h4>
            <p className="item_description">{props.description}</p>
        </div>
    )
}

const Post: React.FC<PostProps> = (props) => {
    const [opinioes, setOpinioes] = useState<Opiniao[]>();
    const [opiniao, setOpiniao] = useState<Opiniao>();
    const [tipo, setTipo] = useState<Tipo>();
    const [status, setStatus] = useState<Status>();
    const [usuario, setUsuario] = useState<Usuario>();

    const { user } = useContext(AuthContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        api.post('http://localhost:5164/api/opinioes', { idDenuncia: props.idDenuncia, idUsuario: user?.cpf, dataInteracao: new Date(), isCurtida: (e.target as HTMLButtonElement).title === 'like' ? true : false } as Opiniao)
            .then(res => {
                setOpiniao(res.data);
            })
            .catch(() => {
                api.put('api/opinioes', { idDenuncia: props.idDenuncia, idUsuario: user?.cpf, dataInteracao: new Date(), isCurtida: (e.target as HTMLButtonElement).title === 'like' ? true : false } as Opiniao)
                    .then(res => {
                        setOpiniao(res.data);
                    })
            });
    };

    useEffect(() => {
        api.get(`http://localhost:5164/api/opinioes/${props.idDenuncia}`).then(resp => {
            setOpinioes(resp.data);
        })
    }, [])

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

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/" + props.cpf).then(
            resp => { setUsuario(resp.data) }
        )
    }, [])

    return (
        <div className="card">
            <div className="left">
                <h4 className="message">
                    <b>{usuario === undefined ? "" : usuario.nome}</b> {formatDate(props.date + "")}
                </h4>
                <h4 className="message">
                    <b>Problema:</b> {tipo === undefined ? "" : tipo.tipo}
                </h4>
                <h4 className="message">
                    <b>Endereço:</b> {props.address}
                </h4>
                <h4 className="message">
                    <b>Descrição:</b> {props.description}
                </h4>
                <h4 className="message" style={{ color: '#d6b10a' }}>
                    <b>Situação:</b> {status === undefined ? "" : status.status}
                </h4>
            </div>
            <div className="mid">
                <div className="imgBx">
                    <img src={props.imgUrl} className="cover" alt="Imagem do problema" />
                </div>
            </div>
            <div className="right">
                <div className="actionBtns">
                <button type="button" title="like" onClick={handleClick}>
                    <ArrowFatUp/>
                </button>
                <button type="button" title="dislike" onClick={handleClick}>
                    <ArrowFatDown />
                </button>
                </div>
            </div>
        </div>
    )
}

export default Post;
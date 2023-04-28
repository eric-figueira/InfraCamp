import React, { useContext, useEffect, useState } from "react";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react";
import { AuthContext } from "../../contexts/AuthContext";
import Opiniao from "../../types/Opiniao";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";
import Usuario from "../../types/Usuario";

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
        api.get("http://localhost:5164/api/tiposDenuncia/"+props.idTipo).then(
        resp => {
            setTipo(resp.data)
        })
    }, [])
    
    useEffect(() => {
        api.get("http://localhost:5164/api/statusDenuncia/"+props.idStatus).then(
            resp => {setStatus(resp.data)}
        )
    }, [])

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/"+props.cpf).then(
            resp => {setUsuario(resp.data)}
        )
    }, [])

    return (
        <div>
            <div className="text_info_box">
                <h2 className="info_title">{usuario === undefined ? "" : usuario.nome}</h2>
                <h3 className="info_date">Postado em {formatDate(props.date + "")}</h3>
                <ItemPost title="Problema" description={tipo === undefined ? "" : tipo.tipo}></ItemPost>
                <ItemPost title="Endereço" description={props.address}></ItemPost>
                <ItemPost title="Descrição" description={props.description}></ItemPost>
                <ItemPost title="Situação" description={status === undefined ? "" : status.status}></ItemPost>
            </div>
            <div className="picture_box">
                <img className="picture_box_img" src={props.imgUrl} alt="Imagem do problema"></img>
            </div>
            <div className="likes_and_dislikes_box">
                <p className="like_count">{opinioes?.length}</p>
                <button type="button" title="like" onClick={handleClick}>
                    <ArrowFatUp />
                </button>
                <button type="button" title="dislike" onClick={handleClick}>
                    <ArrowFatDown />
                </button>
            </div>
        </div>
    )
}

export default Post;
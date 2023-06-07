import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Opiniao from "../../types/Opiniao";
import { api } from '../../services/api';
import Tipo from "../../types/Tipo";
import Status from "../../types/Status";
import Usuario from "../../types/Usuario";

import userIcon from "../../assets/imgs/user-icon.png";
import { StatusDenuncia } from "../StatusDenuncia/StatusDenuncia";

import "./Post.css";
import { Heart, WarningCircle } from "phosphor-react";

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

const formatDate = (date: string): string => {
    //2023-04-27

    let day, month, year;
    day = date.substring(8, 10);
    month = date.substring(5, 7);
    year = date.substring(0, 4);

    return day + "/" + month + "/" + year;
}


const Post: React.FC<PostProps> = (props) => {
    const [opinioes, setOpinioes] = useState<Opiniao[]>();
    const [opiniao, setOpiniao] = useState<Opiniao>();
    const [tipo, setTipo] = useState<Tipo>();
    const [status, setStatus] = useState<Status>();
    const [usuario, setUsuario] = useState<Usuario>();

    const { user } = useContext(AuthContext);
    const [color, setColor] = useState<string>("");

    const handleClick = (isLike: boolean) => {

        if (opiniao === undefined) {
            api.post('api/opinioes', { idDenuncia: props.idDenuncia, cpf: user?.cpf, dataOpiniao: new Date(), isCurtida: isLike } as Opiniao)
                .then(res => {
                    setOpiniao(res.data);
                })
        }
        else if (opiniao.isCurtida !== isLike) {
            api.put('api/opinioes', { idDenuncia: props.idDenuncia, cpf: user?.cpf, dataOpiniao: new Date(), isCurtida: isLike } as Opiniao)
                .then(res => {
                    setOpiniao(res.data);
                })
                .catch(error => console.error(error))
        }
        else {
            api.delete(`api/opinioes/${props.idDenuncia}/${user?.cpf}`)
                .then(() => setOpiniao(undefined));
        }
    };

    useEffect(() => {
        api.get(`api/opinioes/${props.idDenuncia}`).then(resp => {
            setOpinioes(resp.data);
        })
    }, [opiniao])

    useEffect(() => {
        api.get(`api/opinioes/${props.idDenuncia}/${user?.cpf}`).then(resp => {
            setOpiniao(resp.data);
        })
    }, [])

    useEffect(() => {
        api.get("api/tiposDenuncia/" + props.idTipo).then(
            resp => {
                setTipo(resp.data)
            })
    }, [])

    useEffect(() => {
        api.get("api/statusDenuncia/" + props.idStatus).then(
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
    }, [])

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/" + props.cpf).then(
            resp => { setUsuario(resp.data) }
        )
    }, [])

    return (
        <div className="card">
            <div className="left">
                <div className="top">
                    <div className="img">
                        <img src={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? usuario?.urlImagem : userIcon} style={(usuario?.urlImagem !== "" && usuario?.urlImagem !== null) ? {} : { filter: "invert()" }} alt="img"></img>
                    </div>
                    <h4 id="title">
                        <b>{usuario === undefined ? "" : usuario.nome} </b> Postado em {formatDate(props.date + "")}
                    </h4>
                </div>
                <h4 className="message">
                    <b>Problema</b> {tipo === undefined ? "" : tipo.tipo}
                </h4>
                <h4 className="message">
                    <b>Endereço</b> {props.address}
                </h4>
                <h4 className="message">
                    <b>Descrição</b> {props.description}
                </h4>
                <h4 className="message" style={{ color: color }}>
                    <StatusDenuncia idDenuncia={props.idDenuncia} idStatus={props.idStatus} />
                </h4>
                <h4 className="message">
                    <b>Likes</b> {opinioes?.filter(opiniao => opiniao.isCurtida === true).length}
                    <b>Dislikes</b> {opinioes?.filter(opiniao => opiniao.isCurtida === false).length}
                </h4>
            </div>
            <div className="mid">
                <img src={props.imgUrl} className="cover" alt="Imagem do problema" />
            </div>
            {
                !user?.funcionario ? 
                (
                    <div className="right">
                        <h4 className="likes">{opinioes?.filter(opiniao => opiniao.isCurtida === true).length}</h4>
                        <div className="actionBtns">
                            <button type="button" title="Curtir" onClick={() => handleClick(true)}>
                                <Heart size='25' color="#ca3a3a" weight={opiniao !== undefined ? (opiniao.isCurtida ? "fill" : "regular") : "regular"} />
                            </button>
                            <button type="button" title="Denunciar" onClick={() => handleClick(false)}>
                                <WarningCircle size='25' color="#cf9516" weight={opiniao !== undefined ? (opiniao.isCurtida ? "regular" : "fill") : "regular"} />
                            </button>
                        </div>
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default Post;
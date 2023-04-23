import React, { useContext, useEffect, useState } from "react";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react";
import { AuthContext } from "../../contexts/AuthContext";
import Opiniao from "../../types/Opiniao";
import { api } from '../../services/api';

interface PostProps {
    idDenunia: number;
    cpf: string,
    userName: string,
    date: Date,
    type: string,
    address: string,
    description: string,
    status: string,
    imgUrl: string,
}

interface ItemPostProps {
    title: string,
    description: string
}

const formatDate = (date: Date): string => {
    let day, month, year;
    day = (date.getDay() <= 9) ? date.getDay() + "0" : date.getDay();
    month = (date.getMonth() <= 9) ? date.getMonth() + "0" : date.getMonth();
    year = date.getFullYear();

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
    const { user } = useContext(AuthContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        api.post('api/opinioes', { idDenuncia: props.idDenunia, idUsuario: user?.cpf, dataInteracao: new Date(), isCurtida: (e.target as HTMLButtonElement).title === 'like' ? true : false } as Opiniao)
            .then(res => {
                setOpiniao(res.data);
            })
            .catch(() => {
                api.put('api/opinioes', { idDenuncia: props.idDenunia, idUsuario: user?.cpf, dataInteracao: new Date(), isCurtida: (e.target as HTMLButtonElement).title === 'like' ? true : false } as Opiniao)
                    .then(res => {
                        setOpiniao(res.data);
                    })
            });
    };

    useEffect(() => {
        api.get(`api/opinioes/${props.idDenunia}`).then(resp => {
            setOpinioes(resp.data);
        })
    }, [opinioes, opiniao, props.idDenunia])

    return (
        <div>
            <div className="text_info_box">
                <h2 className="info_title">{props.userName}</h2>
                <h3 className="info_date">Postado em {formatDate(props.date)}</h3>
                <ItemPost title="Problema" description={props.type}></ItemPost>
                <ItemPost title="Endereço" description={props.address}></ItemPost>
                <ItemPost title="Descrição" description={props.description}></ItemPost>
                <ItemPost title="Situação" description={props.status}></ItemPost>
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
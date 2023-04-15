import React from "react";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react";

interface PostProps {
    cpf: string,
    userName: string,
    date: Date,
    type: string,
    address: string,
    description: string,
    status: string,
    imgUrl: string,
    likes: number,
    handleLike: (cpf: string) => void,
    handleDislike: (cpf: string) => void
}

interface ItemPostProps {
    title: string,
    description: string
}

const formatDate = (date:Date) : string => {
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
    function handleLike() {
        props.handleLike(props.cpf);
    }

    function handleDislike() {
        props.handleDislike(props.cpf);
    }

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
                <button type="button" title="like" onClick={handleLike}>
                    <ArrowFatUp/>
                </button>
                <button type="button" title="dislike" onClick={handleDislike}>
                    <ArrowFatDown/>
                </button>
            </div>
        </div>
    )
}

export default Post;
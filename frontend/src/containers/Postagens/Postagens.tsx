import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import { useGet } from '../../hooks/useGet';
import { api } from '../../services/api';
import Denuncia from '../../types/Denuncia';
import Tipo from '../../types/Tipo';
import Status from '../../types/Status';
import Usuario from '../../types/Usuario';

import "./Postagens.css";

const Postagens: React.FC = () => {
    const { data: denuncias } = useGet<Denuncia[]>("http://localhost:5164/api/denuncias");

    return (
        <div>
            <h1>Postagens</h1>
            <div className="header">
                <div className="content">
                    <div className="number">{denuncias?.length}</div>
                    <div className="subtitle">Denuncias feitas</div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus === 5).length}</div>
                    <div className="subtitle">Problemas resolvidos</div>
                </div>
                <div className="content">
                    <div className="number">{denuncias?.filter(denuncia => denuncia.idStatus !== 5 && denuncia.idStatus !== 3).length}</div>
                    <div className="subtitle">Problemas pendentes</div>
                </div>
            </div>


            <div className="card">
                <div className="left">
                    <h4 className="message">
                        <b>Pedro Nunes</b> Há 4 dias atrás
                    </h4>
                    <h4 className="message">
                        <b>Endereço</b> {denuncia.endereco}
                    </h4>
                    <h4 className="message">
                        <b>Descrição</b> {denuncia.descricao}
                    </h4>
                    <h4 className="message" style={{ color: '#d6b10a' }}>
                        <b>Stiuação</b> {denuncia.idStatus}
                    </h4>
                    <div className="addComments">
                        <div className="userImg">
                            <img src={denuncia.urlImagem} />
                        </div>
                        <input type="text" className="text" placeholder="Faça um comentario..." />
                    </div>
                </div>
                <div className="mid">
                    <div className="imgBx">
                        <img src="./img/feed1.jpeg" className="cover" />
                    </div>
                </div>

                <div className="right">
                    <div className="actionBtns">
                        <img src="./img/arrow-fat-up-bold.svg" className="up" />
                        <img src="./img/arrow-fat-down-bold.svg" className="down" />
                    </div>
                </div>

            </div>

            <div className="card">
                <div className="left">
                    <h4 className="message">
                        <b>Benneth, o grande</b> Há 2 minutos atrás
                    </h4>
                    <h4 className="message">
                        <b>Endereço</b> Rua da conceição - Numero 46
                    </h4>
                    <h4 className="message">
                        <b>Descrição</b> Eu acho que deveria ser tomada uma ação com
                        urgencia. Ninguém mais aguenta lidar com isso!
                    </h4>
                    <h4 className="message" style={{ color: '#d6b10a' }}>
                        <b>Stiuação</b> Em análise
                    </h4>
                    <div className="addComments">
                        <div className="userImg">
                            <img src="./img/profilePhoto.jpg" />
                        </div>
                        <input type="text" className="text" placeholder="Faça um comentario..." />
                    </div>
                </div>
                <div className="mid">
                    <div className="imgBx">
                        <img src="./img/feed2.jpg" className="cover" />
                    </div>
                </div>

                <div className="right">
                    <div className="actionBtns">
                        <img src="./img/arrow-fat-up-bold.svg" className="up2" />
                        <img src="./img/arrow-fat-down-bold.svg" className="down2" />
                    </div>
                </div>

            </div>

            <div className="card">
                <div className="left">
                    <h4 className="message">
                        <b>Eric Carvalho</b> Há 2 meses atrás
                    </h4>
                    <h4 className="message">
                        <b>Endereço</b> Rua da conceição Numero 4
                    </h4>
                    <h4 className="message">
                        <b>Descrição</b> Eu acho que deveria ser tomada uma ação com
                        urgencia. Ninguém mais aguenta lidar com isso!
                    </h4>
                    <h4 className="message" style={{ color: '#d6b10a' }}>
                        <b>Stiuação</b> Resolvido
                    </h4>
                    <div className="addComments">
                        <div className="userImg">
                            <img src="./img/profilePhoto.jpg" />
                        </div>
                        <input type="text" className="text" placeholder="Faça um comentario..." />
                    </div>
                </div>
                <div className="mid">
                    <div className="imgBx">
                        <img src="./img/feed4.jpg" className="cover" />
                    </div>
                </div>

                <div className="right">
                    <div className="actionBtns">
                        <img src="./img/arrow-fat-up-bold.svg" className="up3" />
                        <img src="./img/arrow-fat-down-bold.svg" className="down3" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Postagens;
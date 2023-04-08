import React from 'react';
import { List, MapPin, Info, User, SignOut, ChartBar, ChatCircle } from 'phosphor-react'

import "./Navbar.css"


const Navbar: React.FC = () => {
  return (
    <div className="sidebar">
        <div className="logo-details">
            <ChatCircle rotate={100} />
            <div className="logo_name">InfraCamp</div>
            <List id="btn" />
        </div>
        <ul className="nav-list">
            <li>
                <a href="#">
                    <MapPin />
                    <span className="links_name">Mapa</span>
                </a>
                <span className="tooltip">Mapa</span>
            </li>
            <li>
                <a href="#">
                    <User />
                    <span className="links_name">Usuário</span>
                </a>
                <span className="tooltip">Usuário</span>
            </li>
            <li>
                <a href="#">
                    <ChartBar />
                    <span className="links_name">Denúnicas</span>
                </a>
                <span className="tooltip">Denúncias</span>
            </li>
            <li>
                <a href="#">
                    <Info />
                    <span className="links_name">Sobre Nós</span>
                </a>
                <span className="tooltip">Sobre Nós</span>
            </li>
            <li className="profile">
                <div className="profile-details">
                    <div className="name_job">
                        <div className="name">Usuario1888</div>
                        <div className="job">Servidor Publico</div>
                    </div>
                </div>
                <SignOut id="log_out" />
            </li>
        </ul>
    </div>
  )
}

export default Navbar;
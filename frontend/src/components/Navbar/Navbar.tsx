import React, { useState } from 'react';

import { List, MapPin, Info, User, SignOut, ChartBar, ChatCircle } from 'phosphor-react'

import "./Navbar.css"

import { Icon } from './styled';


const Navbar: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="logo-details">
            <Icon><ChatCircle rotate={100} /></Icon>
            <div className="logo_name">InfraCamp</div>
            <Icon><List id="btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} /></Icon>
        </div>
        <ul className="nav-list">
            <li>
                <a href="#">
                    <Icon><MapPin /></Icon> 
                    <span className="links_name">Mapa</span>
                </a>
                <span className="tooltip">Mapa</span>
            </li>
            <li>
                <a href="#">
                    <Icon><User /></Icon>
                    <span className="links_name">Usuário</span>
                </a>
                <span className="tooltip">Usuário</span>
            </li>
            <li>
                <a href="#">
                    <Icon><ChartBar /></Icon>
                    <span className="links_name">Denúnicas</span>
                </a>
                <span className="tooltip">Denúncias</span>
            </li>
            <li>
                <a href="#">
                    <Icon><Info /></Icon>
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
                <Icon><SignOut id="log_out" /></Icon>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;
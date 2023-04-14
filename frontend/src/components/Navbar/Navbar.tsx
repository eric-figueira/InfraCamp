import React, { useState } from 'react';

import { List, MapPin, Info, User, SignOut, ChartBar, ChatCircle } from 'phosphor-react'

import "./Navbar.css"

import { Icon } from './styled';


const Navbar: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="logo-details">
            {/* <Icon className='infracamp-icon'><ChatCircle /></Icon> */}
            {/* <i className='bx bxl-c-plus-plus infracamp-icon'></i> */}
            <div className="infracamp-name">Camper</div>
            {/* <Icon><List id='btn' /></Icon> */}
            {/* <i className='bx bx-menu' id="btn"></i> */}
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
                <span className="tooltip">Denúnias</span>
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
                {/* <Icon><SignOut id='log_out' /></Icon> */}
                <i className='bx bx-log-out' id="log_out"></i>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;
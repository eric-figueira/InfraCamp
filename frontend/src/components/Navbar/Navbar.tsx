import React, { useState } from 'react';

import { List, MapPin, Info, User, SignOut, ChartBar, ChatCircle, CaretLeft } from 'phosphor-react'

import "./Navbar.css"

import { Icon } from './styled';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="logo-details">
            <div className="infracamp-name">Infracamp</div>
            {
                isSidebarOpen ? <Icon onClick={() => setIsSidebarOpen(!isSidebarOpen)}><CaretLeft id='btn'/></Icon> 
                              : <Icon onClick={() => setIsSidebarOpen(!isSidebarOpen)}><List id='btn'/></Icon>
            }

        </div>
        <ul className="nav-list">
            <li>
                <Link to="/map">
                    <Icon><MapPin /></Icon>
                    <span className="links_name">Mapa</span>
                </Link>
                <span className="tooltip">Mapa</span>
            </li>
            <li>
                <Link to="/user">
                    <Icon><User /></Icon>
                    <span className="links_name">Usuário</span>
                </Link>
                <span className="tooltip">Usuário</span>
            </li>
            <li>
                <Link to="/posts">
                    <Icon><ChartBar /></Icon>
                    <span className="links_name">Denúnicas</span>
                </Link>
                <span className="tooltip">Denúnias</span>
            </li>
            <li>
                <Link to="/about">
                    <Icon><Info /></Icon>
                    <span className="links_name">Sobre Nós</span>
                </Link>
                <span className="tooltip">Sobre Nós</span>
            </li>
            <li className="profile">
                <div className="profile-details">
                    <div className="name_job">
                        <div className="name">Usuario1888</div>
                        <div className="job">Servidor Publico</div>
                    </div>
                </div>
                <div className="profile-icon-container">
                    <Icon><SignOut id='log_out' /></Icon>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;
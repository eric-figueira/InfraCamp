import React, { Fragment, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../containers/Posts/Posts";
import { AuthContext } from "../../contexts/AuthContext";
import NotFound from "../NotFound/NotFound";

import './Postagens.css';

const Postagens : React.FC = () => {
    
    const { user } = useContext(AuthContext);

    return (
        user ?
            !user?.banido ?
                <Fragment>
                    <Navbar/>
                    <Posts/>
                </Fragment>
            :
            <NotFound text="Vimos que você esteve aprontando... sua conta foi suspensa."/>
        : 
        <NotFound text="Você não está autenticado." />
    )
}

export default Postagens;
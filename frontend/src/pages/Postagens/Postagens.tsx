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
        <Fragment>
            <Navbar/>
            <Posts/>
        </Fragment>
        : 
        <NotFound text="Você não está autenticado." />
    )
}

export default Postagens;
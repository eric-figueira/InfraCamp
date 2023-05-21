import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CriarDenuncia from "../../containers/CriarDenuncia/CriarDenuncia";

import './Postagens.css';

const Postagens : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <CriarDenuncia/>
        </Fragment>
    )
}

export default Postagens;
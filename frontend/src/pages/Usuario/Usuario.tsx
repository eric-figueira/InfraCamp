import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Usuario from "../../containers/Postagens/Postagens";

import './Posts.css';

const Usuario : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <Usuario/>
        </Fragment>
    )
}

export default Usuario;
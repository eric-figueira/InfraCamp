import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CriarDenuncia from "../../containers/CriarDenuncia/CriarDenuncia";

const Postagens : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <CriarDenuncia/>
        </Fragment>
    )
}

export default Postagens;
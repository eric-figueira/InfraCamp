import React, { Fragment, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CriarDenuncia from "../../containers/CriarDenuncia/CriarDenuncia";
import { AuthContext } from "../../contexts/AuthContext";
import NotFound from "../NotFound/NotFound";

const CriarDenuncias : React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        user ?
        <Fragment>
            <Navbar/>
            <CriarDenuncia/>
        </Fragment>
        : 
        <NotFound text="Você não está autenticado." />
    )
}

export default CriarDenuncias;
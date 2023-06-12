import React, { Fragment, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CriarDenuncia from "../../containers/CriarDenuncia/CriarDenuncia";
import { AuthContext } from "../../contexts/AuthContext";
import NotFound from "../NotFound/NotFound";

interface ICriarDenuncia {
    type: string,
    idDenuncia?: number,
}

const CriarDenuncias: React.FC<ICriarDenuncia> = (props) => {
    const { user } = useContext(AuthContext);

    return (
        user?
            !user?.banido ?  
                <Fragment>
                    <Navbar />
                    <CriarDenuncia type={props.type} />
                </Fragment>
            : 
                <NotFound text="Vimos que você esteve aprontando... sua conta foi suspensa."/>
        :
        <NotFound text="Você não está autenticado." />
    )
}

export default CriarDenuncias;
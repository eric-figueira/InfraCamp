import React, { Fragment, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CriarDenuncia from "../../containers/CriarDenuncia/CriarDenuncia";
import { AuthContext } from "../../contexts/AuthContext";
import NotFound from "../NotFound/NotFound";
import Denuncia from "../../types/Denuncia";

interface ICriarDenuncia {
    type: string,
    idDenuncia?: number,
}

const CriarDenuncias: React.FC<ICriarDenuncia> = (props) => {
    const { user } = useContext(AuthContext);

    return (
        user ?
            <Fragment>
                <Navbar />
                <CriarDenuncia idDenuncia={props.idDenuncia} type={props.type} />
            </Fragment>
            :
            <NotFound text="Você não está autenticado." />
    )
}

export default CriarDenuncias;
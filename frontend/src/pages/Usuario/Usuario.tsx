import {User} from "../../containers/User/User";
import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { AuthContext } from "../../contexts/AuthContext";

import './Usuario.css';
import NotFound from "../NotFound/NotFound";

const Usuario : React.FC = () => {

    const { user } = useContext(AuthContext);

    return (
        user ?
        <>
            <Navbar />
            <User />
        </>
        :
        <NotFound text="Você não está autenticado." />
    )
}

export default Usuario;
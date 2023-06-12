import {User} from "../../containers/User/User";
import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { AuthContext } from "../../contexts/AuthContext";

import './Usuario.css';
import NotFound from "../NotFound/NotFound";

const Usuario : React.FC = () => {

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.funcionario) {
            alert("asdsd")
            window.location.href = '/posts'
        }
    }, [])

    return (
        user ?
            !user?.banido ?
                <>
                    <Navbar />
                    <User />
                </>
            :
            <NotFound text="Vimos que você esteve aprontando... sua conta foi suspensa."/>
        :
        <NotFound text="Você não está autenticado." />
    )
}

export default Usuario;
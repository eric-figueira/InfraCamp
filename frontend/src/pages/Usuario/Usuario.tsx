import {User} from "../../containers/User/User";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import './Usuario.css';

const Usuario : React.FC = () => {
    return (
        <>
            <Navbar />
            <User />
        </>
    )
}

export default Usuario;
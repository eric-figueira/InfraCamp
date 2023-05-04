import User from "../../containers/User/User";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Usuario: React.FC = () => {
    return (
        <>
            <Navbar />
            <User />
        </>
    )
}

export default Usuario;
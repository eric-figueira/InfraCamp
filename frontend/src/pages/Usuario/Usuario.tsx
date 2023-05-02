import User from "../../components/User/User";
import React from "react";
import Complaints from "../../components/Complaints/Complaints";
import Navbar from "../../components/Navbar/Navbar";

const Usuario: React.FC = () => {
    return (
        <>
            <Navbar />
            <User />
            <Complaints />
        </>
    )
}

export default Usuario;
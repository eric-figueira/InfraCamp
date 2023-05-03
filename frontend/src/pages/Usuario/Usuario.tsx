import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProfilePage from "../../containers/ProfilePage/ProfilePage";

import './Usuario.css';

const Usuario : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <ProfilePage/>
        </Fragment>
    )
}

export default Usuario;
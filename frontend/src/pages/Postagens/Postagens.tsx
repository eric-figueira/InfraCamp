import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../containers/Posts/Posts";

import './Postagens.css';

const Postagens : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <Posts/>
        </Fragment>
    )
}

export default Postagens;
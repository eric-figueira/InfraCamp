import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Postagens from "../../containers/Postagens/Postagens";

import './Posts.css';

const Posts : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <Postagens/>
        </Fragment>
    )
}

export default Posts;
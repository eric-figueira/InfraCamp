import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Map from "../../containers/Map/Map";

import { AuthContext } from "../../contexts/AuthContext";

const Mapa : React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <Fragment>
            <Navbar/>
            <Map hasFilter={true}/>
        </Fragment>
    )
}

export default Mapa;
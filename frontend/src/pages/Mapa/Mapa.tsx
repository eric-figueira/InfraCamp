import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Map from "../../containers/Map/Map";

import { AuthContext } from "../../contexts/AuthContext";

const Mapa : React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <Fragment>
            <button onClick={() => console.log('mapa: ' + user)}>user</button>
            <Navbar/>
            <Map hasFilter={true}/>
        </Fragment>
    )
}

export default Mapa;
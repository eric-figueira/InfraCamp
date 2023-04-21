import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Map from "../../containers/Map/Map";

const Mapa : React.FC = () => {
    return (
        <Fragment>
            <Navbar/>
            <Map hasFilter={true}/>
        </Fragment>
    )
}

export default Mapa;
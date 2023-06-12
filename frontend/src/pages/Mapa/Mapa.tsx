import React, { Fragment, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Map from "../../containers/Map/Map";

import { AuthContext } from "../../contexts/AuthContext";
import NotFound from "../NotFound/NotFound";

const Mapa : React.FC = () => {
    
    const { user } = useContext(AuthContext);

    return (
        user ?
            !user?.banido ? 
                <Fragment>
                    <Navbar/>
                    <Map idDiv={"map"} hasSearchBar={true} hasCard={true}/>
                </Fragment>
            :
            <NotFound text="Vimos que você esteve aprontando... sua conta foi suspensa."/>
        :
        <NotFound text="Você não está autenticado." />
    )
}

export default Mapa;
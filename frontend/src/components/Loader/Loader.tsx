import React from "react";

import './Loader.css';

interface ILoader {
    isActive: boolean;
    setIsActive(value: boolean): void;
}

const Loader : React.FC<ILoader> = ({isActive}) => {
    return (
        <div style={{display: isActive ? 'relative' : 'none'}} className="loader" />
    );
}

export default Loader;
import React, { useState } from "react";

import Button from "../Button/Button";

import "./ConfirmBox.css";

interface IConfirmBoxProps {
    message: string
}

const ConfirmBox: React.FC<IConfirmBoxProps> = (props) => {
    const [ isVisible, setIsVisible ] = useState<boolean>();

    const handleDelete = () => {

    }

    const handleCancel = () => {

    }

    return (
        <div>
            <div className="button-box">
                <Button width="200px" backgroundColor="#222533" fontColor="#FFFFFF" text="Cancelar" eventHandler={handleCancel}></Button>
                <Button width="200px" backgroundColor="#222533" fontColor="#FFFFFF" text="Deletar mesmo assim" eventHandler={handleDelete}></Button>
            </div>
        </div>
    );
}

export default ConfirmBox;
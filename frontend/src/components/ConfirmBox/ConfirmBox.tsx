import React, { useState } from "react";

import Button from "../Button/Button";
import Usuario from "../../types/Usuario";
import { api } from "../../services/api";

import "./ConfirmBox.css";
import { WarningCircle } from "phosphor-react";

interface IConfirmBoxProps {
    user: Usuario,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmBox: React.FC<IConfirmBoxProps> = (props) => {
    const password = useState<string>()[0];
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const handleChange = () => {
        let correctPassword = "";
        api.post("api/verifyPassword", { cpf: props.user.cpf, senha: password })
            .then(resp => correctPassword = resp.data)
            .catch(error => console.log(error));

        if (correctPassword === props?.user.senha) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    const handleDelete = () => {
        api.delete('api/usuarios/' + props.user?.cpf)
            .then(() => LogOut());
    }

    const handleCancel = () => {
        props.setIsVisible(false);
    }

    return (
        <div id="confirmBox">
            <WarningCircle color="#ff4343" weight="bold" size={100} />
            <h1>Confirmação de deleção</h1>
            <p>Tem certeza que deseja deletar seu usuário? Todos os seus dados serão <strong>perdidos</strong>. Esta ação é <strong>irreversível</strong>.</p>
            <p id="p-password">Para deletar, digite sua senha: </p>
            <input type="password" title="password" value={password} onChange={handleChange} />
            <div className="button-box">
                <Button width="22rem" backgroundColor="#44a676" fontColor="#FFFFFF" text="Cancelar" eventHandler={handleCancel}></Button>
                <Button disabled={isDisabled} width="22rem" backgroundColor="#941D1D" fontColor="#FFFFFF" text="Deletar mesmo assim" eventHandler={handleDelete}></Button>
            </div>
        </div>
    );
}

export default ConfirmBox;

function LogOut(): any {
    throw new Error("Function not implemented.");
}

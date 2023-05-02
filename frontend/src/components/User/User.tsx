import React, { useState, useEffect } from "react";
import Usuario from "../../types/Usuario";
import Button from "../Button/Button";
import { api } from "../../services/api";

import './User.css';

const User: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>();

    useEffect(() => {
        api.get("http://localhost:5164/api/usuarios/547.049.728-36").then(resp => {
            setUsuario(resp.data);
        })
    }, [])

    const handleClickEditar = () => {
        let a: HTMLCollectionOf<Element> = document.getElementsByClassName("field-input");
        for (let i = 0; i < a.length; i += 1) {
            let b = a.item(i) as HTMLInputElement;
            if (b !== null)
                b.disabled = false;
        }
        let buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("button");
        let c = buttons.item(0) as HTMLButtonElement
        c.textContent = "Salvar";

        c.onclick = handleClickSalvar;
    }

    const handleClickSalvar: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null = () => {
        
    }

    const handleClickDeletar = () => {

    }

    return (
        <div id="user">
            <img src={usuario?.urlImagem} alt="Sua imagem aqui" />
            <h1 className="username">{usuario?.nome}</h1>
            <form>
                <div className="field-div">
                    <label className="field-label">Nome:</label>
                    <input title="name-input" className="field-input" type="text" disabled={true} value={usuario?.nome} />
                </div>
                <div className="field-div">
                    <label className="field-label">Senha:</label>
                    <input title="password-input" className="field-input" type="password" disabled={true} value={usuario?.senha} />
                </div>
                <div className="field-div">
                    <label className="field-label">Telefone:</label>
                    <input title="phone-input" className="field-input" type="tel" disabled={true} value={usuario?.nome} />
                </div>
                <div className="field-div">
                    <label className="field-label">Email:</label>
                    <input title="email-input" className="field-input" type="email" disabled={true} value={usuario?.senha} />
                </div>
            </form>

            <Button text="Editar" backgroundColor="#222533" fontColor="#FFFFFF" eventHandler={handleClickEditar}></Button>
            <Button text="Deletar" backgroundColor="#941D1D" fontColor="#FFFFFF" eventHandler={handleClickDeletar}></Button>
        </div >
    )
}

export default User;
import React, { SetStateAction } from "react";
import { useGet } from "../../hooks/useGet";

import "./Filter.css";

import Status from "../../types/Status";
import Tipo from "../../types/Tipo";
import { Ordem } from "../../types/Ordem";

interface FilterProps {
    filtrarPorTipo: (tipo?: SetStateAction<boolean>, ixTipo?: Number) => void;
    filtrarPorStatus: (status?: SetStateAction<boolean>, ixStatus?: Number) => void;
    filtrarPorOrdem: (ordem?: SetStateAction<boolean>, ixStatus?: Number) => void;
}

const Filter: React.FC<FilterProps> = ({ filtrarPorTipo, filtrarPorStatus, filtrarPorOrdem }) => {

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        const filtro = (e.target as HTMLSelectElement).name;
        const index = (e.target as HTMLSelectElement).selectedIndex;

        let on = true;
        index === 0 ? on = false : on = true;

        switch (filtro) {
            case "tipo":
                filtrarPorTipo(on, index);
                break;
            case "status":
                filtrarPorStatus(on, index);
                break;
            case "ordenacao":
                filtrarPorOrdem(on, index);
                break;
        }
    }
    // São constantes, não vão sofrer reatribuição
    const { data: tipos } = useGet<Tipo[]>("api/tiposDenuncia")
    const { data: status } = useGet<Status[]>("api/statusDenuncia")

    return (
        <div className="filter">
            <div className="option">
                <label>Tipo: </label>
                <select title="tipo" name="tipo" onChange={handleChange}>
                    <option value="todos">Todos</option>
                    {
                        tipos?.map(tipo => {
                            return <option value={tipo.tipo}>{tipo.tipo}</option>
                        })
                    }
                </select>
            </div>
            <div className="option">
                <label>Status: </label>
                <select title="status" name="status" onChange={handleChange}>
                    <option value="todos">Todos</option>
                    {
                        status?.map(status => {
                            return <option value={status.status}>{status.status}</option>
                        })
                    }
                </select>
            </div>
            <div className="option">
                <label>Ordenação: </label>
                <select title="ordenacao" name="ordenacao" onChange={handleChange}>
                    <option value="todos">Todos</option>
                    <option value="menosCurtidas">Mais Curtidas</option>
                    <option value="maisCurtidas">Menos Curtidas</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;
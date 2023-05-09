import React, { SetStateAction } from "react";
import { useGet } from "../../hooks/useGet";

import "./Filter.css";

type Tipo = {
    idTipo: Number;
    tipo: string;
};

type Status = {
    idStatus: Number;
    status: string;
}

interface FilterProps {
    filterTipo: (tipo?: SetStateAction<boolean>, ixTipo?: Number) => void;
    filterStatus: (status?: SetStateAction<boolean>, ixStatus?: Number) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        const filtro = (e.target as HTMLSelectElement).name;
        const index = (e.target as HTMLSelectElement).selectedIndex;
        let on = true;
        if (index === 0)
            on = false;
        if (filtro === "tipo")
            props.filterTipo(on, index);
        else if (filtro === "status")
            props.filterStatus(on, index);
    }
    // São constantes, não vão sofrer reatribuição
    const { data: tipos } = useGet<Tipo[]>("http://localhost:5164/api/tiposDenuncia")
    const { data: status } = useGet<Status[]>("http://localhost:5164/api/statusDenuncia")

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
        </div>
    )
}

export default Filter;
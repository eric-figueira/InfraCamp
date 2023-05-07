import React from "react";
import { useGet } from "../../hooks/useGet";

import "./Filter.css";
import { Filtro } from "../../types/Filtro";

type Tipo = {
    idTipo: Number;
    tipo: string;
};

type Status = {
    idStatus: Number;
    status: string;
}

interface FilterProps {
    filterComplaints: (filter: Filtro, index: number) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        const filtro = (e.target as HTMLSelectElement).name;
        console.log(filtro)
        const index = (e.target as HTMLSelectElement).selectedIndex;
        console.log(index)

        props.filterComplaints(filtro as Filtro, index);
    }
    // São constantes, não vão sofrer reatribuição
    const { data: tipos } = useGet<Tipo[]>("http://localhost:5164/api/tiposDenuncia")
    const { data: status } = useGet<Status[]>("http://localhost:5164/api/statusDenuncia")

    return (
        <div className="filter">
            <div className="option">
                <label>Status: </label>
                <select title="status" name="status" onSelect={handleChange}>
                    {
                        tipos?.map(tipo => {
                            return <option value={tipo.tipo}>{tipo.tipo}</option>
                        })
                    }
                </select>
            </div>
            <div className="option">
                <label>| Tipo: </label>
                <select title="tipo" name="tipo" onSelect={handleChange}>
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
import React from "react";
import useFetch from "../../hooks/useFetch";

import "./Filter.css";

type Tipo = {
    idTipo: Number;
    tipo: string;
};

type Status = {
    idStatus: Number;
    status: string;
}

type Filtro = 'status' | 'tipo' | 'data';

interface FilterProps {
    filterMap: (filter: Filtro, index: number) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        const tipo = (e.target as HTMLSelectElement).name;
        const index = (e.target as HTMLSelectElement).selectedIndex;

        props.filterMap(tipo as Filtro, index);
    }
    // São constantes, não vão sofrer reatribuição
    const { data: tipos } = useFetch<Tipo[]>("api/tiposDenuncia")
    const { data: status } = useFetch<Status[]>("api/statusDenuncia")

    return (
        <div id="filter">
            <label>Status:
                <select name="status" onSelect={handleChange}>
                    {
                        tipos?.map(tipo => {
                            return <option value={tipo.tipo}>{tipo.tipo}</option>
                        })
                    }
                </select>
            </label>
            <label>Tipo:
                <select name="tipo" onSelect={handleChange}>
                    {
                        status?.map(status => {
                            return <option value={status.status}>{status.status}</option>
                        })
                    }
                </select>
            </label>
            <label>Data:
                <select name="data" onChange={handleChange}>
                    <option>Até há 1 dia</option>
                    <option>Até há 1 semana</option>
                    <option>Até há 1 mês</option>
                </select>
            </label>
        </div>
    )
}

export default Filter;
import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";

type Tipo = {
    idTipo: Number;
    tipo: string;
};

type Status = {
    idStatus: Number;
    status: string;
}

const Filter: React.FC = () => {

    // São constantes, não vão sofrer reatribuição
    const { data: tipos }  = useGet<Tipo[]>("api/tiposDenuncia")
    const { data: status } = useGet<Status[]>("api/statusDenuncia")

    return (
        <div>
            <label>Status:
                <select name="status">
                    {
                        tipos?.map(tipo => {
                            return <option value={tipo.tipo}>{tipo.tipo}</option>
                        })
                    }
                </select>
            </label>
            <label>Tipo:
                <select name="tipo">
                    {
                        status?.map(status => {
                            return <option value={status.status}>{status.status}</option>
                        })
                    }
                </select>
            </label>
            <label>Data:
                <select name="data">
                    <option>Há 1 dia</option>
                    <option>Há 1 semana</option>
                    <option>Há 1 mês</option>
                    <option>Todas</option>
                </select>
            </label>
        </div>
    )
}

export default Filter;
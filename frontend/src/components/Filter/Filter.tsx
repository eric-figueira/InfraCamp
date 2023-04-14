import React, { useEffect, useState } from "react";
import axios from 'axios';

type Tipo = {
    idTipo: Number;
    tipo: string;
};

type Status = {
    idStatus: Number;
    status: string;
}

const Filter: React.FC = () => {
    const [tipos, setTipos] = useState<Tipo[]>([{idTipo: 0, tipo: ''}]);
    const [status, setStatus] = useState<Status[]>([{idStatus: 0, status: ''}]);

    useEffect(() => {
        axios.get("http://localhost:5164/api/tiposDenuncia").then(resp => {
            setTipos(resp.data);
        })
    })

    useEffect(() => {
        axios.get("http://localhost:5164/api/statusDenuncia").then(resp => {
            setStatus(resp.data);
        })
    })

    return (
        <div>
            <label>Status:
                <select name="status">
                    {
                        tipos.map(tipo => {
                            return <option value={tipo.tipo}>{tipo.tipo}</option>
                        })
                    }
                </select>
            </label>
            <label>Tipo:
                <select name="tipo">
                    {
                        status.map(status => {
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
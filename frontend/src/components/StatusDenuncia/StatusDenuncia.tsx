import React, { useContext, useEffect, useState } from 'react';

import Status from '../../types/Status';

import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { StatusLabel } from "../../styles/styled-components"
import { colorPallete } from "../../styles/colors"

import "./StatusDenuncia.css"

export interface IStatus {
  idDenuncia: number,
  idStatus: number
}


export const StatusDenuncia: React.FC<IStatus> = (props) => {

  const { user } = useContext(AuthContext)

  const [status, setStatus] = useState<Status | undefined>()

  const alterarStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    api.put(`http://localhost:5164/api/denuncias/atualizaStatus/${props.idDenuncia}/${event.target.value}`)
  }

  useEffect(() => {
    api.get(`http://localhost:5164/api/statusDenuncia/${props.idStatus}`).then(
        resp => { setStatus(resp.data) }
    )
  }, [])

  if (user?.funcionario) 
  {
    return (
      <div>
        <h4 className="statusDenunciaH4">Situação
          <select title="situacao" onChange={alterarStatus} className="statusDenunciaSelect">
            <option value="1" selected={props.idStatus === 1}>Não Visualizado</option>
            <option value="2" selected={props.idStatus === 2}>Em Análise</option>
            <option value="3" selected={props.idStatus === 3}>Fechado</option>
            <option value="4" selected={props.idStatus === 4}>Em Processo de Resolução</option>
            <option value="5" selected={props.idStatus === 5}>Resolvido</option>
          </select>
        </h4>
      </div>
    )
  } 
  else 
  {
    return (
      <div>
        <h4 className="statusDenunciaH4"> Situação 
        <StatusLabel color={ props.idStatus === 1 ? '#5d9fd4' 
                          : (props.idStatus === 2 ? '#d6950a' 
                          : (props.idStatus === 3 ? '#d45d6d' 
                          : (props.idStatus === 4 ? '#956fb4' 
                          : (props.idStatus === 5 ? '#4faf5f' : ""))))} className="statusDenunciaMessageB">
                      {status?.status === undefined ? "" : status?.status}</StatusLabel></h4>
      </div>
    )
  }
}

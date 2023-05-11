import React, { useContext, useEffect, useState } from 'react';

import Status from '../../types/Status';

import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { StatusLabel } from "../../styles/styled-components"
import { colorPallete } from "../../styles/colors"

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
        <select onChange={alterarStatus}>
          <option value="1" selected={props.idStatus === 1}>Não Visualizado</option>
          <option value="2" selected={props.idStatus === 2}>Em Análise</option>
          <option value="3" selected={props.idStatus === 3}>Fechado</option>
          <option value="4" selected={props.idStatus === 4}>Em Processo de Resolução</option>
          <option value="5" selected={props.idStatus === 5}>Resolvido</option>
        </select>
      </div>
    )
  } 
  else 
  {
    return (
      <div>
        <p style={{color: colorPallete.fontBlack}}> Situação: <StatusLabel color={ props.idStatus == 1 || 3 ? colorPallete.bgRed 
                                        : props.idStatus == 2 || 4 ? colorPallete.bgYellow 
                                        : colorPallete.bgGreen }>
                      {status?.status === undefined ? "" : status?.status}</StatusLabel></p>
      </div>
    )
  }
}

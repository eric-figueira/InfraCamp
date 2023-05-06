import React, { useContext, useEffect, useState } from 'react';

import Status from '../../types/Status';

import { AuthContext } from '../../contexts/AuthContext';
import { useGet } from '../../hooks/useGet';

export interface IStatus {
  idStatus?: number
}


export const StatusDenuncia: React.FC<IStatus> = (props) => {

  const { user } = useContext(AuthContext)

  //const { data: status } = useGet(`http://localhost:5164/api/statusDenuncia/`)
  const [status, setStatus] = useState<Status[] | null | Status>()


  useEffect(() => 
  {
    if (user?.funcionario) {
      const { data: status } = useGet<Status[]>('http://localhost:5164/api/statusDenuncia/')
      setStatus(status)
    }
    else {

    }
  }, [])

  if (user?.funcionario) 
  {
    return (
      <div>
        <select>
          <option value="NaoVisualizado">Não Visualizado</option>
          <option value="Analise">Em Análise</option>
          <option value="Fechado">Fechado</option>
          <option value="Resolvendo">Em Processo de Resolução</option>
          <option value="Resolvido">Resolvido</option>
        </select>
      </div>
    )
  } 
  else 
  {
    return (
      <div>

      </div>
    )
  }
}

import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { useGet } from '../../hooks/useGet';

export interface IStatus {
  idStatus?: number
}


export const StatusDenuncia: React.FC<IStatus> = (props) => {

  const { user } = useContext(AuthContext)

  //const { data: status } = useGet(`http://localhost:5164/api/statusDenuncia/`)
  const [status, setStatus] = useState()


  useEffect(() => {

    if (user?.funcionario) {
      const { data:  } = useGet('http://localhost:5164/api/statusDenuncia/')
    }

  }, [])

  return (
    <>

    </>
  );
}

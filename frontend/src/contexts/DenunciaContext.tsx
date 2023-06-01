import { ReactNode, createContext, useState } from "react";

export const DenunciaContext = createContext({idDenuncia: 1, updateIdDenuncia: (n: number) => {}});

interface IProps {
    children?: ReactNode
}

export const DenunciaProvider: React.FC<IProps> = ({children}) => {
    const [idDenuncia, setIdDenuncia] = useState<number>(1);

    function updateIdDenuncia(id : number) {
        alert(id)
        setIdDenuncia(id);
        alert(idDenuncia)
    }

    return (
        <DenunciaContext.Provider value={{ idDenuncia, updateIdDenuncia }}>
            {children}
        </DenunciaContext.Provider>
    )
}

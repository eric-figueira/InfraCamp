import { ReactNode, createContext, useState } from "react";

export const DenunciaContext = createContext<{ idDenuncia: Number; setIdDenuncia: React.Dispatch<React.SetStateAction<Number>> } | null>(null);

interface IProps {
    children?: ReactNode
}

export const DenunciaProvider: React.FC<IProps> = ({children}) => {
    const [idDenuncia, setIdDenuncia] = useState<Number>(1);

    return (
        <DenunciaContext.Provider value={{ idDenuncia, setIdDenuncia }}>
            {children}
        </DenunciaContext.Provider>
    )
}

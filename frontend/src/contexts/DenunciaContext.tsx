import { createContext } from "react";

interface DenunciaContextType {
    idDenuncia: number,
    setIdDenuncia: React.SetStateAction<number>
}

export const DenunciaContext = createContext(null);

export const DenunciaProvider = () => {
    return (
        <DenunciaContext.Provider value={}>

        </DenunciaContext.Provider>
    )
}

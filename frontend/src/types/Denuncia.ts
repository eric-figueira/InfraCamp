type Denuncia = {
    idDenuncia: number;
    latitude: number;
    longitude: number;
    endereco: string;
    idTipoDenuncia: number;
    idStatusDenuncia: number;
    urlImagem: string;
    descricao: string;
    idUsuario: string;
    dataDenuncia: string;
};

export default Denuncia;
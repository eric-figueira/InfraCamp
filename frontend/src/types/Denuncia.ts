type Denuncia = {
    idDenuncia: number;
    latitude: number;
    longitude: number;
    endereco: string;
    idTipo: number;
    idStatus: number;
    urlImagem: string;
    descricao: string;
    cpf: string;
    dataDenuncia: Date;
};

export default Denuncia;
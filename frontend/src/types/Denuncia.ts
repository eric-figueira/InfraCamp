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
    dataDenuncia: Date;
    nome: string;
    status: string;
    tipo: string;
    likes: number;
};

export default Denuncia;
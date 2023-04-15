CREATE SCHEMA InfraCamp

CREATE TABLE InfraCamp.TipoDenuncia ( 
	idTipo INT PRIMARY KEY IDENTITY(1, 1),
	tipo VARCHAR(30) NOT NULL
);

INSERT INTO InfraCamp.TipoDenuncia (tipo) VALUES 
	('Buraco na rua/cal�ada'), 
	('Poste ca�do'),
	('Grama/mato alto'),
	('Lixo'),
	('Fios soltos'),
	('�rvore ca�da'),
	('Bueiro entupido'),
	('Infraestrutura prec�ria'),
	('Falta de energia'),
	('Falta de �gua'); -- etc

CREATE TABLE InfraCamp.StatusDenuncia ( 
	idStatus INT PRIMARY KEY IDENTITY(1, 1),
	tipo VARCHAR(30) NOT NULL
);

INSERT INTO InfraCamp.StatusDenuncia (tipo) VALUES 
	('N�o visualizado'),
	('Em an�lise'),
	('Fechado'),
	('Em processo de resolu��o'),
	('Resolvido');

CREATE TABLE InfraCamp.Usuario (
	cpf CHAR(14) PRIMARY KEY CHECK(
		cpf LIKE '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9]-[0-9][0-9]'
	),
	nome VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	telefone VARCHAR(20) NOT NULL,
	senha VARCHAR(30) NOT NULL,
	urlImagem TEXT NULL,
	isFunc BIT NOT NULL
);

CREATE TABLE InfraCamp.Denuncia (
	idDenuncia INT PRIMARY KEY NOT NULL IDENTITY(1, 1),
	latitude DECIMAL NOT NULL,
	longitude DECIMAL NOT NULL,
	endereco VARCHAR(MAX) NOT NULL,
	tipoDenuncia INT NOT NULL, 
	CONSTRAINT fkTipoDenuncia FOREIGN KEY (tipoDenuncia) REFERENCES InfraCamp.TipoDenuncia(idTipo),
	statusDenuncia INT NOT NULL, 
	CONSTRAINT fkStatusDenuncia FOREIGN KEY (statusDenuncia) REFERENCES InfraCamp.StatusDenuncia(idStatus),
	descricao VARCHAR(150) NULL,
	urlImagem TEXT NULL,
	idUsuario CHAR(14) NOT NULL,
	CONSTRAINT fkIdUsuario FOREIGN KEY(idUsuario) REFERENCES InfraCamp.Usuario(cpf),
	dataDenuncia DATETIME NOT NULL
);

-- likes ou dislikes do usu�rio
CREATE TABLE InfraCamp.Opiniao (
	idDenuncia INT NOT NULL,
	CONSTRAINT fkIdDenuncia FOREIGN KEY(idDenuncia) REFERENCES InfraCamp.Denuncia(idDenuncia)
		ON DELETE CASCADE ON UPDATE CASCADE,
	idUsuario CHAR(14) NOT NULL,
	CONSTRAINT fkIdUsuarioOpiniao FOREIGN KEY(idUsuario) REFERENCES InfraCamp.Usuario(cpf)
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT pkOpiniao PRIMARY KEY (idDenuncia, idUsuario),
	dataOpiniao DATETIME NOT NULL,
	isCurtida BIT NOT NULL
);

-- atualiza��es do moderador no status de alguma den�ncia
CREATE TABLE InfraCamp.Atualizacao (
	idDenuncia INT NOT NULL,
	CONSTRAINT fkIdDenunciaAtualizacao FOREIGN KEY(idDenuncia) REFERENCES InfraCamp.Denuncia(idDenuncia)
		ON DELETE CASCADE ON UPDATE CASCADE,
	idUsuario CHAR(14) NOT NULL,
	CONSTRAINT fkIdUsuarioAtualizacao FOREIGN KEY(idUsuario) REFERENCES InfraCamp.Usuario(cpf)
		ON DELETE CASCADE ON UPDATE CASCADE,
	statusDenuncia INT NOT NULL,
	CONSTRAINT fkStatusDenunciaAtualizacao FOREIGN KEY(statusDenuncia) REFERENCES InfraCamp.StatusDenuncia(idStatus),
	CONSTRAINT pkAtualizacao PRIMARY KEY(idDenuncia, idUsuario, statusDenuncia),
	dataAtualizacao DATETIME NOT NULL,
	comentario VARCHAR(150) NULL
);

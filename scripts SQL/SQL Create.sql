CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Usuario VARCHAR(20),
    Nome_Exibicao VARCHAR(40),
    Biografia_Usuario VARCHAR(60),
    Senha_Usuario VARCHAR(30),
    Email_Usuario VARCHAR(40),
    Paginas_Lidas INT
);

CREATE TABLE Genero (
    idGenero INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Genero VARCHAR(25)
);

CREATE TABLE Livro (
    idLivro INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Livro VARCHAR(50),
    Total_Paginas INT,
    Ano_Lancamento INT,
    fk_Genero_idGenero INT,
    QTD_Em_Listas INT,
    FOREIGN KEY(fk_Genero_idGenero) REFERENCES Genero(idGenero)
);

CREATE TABLE Autor (
    idAutor INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Autor VARCHAR(50)
);

CREATE TABLE Livro_Autor (
    fk_Autor_idAutor INT,
    fk_Livro_idLivro INT,
    FOREIGN KEY(fk_Autor_idAutor) REFERENCES Autor(idAutor),
    FOREIGN KEY(fk_Livro_idLivro) REFERENCES Livro(idLivro)
);

CREATE TABLE Usuario_Livro (
    fk_Usuario_idUsuario INT ,
    fk_Livro_idLivro INT,
    Tempo_Leitura INT,
    Data_Inicio_Leitura DATE,
    Data_Termino_Leitura DATE,
    Avaliacao INT,
    Status_Lista INT,
    FOREIGN KEY(fk_Usuario_idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY(fk_Livro_idLivro) REFERENCES Livro(idLivro)
);
 

--PROCEDURE

DELIMITER $$
CREATE PROCEDURE LivrosSendoLidos (IN idLivro INT)
BEGIN
	SELECT count(*) 'Total Sendo Lido'
	FROM usuario_livro
	WHERE fk_Livro_idLivro = idLivro  AND Status_Lista = 2;
END $$
DELIMITER ;





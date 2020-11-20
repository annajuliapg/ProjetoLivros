-- TABELAS --

-- CREATE SCHEMA `shelf` DEFAULT CHARACTER SET utf8 ;
USE Shelf;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Usuario VARCHAR(20),
    Nome_Exibicao VARCHAR(40),
    Biografia_Usuario VARCHAR(60),
    Senha_Usuario VARCHAR(30),
    Email_Usuario VARCHAR(40),
    Paginas_Lidas INT DEFAULT 0
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
    idGenero INT,
    Qtd_Em_Listas INT DEFAULT 0,
    CONSTRAINT fk_Genero_idGenero FOREIGN KEY(idGenero) REFERENCES Genero(idGenero)
);

CREATE TABLE Autor (
    idAutor INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Autor VARCHAR(50)
);

CREATE TABLE Livro_Autor (
    idAutor INT,
    idLivro INT,
    CONSTRAINT fk_Autor_idAutor FOREIGN KEY(idAutor) REFERENCES Autor(idAutor),
    CONSTRAINT fk_Livro_idLivro_la FOREIGN KEY(idLivro) REFERENCES Livro(idLivro)
);

CREATE TABLE Usuario_Livro (
    idUsuario INT ,
    idLivro INT,
    Tempo_Leitura INT,
    Data_Inicio_Leitura DATE,
    Data_Termino_Leitura DATE,
    Avaliacao INT,
    Status_Lista INT,
    CONSTRAINT fk_Usuario_idUsuario FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT fk_Livro_idLivro_ul FOREIGN KEY(idLivro) REFERENCES Livro(idLivro)
);
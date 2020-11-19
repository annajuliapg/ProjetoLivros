-- CREATE SCHEMA `shelf` DEFAULT CHARACTER SET utf8 ;
USE Shelf;

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
    idGenero INT,
    Qtd_Em_Listas INT,
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
 
-- PROCEDURES
DELIMITER $$
CREATE PROCEDURE LivrosSendoLidos (IN varIdLivro INT)
BEGIN
	SELECT count(*) 'Total Sendo Lido'
	FROM usuario_livro
	WHERE idLivro = varIdLivro
    AND Status_Lista = 2;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE PessoasLendoGenero (IN varIdGenero INT)
BEGIN
	SELECT count(*) 'Quantidade de Usuários Lendo Livros do Gênero'
    FROM usuario_livro ul
    INNER JOIN livro l
    ON ul.idLivro = l.idLivro
    WHERE l.idGenero = varIdGenero
    AND ul.Status_Lista = 2;
END $$
DELIMITER ;

-- TRIGGERS
DELIMITER $
CREATE TRIGGER PaginasLidasINSERT
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE x INT;
IF NEW.Status_Lista = 3 THEN
    
    SET x = (
		SELECT Total_Paginas
		FROM livro 
		WHERE idlivro = NEW.idlivro
    );

    UPDATE usuario
    SET Paginas_Lidas = Paginas_Lidas + x
    WHERE idUsuario = NEW.idUsuario;

END IF;
END$;
DELIMITER ;

DELIMITER $
CREATE TRIGGER PaginasLidasUPDATE
AFTER UPDATE
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE x INT;
IF NEW.Status_Lista = 3 THEN
    
    SET x = (
		SELECT Total_Paginas
		FROM livro 
		WHERE idlivro = NEW.idlivro
    );

    UPDATE usuario
    SET Paginas_Lidas = Paginas_Lidas + x
    WHERE idUsuario = NEW.idUsuario;

END IF;
END$;
DELIMITER ;


DELIMITER $$
CREATE TRIGGER QuantidadeListas
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN
  UPDATE livro SET livro.QTD_Em_Listas = livro.QTD_Em_Listas + 1
  WHERE usuario_livro.fk_Livro_idLivro = livro.idLivro;
END $$
DELIMITER ;

-- FUNCTIONS

DELIMITER $$
 
 CREATE FUNCTION TopLivros() RETURNS INT
 BEGIN
	select count(*), usuario_livro.fk_Livro_idLivro
	from usuario_livro
	group by usuario_livro.fk_Livro_idLivro
	order by count(*) desc
	limit 1;
    RETURN;
 END $$




-- PROCEDURES --

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
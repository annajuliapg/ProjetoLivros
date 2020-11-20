-- FUNCTIONS --

DELIMITER $$
CREATE FUNCTION LivroMaisLido ()
RETURNS CHAR(50)
READS SQL DATA
DETERMINISTIC
BEGIN
	DECLARE IdLivroMaisLido INT;

    SET IdLivroMaisLido = (
        SELECT ul.idLivro
        FROM usuario_livro ul
        GROUP BY ul.idLivro
        ORDER BY count(*) desc
        LIMIT 1
    );

RETURN CONCAT('O id do livro mais lido é ',IdLivroMaisLido);
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION QTDLivroComsAvaliacoesBoas ()
RETURNS CHAR(60)
READS SQL DATA
DETERMINISTIC
BEGIN
	DECLARE qtdLivros INT;

	SET qtdLivros = (
        select count(*)
        from usuario_livro
        where Avaliacao >= 8
	);
    
    IF qtdLivros = 0 THEN
		RETURN CONCAT('Nenhum livro tem avaliações com 4 ou mais estrelas');
	ELSEIF qtdLivros = 1 THEN
		RETURN CONCAT('Somente 1 livro tem avaliações com 4 ou mais estrelas');
	ELSE
		RETURN CONCAT(qtdLivros, ' livros tem avaliações com 4 ou mais estrelas');
	END IF;

END$$
DELIMITER ;
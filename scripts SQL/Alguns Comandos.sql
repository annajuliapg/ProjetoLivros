-- Alguns Comandos --

-- informacoes de 1 ususario
SELECT * FROM usuario
WHERE idUsuario = 4;

-- livros com as informações completas
SELECT l.idLivro,
		l.Nome_Livro,
        a.Nome_Autor,
        l.Total_Paginas,
        l.Ano_Lancamento,
        g.Nome_Genero
FROM livro l
INNER JOIN genero g ON l.idGenero = g.idGenero
INNER JOIN livro_autor la ON l.idLivro = la.idLivro
INNER JOIN autor a ON la.idAutor = a.idAutor;

-- usuario_livro --

-- INSERT --
-- STATUS 1
INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista)
VALUES (1, 1, 1);

-- STATUS 2
INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista)
VALUES (1, 2,'2020-11-04', 2);

-- STATUS 3
INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Data_Termino_Leitura, Tempo_Leitura, Avaliacao, Status_Lista)
VALUES (1, 3,'2020-11-04','2020-11-14', 10, 10, 3);

-- UPDATE --
-- STATUS 1 PARA O 2
UPDATE usuario_livro
SET Status_Lista = 2,
Data_Inicio_Leitura = '2020-11-21'
WHERE idUsuario = 1
AND idLivro = 1;

-- STATUS 2 PARA O 3
UPDATE usuario_livro
SET Status_Lista = 3,
Data_Termino_Leitura = '2020-11-24',
Tempo_Leitura = 20
AND Avaliacao = 9
WHERE idUsuario = 1
AND idLivro = 1;

-- somente esses por enquanto --

-- DELETE -- 
DELETE FROM usuario_livro
WHERE idUsuario = 1
AND idLivro = 1;

-- SELECT --
-- livros que o usuario tem em todas as listas
SELECT u.idUsuario,
		u.Nome_Exibicao,
        l.idLivro,
        l.Nome_Livro,
        ul.Status_Lista
FROM usuario_livro ul
inner join usuario u on ul.idUsuario = u.idUsuario
inner join livro l on l.idLivro = ul.idLivro
WHERE ul.idUsuario = 1;

-- livros que o usuario tem em um lista específica
SELECT u.idUsuario,
		u.Nome_Exibicao,
        l.idLivro,
        l.Nome_Livro,
        ul.Status_Lista
FROM usuario_livro ul
inner join usuario u on ul.idUsuario = u.idUsuario
inner join livro l on l.idLivro = ul.idLivro
WHERE ul.idUsuario = 1
AND ul.Status_Lista = 2;

SELECT * FROM usuario_livro WHERE idUsuario = 1 AND idLivro = 2;
SELECT * FROM usuario_livro WHERE idUsuario = 1 AND idLivro = 2;

INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista)
VALUES (1, 2,'2020-11-04', 2);

UPDATE usuario_livro 
SET Status_Lista = 3, Data_Termino_Leitura = '2020-11-25', Tempo_Leitura = DATEDIFF ('2020-11-25', Data_Inicio_Leitura), Avaliacao = 10 
WHERE idUsuario = 1 AND idLivro = 2;

DELETE FROM usuario_livro
WHERE idUsuario = 1
AND idLivro = 2;

SELECT l.Nome_Livro, l.Total_Paginas
FROM usuario_livro ul
INNER JOIN livro l ON l.idLivro = ul.idLivro
WHERE ul.Status_Lista = 1 AND ul.idUsuario = 1;

SELECT l.Nome_Livro, DATEDIFF (CURDATE(), ul.Data_Inicio_Leitura) AS 'Tempo Lendo até Agora'
FROM usuario_livro ul
INNER JOIN livro l ON l.idLivro = ul.idLivro
WHERE ul.Status_Lista = 2 AND ul.idUsuario = 1;

SELECT l.Nome_Livro, ul.Tempo_Leitura, l.Total_Paginas, ul.Avaliacao
FROM usuario_livro ul
INNER JOIN livro l ON l.idLivro = ul.idLivro
WHERE ul.Status_Lista = 3 AND ul.idUsuario = 1;
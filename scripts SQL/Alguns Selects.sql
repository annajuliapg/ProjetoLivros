-- Alguns Selects --

-- livros que o usuario tem em todas as listas
SELECT u.idUsuario,
		u.Nome_Exibicao,
        l.idLivro,
        l.Nome_Livro,
        ul.Status_Lista
FROM usuario_livro ul
inner join usuario u on ul.idUsuario = u.idUsuario
inner join livro l on l.idLivro = ul.idLivro
WHERE ul.idUsuario = 3;

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
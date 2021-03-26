SELECT DISTINCT l.idLivro, l.Nome_Livro, 
(
	select GROUP_CONCAT(a.Nome_Autor SEPARATOR ', ') 
    from autor a 
    INNER JOIN livro_autor la ON l.idLivro = la.idLivro AND la.idAutor = a.idAutor
) AS Nome_Autor
FROM livro l
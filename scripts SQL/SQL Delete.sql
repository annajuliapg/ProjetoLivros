DELETE FROM usuario_livro
WHERE idUsuario = 1
AND idLivro = 5;

UPDATE usuario SET Paginas_Lidas = 0, Livros_Lidos = 0, Tempo_Total_Leitura = 0 WHERE idUsuario = 1;

TRUNCATE TABLE  usuario;
TRUNCATE TABLE  autor;
TRUNCATE TABLE  genero;
TRUNCATE TABLE  livro;
TRUNCATE TABLE  livro_autor;
TRUNCATE TABLE  usuario_livro;
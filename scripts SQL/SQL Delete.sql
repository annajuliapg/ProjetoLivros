DELETE FROM usuario_livro
WHERE idUsuario = 1
AND idLivro = 5;

select * from usuario;
select * from usuario_livro;
select * from livro;

UPDATE usuario SET Paginas_Lidas = 0, Livros_Lidos = 0, Tempo_Total_Leitura = 0 WHERE idUsuario = 6;
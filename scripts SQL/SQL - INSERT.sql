INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('anna', 'Anna Júlia', 'Adoro Ler', 'anna@gmail.com', '1234');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('julia', 'Júlia', 'AMO Ler', 'julia@gmail.com', '4321');

select * from usuario;
-- --------------------------------
INSERT INTO autor (Nome_Autor)
VALUES ('Rick Riordan');

INSERT INTO autor (Nome_Autor)
VALUES ('Paulo Coelho');

select * from autor;
-- --------------------------------
INSERT INTO genero (Nome_Genero)
VALUES ('Aventura');

INSERT INTO genero (Nome_Genero)
VALUES ('Drama');

select * from genero;
-- --------------------------------
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Percy Jackson', 300, 2005, 1);

INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('O Alquimista', 245, 1998, 2);

select * from livro;
-- --------------------------------
INSERT INTO usuario_livro (Usuario_idUsuario, Livro_idLivro, Status_Lista)
VALUES (1, 1, 'P');

INSERT INTO usuario_livro (Usuario_idUsuario, Livro_idLivro, Data_Inicio_Leitura, Status_Lista)
VALUES (1, 2, '2020-10-13', 'A');

INSERT INTO usuario_livro (Usuario_idUsuario, Livro_idLivro, Tempo_Leitura, Data_Inicio_Leitura, Data_Termino_Leitura, Avaliacao, Status_Lista)
VALUES (2, 1, 10,'2020-04-04','2020-04-14', 5.0, 'L');

/* 
STATUS
P - para ler
A - lendo agora
L - lido
*/

select * from usuario_livro;
-- --------------------------------
INSERT INTO livro_autor (Livro_idLivro, Autor_idAutor)
VALUES (1, 1);

INSERT INTO livro_autor (Livro_idLivro, Autor_idAutor)
VALUES (2, 2);

select * from livro_autor;










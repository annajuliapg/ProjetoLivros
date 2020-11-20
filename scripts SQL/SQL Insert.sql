-- usuario
INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('anna', 'Anna', 'Adoro Ler', 'anna@gmail.com', '1234');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('julia', 'Júlia', 'AMOOOOOOOO Ler', 'julia@gmail.com', '4321');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('toby', 'Toby', 'Não sei ler mas to aqui', 'toby@gmail.com', 'ursinho');

-- livro
INSERT INTO autor (Nome_Autor)
VALUES ('Rick Riordan');

INSERT INTO genero (Nome_Genero)
VALUES ('Aventura');

INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Percy Jackson e o Ladrão de Raios', 300, 2005, 1);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (1, 1);
-- ----------------------------
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('O Herói Perdido', 553, 2010, 1);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (2, 1);
-- ----------------------------
INSERT INTO autor (Nome_Autor)
VALUES ('Suzanne Collins');

INSERT INTO genero (Nome_Genero)
VALUES ('Distopia');

INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Jogos Vorazes', 256, 2009, 2);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (3, 2);
-- ----------------------------
-- usuario livro
INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista)
VALUES (1, 1, 1);

INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista)
VALUES (1, 2,'2020-11-04', 2);

INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Data_Termino_Leitura, Tempo_Leitura, Avaliacao, Status_Lista)
VALUES (1, 3,'2020-11-04','2020-11-14', 10, 10, 3);

INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista)
VALUES (2, 1,'2020-11-04', 2);

INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista)
VALUES (3, 1, 1);

INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista)
VALUES (3, 2, 1);

INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista)
VALUES (3, 3, 1);
-- usuario
INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('anna', 'Anna', 'Adoro Ler', 'anna@gmail.com', '1234');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('julia', 'Júlia', 'AMOOOOOOOO Ler', 'julia@gmail.com', '4321');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('toby', 'Toby', 'Não sei ler mas to aqui', 'toby@gmail.com', 'ursinho');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('Stitch', 'Maria', "Don't talk to me I'm reading", 'maria@gmail.com', 'stitch');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('Isa', 'Isadora', "AMOOOOOOOOOOOO LER", 'isadora@gmail.com', '6789');

INSERT INTO usuario (Nome_Usuario, Nome_Exibicao, Biografia_Usuario, Email_Usuario, Senha_Usuario)
VALUES ('blequizinho', 'Othavio', "Ler é massa!", 'othavio@gmail.com', '0000');

-- generos --

/*1*/
INSERT INTO genero (Nome_Genero)
VALUES ('Aventura');
/*2*/
INSERT INTO genero (Nome_Genero)
VALUES ('Distopia');
/*3*/
INSERT INTO genero (Nome_Genero)
VALUES ('Romance');

-- autor --
/*1*/
INSERT INTO autor (Nome_Autor)
VALUES ('Rick Riordan');
/*2*/
INSERT INTO autor (Nome_Autor)
VALUES ('Suzanne Collins');
/*3*/
INSERT INTO autor (Nome_Autor)
VALUES ('James Dashner');
/*4*/
INSERT INTO autor (Nome_Autor)
VALUES ('John Green');
/*5*/
INSERT INTO autor (Nome_Autor)
VALUES ('Lois Lowry');
/*6*/
INSERT INTO autor (Nome_Autor)
VALUES ('Joelle Charbonneau');
/*7*/
INSERT INTO autor (Nome_Autor)
VALUES ('Victoria Van Tiem');
/*8*/
INSERT INTO autor (Nome_Autor)
VALUES ('Jenna Evans Welch');

-- livro
/*1*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Percy Jackson e o Ladrão de Raios', 300, 2005, 1);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (1, 1);
-- ----------------------------
/*2*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('O Herói Perdido', 553, 2010, 1);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (2, 1);
-- ----------------------------
/*3*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Jogos Vorazes', 256, 2009, 2);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (3, 2);
-- ----------------------------
/*4*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Maze Runner', 426, 2009, 2);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (4, 3);
-- ----------------------------
/*5*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Cidades de Papel', 363, 2015, 3);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (5, 4);
-- ----------------------------
/*6*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('O Doador de Memórias', 185, 1993, 2);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (6, 5);
-- ----------------------------
/*7*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('O Teste', 318, 2013, 1);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (7, 6);
-- ----------------------------
/*8*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Um Amor de Cinema', 293 , 2014, 3);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (8, 7);
-- ----------------------------
/*9*/
INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero)
VALUES ('Amor e Gelato', 317 , 2017, 3);

INSERT INTO livro_autor (idLivro, idAutor)
VALUES (9, 8);
-- ----------------------------
/*
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
*/
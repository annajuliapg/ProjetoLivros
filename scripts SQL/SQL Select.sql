select * from usuario;
select * from autor;
select * from genero;
select * from livro;
select * from livro_autor;
select * from usuario_livro;

CALL LivrosSendoLidos(2);
CALL PessoasLendoGenero(1);

select LivroMaisLido ();
select QTDLivroComsAvaliacoesBoas ();
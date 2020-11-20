-- TRIGGERS --

DELIMITER $
CREATE TRIGGER PaginasLidasINSERT
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE paginasNovasLidas INT;
IF NEW.Status_Lista = 3 THEN
    
    SET paginasNovasLidas = (
		SELECT Total_Paginas
		FROM livro l
		WHERE l.idlivro = NEW.idlivro
    );
    
    UPDATE usuario u
	SET u.Paginas_Lidas =
		(CASE
				WHEN u.Paginas_Lidas IS NULL THEN paginasNovasLidas
				ELSE u.Paginas_Lidas + paginasNovasLidas
		END)
	WHERE u.idUsuario = NEW.idUsuario;   

END IF;
END$;
DELIMITER ;

DELIMITER $
CREATE TRIGGER PaginasLidasUPDATE
AFTER UPDATE
ON usuario_livro
FOR EACH ROW
BEGIN
DECLARE paginasNovasLidas INT;
IF NEW.Status_Lista = 3 THEN
    
    SET paginasNovasLidas = (
		SELECT Total_Paginas
		FROM livro l
		WHERE l.idlivro = NEW.idlivro
    );

	UPDATE usuario u
	SET u.Paginas_Lidas =
		(CASE
				WHEN u.Paginas_Lidas IS NULL THEN paginasNovasLidas
				ELSE u.Paginas_Lidas + paginasNovasLidas
		END)
	WHERE u.idUsuario = NEW.idUsuario;

END IF;
END$;
DELIMITER ;


DELIMITER $
CREATE TRIGGER QuantidadeEmListas
AFTER INSERT
ON usuario_livro
FOR EACH ROW
BEGIN

  UPDATE livro l
  SET l.QTD_Em_Listas = 
  (CASE
		WHEN l.QTD_Em_Listas IS NULL THEN 1
        ELSE l.QTD_Em_Listas + 1
  END)
  WHERE NEW.idLivro = l.idLivro;

END $
DELIMITER ;
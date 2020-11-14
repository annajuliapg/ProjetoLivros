-- -----------------------------------------------------
-- Schema Shelf
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Shelf` DEFAULT CHARACTER SET utf8 ;
USE `Shelf` ;

-- -----------------------------------------------------
-- Table `Shelf`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome_Usuario` VARCHAR(20) NOT NULL,
  `Nome_Exibicao` VARCHAR(30) NOT NULL,
  `Biografia_Usuario` VARCHAR(60) NULL,
  `Email_Usuario` VARCHAR(20) NOT NULL,
  `Senha_Usuario` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idUsuario`)
);
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Shelf`.`Autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Autor` (
  `idAutor` INT NOT NULL AUTO_INCREMENT,
  `Nome_Autor` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idAutor`)
);
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Shelf`.`Genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `Nome_Genero` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idGenero`)
);
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Shelf`.`Livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Livro` (
  `idLivro` INT NOT NULL AUTO_INCREMENT,
  `Nome_Livro` VARCHAR(30) NOT NULL,
  `Total_Paginas` INT NOT NULL,
  `Ano_Lancamento` INT(4) NULL,
  `idGenero` INT NULL,
  PRIMARY KEY (`idLivro`),
  CONSTRAINT `fk_Genero`
    FOREIGN KEY (`idGenero`)
    REFERENCES `Shelf`.`Genero` (`idGenero`)
);
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Shelf`.`Usuario__Livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Usuario_Livro` (
  `Usuario_idUsuario` INT NOT NULL,
  `Livro_idLivro` INT NOT NULL,
  `Tempo_Leitura` INT NULL,
  `Data_Inicio_Leitura` DATE NULL,
  `Data_Termino_Leitura` DATE NULL,
  `Avaliacao` DECIMAL(2,1) NULL,
  `Status_Lista` CHAR NOT NULL,
  PRIMARY KEY (`Usuario_idUsuario`, `Livro_idLivro`),
  CONSTRAINT `fk_Usuario_Livro_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Shelf`.`Usuario` (`idUsuario`),
  CONSTRAINT `fk_Usuario_Livro_Livro`
    FOREIGN KEY (`Livro_idLivro`)
    REFERENCES `Shelf`.`Livro` (`idLivro`)
);
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Shelf`.`Livro_Autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Shelf`.`Livro_Autor` (
  `Livro_idLivro` INT NOT NULL,
  `Autor_idAutor` INT NOT NULL,
  PRIMARY KEY (`Livro_idLivro`, `Autor_idAutor`),
  CONSTRAINT `fk_Livro_Autor_Livro`
    FOREIGN KEY (`Livro_idLivro`)
    REFERENCES `Shelf`.`Livro` (`idLivro`),
  CONSTRAINT `fk_Livro_Autor_Autor`
    FOREIGN KEY (`Autor_idAutor`)
    REFERENCES `Shelf`.`Autor` (`idAutor`)
);
-- ENGINE = InnoDB;
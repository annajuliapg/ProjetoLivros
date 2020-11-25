// db.js
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    
    try {
        const mysql = require("mysql2/promise");

        const connection = await mysql.createConnection("mysql://root:Syst3mSyst3m@localhost:3306/shelf");

        global.connection = connection;

        console.log("Conectou no MySQL!");
    
        return connection;
    }
    catch (erro) {
        console.log("\nNão foi possível estabelecer a conexão com o Bando de Dados. Verifique se o serviço está ligado e tente novamente.\n");
        process.exit(1);
    }
}

/* USUARIO */

//SELECT
async function selectUsuario(idUsuario) {
    const conn = await connect();

    const [rows] = await conn.query("SELECT * FROM usuario WHERE idUsuario = ?;", idUsuario);

    if (!rows.length) return "Não há usuário com esse id"
    else return rows;
}

/* LIVROS */

//SELECT
async function selectLivros() {
    const conn = await connect();

    const [rows] = await conn.query("SELECT l.idLivro, l.Nome_Livro, a.Nome_Autor, l.Total_Paginas, l.Ano_Lancamento, g.Nome_Genero FROM livro l INNER JOIN genero g ON l.idGenero = g.idGenero INNER JOIN livro_autor la ON l.idLivro = la.idLivro INNER JOIN autor a ON la.idAutor = a.idAutor;");

    if (!rows.length) return "Não há livros registardos"
    else return rows;
}

/* USUARIO LIVRO */

//INSERT
//STATUS 1
async function insertLivroS1(lista) {
    const conn = await connect();

    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista) VALUES (?, ?, 1);";

    const values = [lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//STATUS 2
async function insertLivroS2(lista) {
    const conn = await connect();

    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista) VALUES (?, ?, ?, 2);";

    const values = [lista.idUsuario, lista.idLivro, lista.Data_Inicio_Leitura];

    await conn.query(sql, values);
}

//STATUS 3
async function insertLivroS3(lista) {
    const conn = await connect();
    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Data_Termino_Leitura, Tempo_Leitura, Avaliacao, Status_Lista)VALUES ( ?, ?, ?, ?, ?, ?, 3);";
    const values = [lista.idUsuario, lista.idLivro, lista.Data_Inicio_Leitura, lista.Data_Termino_Leitura, lista.Tempo_Leitura, lista.Avaliacao];
    await conn.query(sql, values);
}

//UPDATE
//STATUS 1 PARA 2
async function updateLivroS1S2(lista) {
    const conn = await connect();

    const sql = "UPDATE usuario_livro SET Status_Lista = 2, Data_Inicio_Leitura = ? WHERE idUsuario = ? AND idLivro = ?;";

    const values = [lista.Data_Inicio_Leitura, lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//STATUS 2 PARA 3
async function updateLivroS2S3(lista) {
    const conn = await connect();

    const sql = "UPDATE usuario_livro SET Status_Lista = 3, Data_Termino_Leitura = ?, Tempo_Leitura = DATEDIFF (?, Data_Inicio_Leitura), Avaliacao = ? WHERE idUsuario = ? AND idLivro = ?;";

    const values = [lista.Data_Termino_Leitura, lista.Data_Termino_Leitura, lista.Avaliacao, lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//DELETE
async function deleteLivroLista(lista) {
    const conn = await connect();

    const sql = 'DELETE FROM usuario_livro where idUsuario = ? AND idLivro = ?;';

    const values = [lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//SELECT STATUS 1
async function selectStatus1(idUsuario) {
    const conn = await connect();

    const [rows] = await conn.query("SELECT l.Nome_Livro, l.Total_Paginas FROM usuario_livro ul INNER JOIN livro l ON l.idLivro = ul.idLivro WHERE ul.Status_Lista = 1 AND ul.idUsuario = ?;", idUsuario);

    if (!rows.length) return "Não há livros nessa lista do usuário"
    else return rows;
}

//SELECT STATUS 2
async function selectStatus2(idUsuario) {
    const conn = await connect();

    const [rows] = await conn.query("SELECT l.Nome_Livro, DATEDIFF (CURDATE(), ul.Data_Inicio_Leitura) AS 'Tempo Lendo até Agora' FROM usuario_livro ul INNER JOIN livro l ON l.idLivro = ul.idLivro WHERE ul.Status_Lista = 2 AND ul.idUsuario = ?;", idUsuario);

    if (!rows.length) return "Não há livros nessa lista do usuário"
    else return rows;
}

//SELECT STATUS 3
async function selectStatus3(idUsuario) {
    const conn = await connect();

    const [rows] = await conn.query("SELECT l.Nome_Livro, ul.Tempo_Leitura, l.Total_Paginas, ul.Avaliacao FROM usuario_livro ul INNER JOIN livro l ON l.idLivro = ul.idLivro WHERE ul.Status_Lista = 3 AND ul.idUsuario = ?;", idUsuario);

    if (!rows.length) return "Não há livros nessa lista do usuário"
    else return rows;
}


module.exports = { selectUsuario, selectLivros, insertLivroS1, insertLivroS2, insertLivroS3, updateLivroS1S2, updateLivroS2S3, deleteLivroLista, selectStatus1, selectStatus2, selectStatus3};

/*

usuario - select

livro - select
autor - join
genero - join
livro_autor - join

usuario_livro -

insert - lista 1, 2 e 3

update - lista 1 para 2, lista 2 para 3

select - lista 1, lista 2, lista 3

delete - off

*/
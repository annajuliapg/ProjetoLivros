// db.js
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:Syst3mSyst3m@localhost:3306/shelf");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

/* USUARIO */

//SELECT
async function selectUsuario(idUsuario){
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM usuario WHERE idUsuario = ?;", idUsuario);
    if (!rows.length) return "Não há usuario com esse id"
    else return rows;
}

/* LIVROS */

//SELECT
async function selectLivros(){
    const conn = await connect();
    const [rows] = await conn.query("SELECT l.idLivro, l.Nome_Livro, a.Nome_Autor, l.Total_Paginas, l.Ano_Lancamento, g.Nome_Genero FROM livro l INNER JOIN genero g ON l.idGenero = g.idGenero INNER JOIN livro_autor la ON l.idLivro = la.idLivro INNER JOIN autor a ON la.idAutor = a.idAutor;");
    if (!rows.length) return "Não há livros registardos"
    else return rows;
}

/* USUARIO LIVRO */

//INSERT
//STATUS 1
async function insertLivroS1(lista){
    const conn = await connect();
    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Status_Lista) VALUES (?, ?, 1);";
    const values = [lista.idUsuario, lista.idLivro];
    await conn.query(sql, values);
}

//STATUS 2
async function insertLivroS2(lista){
    const conn = await connect();
    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Status_Lista) VALUES (?, ?, ?, 2);";
    const values = [lista.idUsuario, lista.idLivro, lista.Data_Inicio_Leitura];
    await conn.query(sql, values);
}

//STATUS 3
async function insertLivroS3(lista){
    const conn = await connect();
    const sql = "INSERT INTO usuario_livro (idUsuario, idLivro, Data_Inicio_Leitura, Data_Termino_Leitura, Tempo_Leitura, Avaliacao, Status_Lista)VALUES ( ?, ?, ?, ?, ?, ?, 3);";
    const values = [lista.idUsuario, lista.idLivro, lista.Data_Inicio_Leitura, lista.Data_Termino_Leitura, lista.Tempo_Leitura, lista.Avaliacao];
    await conn.query(sql, values);
}

//UPDATE
//STATUS 1 PARA 2
async function updateLivroS1S2(lista){
    const conn = await connect();

    const sql = "UPDATE usuario_livro SET Status_Lista = 2, Data_Inicio_Leitura = ? WHERE idUsuario = ? AND idLivro = ?;";

    const values = [lista.Data_Inicio_Leitura, lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//STATUS 2 PARA 3
async function updateLivroS2S3(lista){
    const conn = await connect();

    const sql = "UPDATE usuario_livro SET Status_Lista = 3, Data_Termino_Leitura = ?, Tempo_Leitura = ? AND Avaliacao = ? WHERE idUsuario = ? AND idLivro = ?;";

    const values = [lista.Data_Termino_Leitura, lista.Tempo_Leitura, lista.avaliacao, lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//DELETE
async function deleteLivroLista(lista){
    const conn = await connect();

    const sql = 'DELETE FROM usuario_livro where idUsuario = ? AND idLivro = ?;';

    const values = [lista.idUsuario, lista.idLivro];

    await conn.query(sql, values);
}

//SELECT
//VER A DATA DE INCIO REGISTRADA

async function selectDataInicio(idUsuario, idLivro){
    const conn = await connect();

    const [rows] = await conn.query("SELECT Data_Inicio_Leitura FROM usuario_livro WHERE idUsuario = ? AND idLivro = ?;", idUsuario, idLivro);

    return rows[0]; // ver se funciona
}

module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer}

module.exports = {selectUsuario, selectLivros, insertLivroS1, insertLivroS2, insertLivroS3, updateLivroS1S2, updateLivroS2S3, deleteLivroLista,selectDataInicio};

/*

usuario - select

livro - select
autor - join
genero - join
livro_autor - join

usuario_livro - insert, update, delete, select

select - lista 1, lista 2, lista 3
select para pegar a data de inicio

*/
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

//SELECT
async function selectLivros(){
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM livro;");
    return rows;
}

//INSERT
async function insertLivro(livro){
    const conn = await connect();
    const sql = "INSERT INTO livro (Nome_Livro, Total_Paginas, Ano_Lancamento, idGenero) VALUES (?, ?, ?, ?);"
    const values = [livro.nome, livro.paginas, livro.ano, livro.idGenero];
    await conn.query(sql, values);
}

async function insertAutor(autor){
    const conn = await connect();
    const sql = "INSERT INTO autor (Nome_Autor) VALUES (?);"
    const values = [autor.nome];
    await conn.query(sql, values);
}

async function insertLivroAutor(livro_autor){
    const conn = await connect();
    const sql = "INSERT INTO livro_autor (Livro_idLivro, Autor_idAutor) VALUES (?, ?);"
    const values = [livro_autor.idLivro, livro_autor.idAutor];
    await conn.query(sql, values);
}

//UPDATE
async function updateUsuarioLivro(usuario_livro){
    const conn = await connect();

    const sql = 'UPDATE usuario_livro SET Status_Lista=?, Data_Termino_Leitura=?, Tempo_Leitura=? WHERE Usuario_idUsuario=? AND Livro_idLivro=?';

    const values = [
                    usuario_livro.statusLista, 
                    usuario_livro.dataTerminoLeitura,
                    usuario_livro.tempoLeitura,
                    usuario_livro.idUsuario, 
                    usuario_livro.idLivro];

    return await conn.query(sql, values);
}


module.exports = {selectLivros , insertLivro, insertAutor, insertLivroAutor, updateUsuarioLivro};

/*

usuario - select

livro - select
autor - join
genero - join
livro_autor - join

usuario_livro - insert, update, select, delete

*/
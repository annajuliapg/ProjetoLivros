//index.js
(async () => {
    const db = require("./db");
    console.log('Começou!');

    /*
    console.log('INSERT INTO livro');
    await db.insertLivro({
        "nome": "Jogos Vorazes",
        "paginas": 256,
        "ano": 2008,
        "idGenero": 1
    })

    console.log('INSERT INTO autor');
    await db.insertAutor({
        "nome": "Suzanne Collins"
    })

    console.log('INSERT INTO livro_autor');
    await db.insertLivroAutor({
        "idLivro": 3,
        "idAutor": 3
    })
    */

    console.log('SELECT * FROM livro');
    const livros = await db.selectLivros();
    console.log(livros);

    /*
    console.log('UPDATE CLIENTES');
    const lista = await db.updateUsuarioLivro(
        {
            "statusLista": "L", 
            "dataTerminoLeitura": "2020-11-14", 
            "tempoLeitura": 32,
            "idUsuario": 1,
            "idLivro": 2
        });
    console.log(lista);
    */
})();

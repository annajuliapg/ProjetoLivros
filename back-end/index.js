//index.js
(async () => {
    
    const db = require("./db");
    console.log('Começou!');

    var hoje = new Date();

    var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();

    var dataInicio = "";
    var dataTermino = "";

    function datasLeitura (dataInicio, dataTermino){
        
        const a = new Date(dataInicio);
        const b = new Date(dataTermino);

        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

    }
    
    /* USUARIO */

    //SELECT
    const usuario = await db.selectUsuario(1);
    console.log(usuario);

    /* LIVROS */

    //SELECT
    
    const livros = await db.selectLivros();
    console.log(livros);
    
    /* USUARIO LIVRO */

    //INSERT
    //STATUS 1
    await db.insertLivroS1({
        "idUsuario": 1,
        "idLivro": 1
    })
    console.log("Livro inserido como status 1");

    //STATUS 2
    await db.insertLivroS2({
        "idUsuario": 1,
        "idLivro": 2,
        "Data_Inicio_Leitura": dataHoje
    })
    console.log("Livro inserido como status 2");

    //STATUS 3

    dataInicio = "2020-10-04";
    dataTermino = "2020-10-20";
    
    var tempoLeitura = datasLeitura(dataInicio, dataTermino);

    await db.insertLivroS3({
        "idUsuario": 1,
        "idLivro": 3,
        "Data_Inicio_Leitura": dataTermino,
        "Data_Termino_Leitura": dataTermino,
        "Tempo_Leitura": tempoLeitura,
        "Avaliacao": 10

    })
    console.log("Livro inserido como status 3");

})();

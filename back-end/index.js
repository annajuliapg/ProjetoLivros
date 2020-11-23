//index.js
(async () => {
    
    const db = require("./db");
    console.log('Começou!');

    var hoje = new Date();

    var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();

    function diasDeLeitura (a, b){
        
        a = new Date(a);
        b = new Date(b);

        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

    }
    
    // USUARIO //

    //SELECT   
    
    async function getUsuario(idUsuario) {
        const usuario = await db.selectUsuario(idUsuario);
        console.log(usuario); 
    }

    //getUsuario(5);

    // LIVROS //

    //SELECT
    async function getLivros() {
        const livros = await db.selectLivros();
        console.log(livros);    
    }

    //getLivros();
    
    // USUARIO LIVRO //

    //INSERT
    //STATUS 1
    async function insertLivroParaLer (idUsuario, idLivro) {
        
        await db.insertLivroS1({
            "idUsuario": idUsuario,
            "idLivro": idLivro
        })

        console.log("Livro inserido como status 1");    
    }

    //insertLivroParaLer(1,1);

    //STATUS 2
    async function insertLivroLendoAgora (idUsuario, idLivro) {
        
        await db.insertLivroS2({
            "idUsuario": idUsuario,
            "idLivro": idLivro,
            "Data_Inicio_Leitura": dataHoje
        })
        
        console.log("Livro inserido como status 2");
    }

    //insertLivroLendoAgora(1,2);

    //STATUS 3
    async function insertLivroLido (idUsuario, idLivro, dataInicio, dataTermino, avaliacao){
        
        const tempoLeitura = diasDeLeitura(dataInicio, dataTermino);
        
        await db.insertLivroS3({
            "idUsuario": idUsuario,
            "idLivro": idLivro,
            "Data_Inicio_Leitura": dataTermino,
            "Data_Termino_Leitura": dataTermino,
            "Tempo_Leitura": tempoLeitura,
            "Avaliacao": avaliacao

        })
        
        console.log("Livro inserido como status 3");    
    }

    //insertLivroLido (1, 3, "2020-10-04", "2020-10-20", 10);

    //UPDATE
    //PARA LER - LENDO
    async function updateParaLer_Lendo (idUsuario, idLivro){

        await db.updateLivroS1S2(
        {
            "idUsuario": idUsuario,
            "idLivro": idLivro,
            "Data_Inicio_Leitura": dataHoje
        });

        console.log("Livro atualizado de status 'Para Ler' para 'Lendo Agora'");
    }
    
    //updateParaLer_Lendo(1,1);
    
    //LENDO - LIDO
    async function updateLendo_Lido (idUsuario, idLivro, avaliacao){

        // VER DATA INICIO
        
        const tempoLeitura = diasDeLeitura(dataInicio, dataHoje);
        
        await db.updateLivroS1S2(
        {
            "idUsuario": idUsuario,
            "idLivro": idLivro,
            "Data_Termino_Leitura": dataHoje,
            "Tempo_Leitura": tempoLeitura,
            "Avaliacao": avaliacao
        });

        console.log("Livro atualizado de status 'Para Ler' para 'Lendo Agora'");
    }
    

})();

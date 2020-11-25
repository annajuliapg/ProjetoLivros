//index.js
(async () => {

    const db = require("./db");

    var hoje = new Date();

    var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();
    
    // USUARIO //

    //SELECT   
    
    async function getUsuario(idUsuario) {
        const usuario = await db.selectUsuario(idUsuario);
        console.log(usuario);
    }

    //getUsuario(3);

    // LIVROS //

    //SELECT
    async function getLivros() {
        const livros = await db.selectLivros();
        console.log(livros);    
    }

    getLivros();
    
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
        
        console.log(dataHoje);
        
        await db.updateLivroS2S3(
        {
            "idUsuario": idUsuario,
            "idLivro": idLivro,
            "Data_Termino_Leitura": dataHoje,
            "Avaliacao": avaliacao
        });

        console.log("Livro atualizado de status 'Lendo Agora' para 'Lido'");
    }
    
    //updateLendo_Lido(1, 2, 10);

    async function deleteLivroLista (idUsuario, idLivro){
        
        await db.deleteLivroLista(
        {
            "idUsuario": idUsuario,
            "idLivro": idLivro
        });

        console.log("Livro deletado da lista do usuário");
    }    

    //deleteLivroLista(1,1);

    //SELECT STATUS 1
    async function getListaStatus1(idUsuario) {
        const usuario = await db.selectStatus1(idUsuario);
        console.log(usuario);
    }

    //getListaStatus1(1);

    //SELECT STATUS 2
    async function getListaStatus2(idUsuario) {
        const usuario = await db.selectStatus2(idUsuario);
        console.log(usuario);
    }

    //getListaStatus2(1);

    //SELECT STATUS 3
    async function getListaStatus3(idUsuario) {
        const usuario = await db.selectStatus3(idUsuario);
        console.log(usuario);
    }

    //getListaStatus3(1);


})();

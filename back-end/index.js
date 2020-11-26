//index.js
var hoje = new Date();

var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();

//rota de READ - SELECT TODOS OS LIVROS
async function recuperaLivros (req, res)
{
    try {
        
        let livros = await db.selectLivros();

        return res.status(200).json(livros);
    }
    catch (erro) {
        console.log(erro);
    }
}

//rota de READ - SELECT USUARIO
async function recuperaUsuario (req, res)
{
    try {
        const idUsuario = req.params.usuario;

        if (!isNaN(idUsuario)){
        
            const usuario = await db.selectUsuario(idUsuario);

            return res.status(200).json(usuario);
        }
        else{
            return res.status(400).send("Código de usuário inválido")
        }
    }
    catch (erro) {
        console.log(erro);
    }
}

//rota de READ - SELECT AVALIACOES USUARIO
async function recuperaAvaliacoes (req, res)
{
    try {
        const idUsuario = req.params.usuario;

        if (!isNaN(idUsuario)){
        
            const usuario = await db.selectAvaliacoes(idUsuario);

            return res.status(200).json(usuario);
        }
        else{
            return res.status(400).send("Código de usuário inválido")
        }
    }
    catch (erro) {
        console.log(erro);
    }
}

//rota de READ - SELECT STATUS 1
async function recuperaListaStatus1(req, res) {

    try {    
        
        const idUsuario = req.params.usuario;

        if (!isNaN(idUsuario)){
            const lista1 = await db.selectStatus1(idUsuario);

            return res.status(200).json(lista1);    
        }
        else{
            return res.status(500).send("Código de usuário inválido")
        } 
    }
    catch (erro) {
        console.log(erro);
    }
}

//rota de READ - SELECT STATUS 2
async function recuperaListaStatus2(req, res) {
    
    try {    
        
        const idUsuario = req.params.usuario;

        if (!isNaN(idUsuario)){
            const lista2 = await db.selectStatus2(idUsuario);

            return res.status(200).json(lista2);    
        }
        else{
            return res.status(500).send("Código de usuário inválido")
        }    
    }
    catch (erro) {
        console.log(erro);
    }
}

//rota de READ - SELECT STATUS 3
async function recuperaListaStatus3(req, res) {
    
    try {    
        
        const idUsuario = req.params.usuario;

        if (!isNaN(idUsuario)){
            const lista3 = await db.selectStatus3(idUsuario);

            return res.status(200).json(lista3);    
        }
        else{
            return res.status(500).send("Código de usuário inválido")
        }    
    }
    catch (erro) {
        console.log(erro);
    }
}

function middleWareGlobal (req, res, next)
{
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: '+req.method+'; URL: '+req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}

async function ativacaoDoServidor ()
{
    const db = require("./db");
    global.db = db;

    const express = require('express');
    const app     = express();
    
    app.use(express.json());   // faz com que o express consiga processar JSON
    app.use(middleWareGlobal); // app.use cria o middleware global

    app.get    ('/livros', recuperaLivros);
    app.get    ('/perfil/:usuario', recuperaUsuario);
    app.get    ('/perfil/avaliacoes/:usuario', recuperaAvaliacoes);
    app.get    ('/para-ler/:usuario', recuperaListaStatus1);
    app.get    ('/lendo-agora/:usuario', recuperaListaStatus2);
    app.get    ('/lido/:usuario', recuperaListaStatus3);
/*
    app.post   ('/para-ler/:usuario', insereListaStatus1);
    app.post   ('/lendo-agora/:usuario', insereListaStatus2);
    app.post   ('/lido/:usuario', insereListaStatus3);

    app.patch  ('/para-ler/:usuario', atulizaListaParaLer_Lendo);
    app.patch  ('/lendo-agora/:usuario', atulizaLendo_Lido);

    app.delete ('remover/:livro/:usuario', removeLivroUsuario);
*/

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();
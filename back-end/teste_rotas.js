//index.js
var hoje = new Date();

var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();

//rota de READ - SELECT USUARIO
async function recuperaUsuario (req, res)
{
    const idUsuario = req.params.usuario;

    const usuario = await db.selectUsuario(idUsuario);

	return res.status(200).json(usuario);
}

//rota de READ - SELECT TODOS OS LIVROS
async function recuperaLivros (req, res)
{
    let livros = await db.selectLivros();

	return res.status(200).json(livros);
}

//rota de READ - SELECT STATUS 1
async function recuperaListaStatus1(req, res) {

    const idUsuario = req.params.usuario;
    
    const lista1 = await db.selectStatus1(idUsuario);

    return res.status(200).json(lista1);
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

    app.get   ('/:usuario', recuperaUsuario);
    app.get   ('/livros', recuperaLivros);
    app.get   ('/para-ler/:usuario', recuperaListaStatus1);

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();
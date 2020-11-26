function BD ()
{
	process.env.ORA_SDTZ = 'UTC-3'; // garante horário de Brasília
	
	this.getConexao = async function ()
	{
		if (global.conexao)
			return global.conexao;

        const oracledb = require('oracledb');
        const dbConfig = require('./dbconfig.js');
        
        try
        {
		    global.conexao = await oracledb.getConnection(dbConfig);
		}
		catch (erro)
		{
			console.log ('Não foi possível estabelecer conexão com o BD!');
			process.exit(1);
		}

		return global.conexao;
	}

	this.estrutureSe = async function ()
	{
		try
		{
			const conexao = await this.getConexao();
			const sql     = 'CREATE TABLE Livros (Codigo NUMBER(4) PRIMARY KEY, Nome NVARCHAR2(60) NOT NULL, Preco NUMBER(5,2) NOT NULL)';
			await conexao.execute(sql);
		}
		catch (erro)
		{} // se a já existe, ignora e toca em frente
	}
}

function Livros (bd)
{
	this.bd = bd;
	
	this.inclua = async function (livro)
	{
		const conexao = await this.bd.getConexao();
		
		const sql1 = 'INSERT INTO Livros (Codigo,Nome,Preco) VALUES (:0,:1,:2)';
		const dados = [livro.codigo,livro.nome,livro.preco];
		await conexao.execute(sql1,dados);
		
		const sql2 = 'COMMIT';
		await conexao.execute(sql2);	
	}	
	
	this.recupereTodos = async function ()
	{
		const conexao = await this.bd.getConexao();
		
		const sql = 'SELECT * FROM Livros';
		var ret =  await conexao.execute(sql);

		return ret.rows;
	}
		
	this.recupereUm = async function (codigo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql = 'SELECT * FROM Livros WHERE Codigo=:0';
		const dados = [codigo];
		var ret =  await conexao.execute(sql,dados);
		
		return ret.rows;
	}

	this.atualize = async function (livro)
	{
		const conexao = await this.bd.getConexao();
		
		const sql1 = 'UPDATE Livros SET Nome=:0,Preco=:1 WHERE Codigo=:2';
		const dados = [livro.nome,livro.preco,livro.codigo];
		await conexao.execute(sql1,dados);
		
		const sql2 = 'COMMIT';
		await conexao.execute(sql2);
	}
	
	this.remova = async function (codigo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql1 = 'DELETE FROM Livros WHERE Codigo=:0';
		const dados = [codigo];
		await conexao.execute(sql1,dados);
		
		const sql2 = 'COMMIT';
		await conexao.execute(sql2);
	}
}

function Livro (codigo,nome,preco)
{
	    this.codigo = codigo;
	    this.nome   = nome;
	    this.preco  = preco;
}

function Comunicado (codigo,mensagem,descricao)
{
	this.codigo    = codigo;
	this.mensagem  = mensagem;
	this.descricao = descricao;
}

function middleWareGlobal (req, res, next)
{
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: '+req.method+'; URL: '+req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}

// para a rota de CREATE
async function inclusao (req, res)
{
    if (!req.body.codigo || !req.body.nome || !req.body.preco)
    {
        const erro1 = new Comunicado ('DdI','Dados incompletos','Não foram informados todos os dados do livro');
        return res.status(422).json(erro1);
    }
    
    const livro = new Livro (req.body.codigo,req.body.nome,req.body.preco);

    try
    {
        await  global.livros.inclua(livro);
        const  sucesso = new Comunicado ('IBS','Inclusão bem sucedida','O livro foi incluído com sucesso');
        return res.status(201).json(sucesso);
	}
	catch (erro)
	{
		const  erro2 = new Comunicado ('LJE','Livro existente','Já há livro cadastrado com o código informado');
        return res.status(409).json(erro2);
    }
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (req.body.codigo || req.body.nome || req.body.preco)
    {
        const erro = new Comunicado ('JSP','JSON sem propósito','Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro);
    }
	
    let rec;
	try
	{
	    rec = await global.livros.recupereTodos();
	}    
    catch(erro)
    {}

	if (rec.length==0)
	{
		return res.status(200).json([]);
	}
	else
	{
		const ret=[];
		for (var i=0;i<rec.length;i++) ret.push (new Livro (rec[i][0],rec[i][1],rec[i][2]));
		return res.status(200).json(ret);
	}
} 

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (req.body.codigo || req.body.nome || req.body.preco)
    {
        const erro1 = new Comunicado ('JSP','JSON sem propósito','Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro1);
    }

    const codigo = req.params.codigo;
    
    let ret;
	try
	{
	    ret = await global.livros.recupereUm(codigo);
	}    
    catch(erro)
    {}

	if (ret.length==0)
	{
		const erro2 = new Comunicado ('LNE','Livro inexistente','Não há livro cadastrado com o código informado');
		return res.status(404).json(erro2);
	}
	else
	{
		ret = ret[0];
		ret = new Livro (ret[0],ret[1],ret[2]);
		return res.status(200).json(ret);
	}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (!req.body.codigo || !req.body.nome || !req.body.preco)
    {
        const erro1 = new Comunicado ('DdI','Dados incompletos','Não foram informados todos os dados do livro');
        return res.status(422).json(erro1);
    }
    
    const livro  = new Livro(req.body.codigo,req.body.nome,req.body.preco);
    const codigo = req.params.codigo;
    
    if (codigo!=livro.codigo)
    {
        const erro2 = new Comunicado ('TMC','Mudança de código','Tentativa de mudar o código do livro');
        return res.json(erro2);	
	}
    
    let ret;
	try
	{
	    ret = await global.livros.recupereUm(codigo);
	}    
    catch(erro)
    {}

	if (ret.length==0)
	{
		const erro3 = new Comunicado ('LNE','Livro inexistente','Não há livro cadastrado com o código informado');
		return res.status(404).json(erro3);
	}
	else
	{
    	try
		{
			await global.livros.atualize(livro);
		}    
		catch(erro)
		{}

		const sucesso = new Comunicado ('ABS','Alteração bem sucedida','O livro foi atualizado com sucesso');
		return res.status(200).json(sucesso);
	}
}

// para a rota de DELETE
async function remocao (req, res)
{
    if (req.body.codigo || req.body.nome || req.body.preco)
    {
        const erro1 = new Comunicado ('JSP','JSON sem propósito','Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro1);
    }
    
    const codigo = req.params.codigo;
    
    let ret;
	try
	{
	    ret = await global.livros.recupereUm(codigo);
	}    
    catch(erro)
    {}

	if (ret.length==0)
	{
		const erro2 = new Comunicado ('LNE','Livro inexistente','Não há livro cadastrado com o código informado');
		return res.status(404).json(erro2);
	}
	else
	{
		try
		{
			await global.livros.remova(codigo);
		}    
		catch(erro)
		{}

		const sucesso = new Comunicado ('RBS','Remoção bem sucedida','O livro foi removido com sucesso');
		return res.status(200).json(sucesso);
	}
}

async function ativacaoDoServidor ()
{
    const bd = new BD ();
	await bd.estrutureSe();
    global.livros = new Livros (bd);

    const express = require('express');
    const app     = express();
    
    app.use(express.json());   // faz com que o express consiga processar JSON
    app.use(middleWareGlobal); // app.use cria o middleware global

    app.post  ('/livros'        , inclusao); 
    app.get   ('/livros'        , recuperacaoDeTodos);
    app.get   ('/livros/:codigo', recuperacaoDeUm);
    app.put   ('/livros/:codigo', atualizacao);
    app.delete('/livros/:codigo', remocao);

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();

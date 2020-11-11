const express  = require('express');
const app      = express();

const livros = [
    {
        "codLivro": "1",
        "nomeLivro": "Harry Potter",
        "totalDePaginas": "300",
        "ano": "1997",
        "fkGenero-codGenero": "Magia"
    },
    {
        "codLivro": "2",
        "nomeLivro": "Jogos Vorazes",
        "totalDePaginas": "340",
        "ano": "2009",
        "fkGenero-codGenero": "Ficção"
    },
];

const usuario = [
    {
        "codUsuario": "1",
        "nomeDeUsuario": "anna",
        "nomeDeExibicao": "Anna Julia",
        "biografiaUsuario": "Amo livros",
        "senhaUsuario": "1234",
        "emailUsuario": "anna@gmail.com",
        "livrosUsuario":
        [
            {
                "codItem": "1",
                "fkLivro-codLivro": "1",
                "tempoDeLeitura": "30 dias",
                "dataInicioLeitura": "19/04/2020",
                "dataTerminoLeitura": "19/05/2020",
                "avaliacao": "",
                "status": "LIDO"
            },
            {
                "codItem": "2",
                "fkLivro-codLivro": "1",
                "tempoDeLeitura": "",
                "dataInicioLeitura": "19/10/2020",
                "dataTerminoLeitura": "",
                "avaliacao": "",
                "status": "LENDO"
            }
        ]
    }
];
const usuario_livros = [];

app.use(express.json()); // faz com que o express consiga processar JSON

function middleWareGlobal (req, res, next)
{
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: '+req.method+'; URL: '+req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}
app.use(middleWareGlobal);     // app.use cria o middleware global


function kdLivro (codigo) // busca a posição do livro no vetor de acordo com o codigo passado
{
    let inicio=0, fim=livros.length-1;
    
    while (inicio<=fim)
    {
        let meio = parseInt((inicio+fim)/2);
        
        if (codigo==livros[meio].codigo)
            return meio+1;
            
        if (codigo<livros[meio].codigo)
            fim = meio-1;
        else
            inicio = meio+1;
    }
    
    return -(inicio+1);
}

function kdUsuario (codigo) // busca a posição do livro no vetor de acordo com o codigo passado
{
    let inicio=0, fim=usuario.length-1;
    
    while (inicio<=fim)
    {
        let meio = parseInt((inicio+fim)/2);
        
        if (codigo==usuario[meio].codigo)
            return meio+1;
            
        if (codigo<usuarios[meio].codigo)
            fim = meio-1;
        else
            inicio = meio+1;
    }
    
    return -(inicio+1);
}

function kdLista (codigo) // busca a posição do livro no vetor de acordo com o codigo passado
{
    let inicio=0, fim=usuario_livros.length-1;
    
    while (inicio<=fim)
    {
        let meio = parseInt((inicio+fim)/2);
        
        if (codigo==usuario_livros[meio].codigo)
            return meio+1;
            
        if (codigo<usuario_livros[meio].codigo)
            fim = meio-1;
        else
            inicio = meio+1;
    }
    
    return -(inicio+1);
}

function confirmaExistenciaDoLivro (req, res, next)
{
    const codigo  = req.params.codigoLivro;
    const posicao = kdLivro(codigo);
        
    if (posicao<0)
    {
        erro = {codigo   :'LNE',
                mensagem :'Livro inexistente',
                descricao:'Não há livro cadastrado com o código informado'};

        return res.status(404).json(erro);
    }

    req.posicao = posicao-1;
    return next();
}

function confirmaExistenciaDoUsuario (req, res, next)
{
    const codigo  = req.params.codigoUsuario;
    const posicao = kdUsuario(codigo);
        
    if (posicao<0)
    {
        erro = {codigo   :'UNE',
                mensagem :'Usuario inexistente',
                descricao:'Não há usuario cadastrado com o código informado'};

        return res.status(404).json(erro);
    }

    req.posicao = posicao-1;
    return next();
}

function confirmaExistenciaDoUsuario (req, res, next)
{
    const codigo  = req.params.codigoUsuario;
    const posicao = kdLista(codigo);
        
    if (posicao<0)
    {
        erro = {codigo   :'LNE',
                mensagem :'Lista inexistente',
                descricao:'Não há lista com os códigos informados'};

        return res.status(404).json(erro);
    }

    req.posicao = posicao-1;
    return next();
}

function confirmaOKParaIncluir (req, res, next)
{
    if (!req.body.codigo || !req.body.nome || !req.body.paginas || !req.body.ano || !req.body.genero)
    {
        erro = {codigo   :'DdI',
                mensagem :'Dados incompletos',
                descricao:'Não foram informados todos os dados do livro'};

        return res.status(422).json(erro);
    }
    
    const codigo  = req.body.codigo;
    const posicao = kdLivro(codigo);

    if (posicao>0)
    {
        erro = {codigo   :'LJE',
                mensagem :'Livro existente',
                descricao:'Já há livro cadastrado com o código informado'};

        return res.status(409).json(erro);
    }
        
    req.posicao = -posicao-1;
        
    return next();
}


// rota de CREATE
function inclusao (req, res)
{
    const livro = {codigo   :req.body.codigo,
                   nome     :req.body.nome,
                   paginas  :req.body.paginas,
                   ano      :req.body.ano,
                   genero   :req.body.genero};
                   
    const posicao = req.posicao;         
                   
    livros.splice(posicao,0,livro);
    
    sucesso = {codigo:'IBS',
               mensagem:'Inclusão bem sucedida',
               descricao:'O livro foi incluído com sucesso'};
               
    return res.json(sucesso);
}
app.post('/livros', confirmaOKParaIncluir, inclusao);


// primeira rota de READ

//usuario
function recuperacaoDeTodosUsuarios (req, res)
{
    return res.json(usuario);
} 
app.get('/usuario', recuperacaoDeTodosUsuarios);

function recuperacaoDeUmUsuario (req, res)
{
    return res.json(usuario[req.posicao]);
}
app.get('/:usuario', confirmaExistenciaDoUsuario, recuperacaoDeUmUsuario);

function recuperacaoDeListaLivrosUsuario (req, res)
{
    return res.json(usuario_livros[req.posicao]);
}
app.get('/:usuario/livros', confirmaExistenciaDaLista, recuperacaoDeListaLivrosUsuario);



//------------------ ORIGINAL ------------------//
function recuperacaoDeTodos (req, res)
{
    return res.json(livros);
} 
app.get('/livros', recuperacaoDeTodos);

// segunda rota de READ
function recuperacaoDeUm (req, res)
{
    return res.json(livros[req.posicao]);
}
app.get('/livros/:codigo', confirmaExistenciaDoLivro, recuperacaoDeUm);


// rota de UPDATE
function atualizacao (req, res)
{
    const codigo = req.params.codigo;
    
    const livro = {codigo   :req.body.codigo,
                   nome     :req.body.nome,
                   paginas  :req.body.paginas,
                   ano      :req.body.ano,
                   genero   :req.body.genero};

    if (codigo!=livro.codigo)
    {
        erro = {codigo:'TMC',
                mensagem:'Mudança de código',
                descricao:'Tentativa de mudar o código do livro'};

        return res.json(erro);
		
	}

    const posicao = req.posicao;

    livros[posicao] = livro;

    sucesso = {codigo:'ABS',
               mensagem:'Alteração bem sucedida',
               descricao:'O livro foi atualizado com sucesso'};

    return res.json(sucesso);
}
app.put('/livros/:codigo', confirmaExistenciaDoLivro, atualizacao);

// rota de DELETE
function remocao (req, res)
{
    const posicao = req.posicao;

    livros.splice(posicao, 1); // remove a posicao indicada

    sucesso = {codigo:'EBS',
               mensagem:'Exclusão bem sucedida',
               descricao:'O livro foi excluído com sucesso'};

    return res.json(sucesso);
}
app.delete('/livros/:codigo', confirmaExistenciaDoLivro, remocao);

console.log ('Servidor ativo na porta 3000...');
app.listen(3000);
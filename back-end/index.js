const express  = require('express');
const app      = express();
const livros = []; // As informações ficarão armazenadas dentro deste vetor

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


function kd (codigo) // busca a posição do livro no vetor de acordo com o codigo passado
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

function confirmaExistenciaDoLivro (req, res, next)
{
    const codigo  = req.params.codigo;
    const posicao = kd(codigo);
        
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

function confirmaOKParaIncluir (req, res, next)
{
    if (!req.body.codigo || !req.body.nome || !req.body.autor || !req.body.paginas || !req.body.ano || !req.body.genero)
    {
        erro = {codigo   :'DdI',
                mensagem :'Dados incompletos',
                descricao:'Não foram informados todos os dados do livro'};

        return res.status(422).json(erro);
    }
    
    const codigo  = req.body.codigo;
    const posicao = kd(codigo);

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
                   autor    :req.body.autor,
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
                   autor    :req.body.autor,
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
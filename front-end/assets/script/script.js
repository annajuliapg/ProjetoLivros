function dataHoje () {
  var hoje = new Date();
  return hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();
}

function enterLogin(e) {
  if (e.keyCode == 13) {
    login();
    return false;
  }
}

//axios.defaults.headers.common['header1'] = {"Access-Control-Allow-Origin": "*"};

/* ------ GET ------ */

//LOGIN
function login () {
  
  let emailForm = document.getElementById('inputEmail').value;
  let senhaForm = document.getElementById('inputSenha').value;

  if (!emailForm || !senhaForm) return alert("Preencha todos os campos");

  let url = `http://localhost:3000/usuarios`

  axios.get(url)
  .then(res => {
    
    var usuarios = res.data;
  
    for (var i = 0; i < usuarios.length; i++) {
        
      if (emailForm == usuarios[i].Email_Usuario && senhaForm == usuarios[i].Senha_Usuario) {
            localStorage.setItem("idUsuario", usuarios[i].idUsuario);
            return window.location.href = "../portal/index.html";
        }

    }

    return alert("Email ou senha inválidos");

})
  .catch(error  =>  {
    alert(error)
  })

  event.preventDefault()

}
//SAIR
function sair () {

  localStorage.removeItem("idUsuario");

}
/* RESUMO / PERFIL */
function getResumo () {

  let usuario = localStorage.getItem("idUsuario");  
  let url = `http://localhost:3000/perfil/${usuario}`;

  axios.get(url)
  .then(res => {

    document.getElementById('livros-lidos').innerHTML = `${res.data[0].Livros_Lidos}`;
    document.getElementById('paginas-lidas').innerHTML = `${res.data[0].Paginas_Lidas}`;
    document.getElementById('tempo-leitura').innerHTML = `${res.data[0].Tempo_Total_Leitura}`;

    var mediaLeitura;
    
    if (`${res.data[0].Tempo_Total_Leitura}` == 0){
      mediaLeitura = 0;
    }
    else {
      mediaLeitura = Math.round(`${res.data[0].Paginas_Lidas}` / `${res.data[0].Tempo_Total_Leitura}`);
    }

    document.getElementById('media-leitura').innerHTML = mediaLeitura;

  })
    .catch(error  =>  {
      alert(error)
    })

    event.preventDefault();

}
/* PERFIL */
function getPerfil () {

  let usuario = localStorage.getItem("idUsuario");  
  let url = `http://localhost:3000/perfil/${usuario}`;

  axios.get(url)
  .then(res => {

    document.getElementById('nome-exibicao').innerHTML = `${res.data[0].Nome_Exibicao}`;
    document.getElementById('nome-usuario').innerHTML = `${res.data[0].Nome_Usuario}`;
    document.getElementById('biografia').innerHTML = `${res.data[0].Biografia_Usuario}`;

    document.getElementById('livros-lidos').innerHTML = `${res.data[0].Livros_Lidos}`;
    document.getElementById('paginas-lidas').innerHTML = `${res.data[0].Paginas_Lidas}`;
    document.getElementById('tempo-leitura').innerHTML = `${res.data[0].Tempo_Total_Leitura}`;

    var mediaLeitura;
    
    if (`${res.data[0].Tempo_Total_Leitura}` == 0){
      mediaLeitura = 0;
    }
    else {
      mediaLeitura = Math.round(`${res.data[0].Paginas_Lidas}` / `${res.data[0].Tempo_Total_Leitura}`);
    }

    document.getElementById('media-leitura').innerHTML = mediaLeitura;

  })
    .catch(error  =>  {
      alert(error)
    })

    event.preventDefault();

}

function getAvaliacoes() {
  let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/perfil/avaliacoes/${usuario}`;

  axios.get(url)
  .then(res => {

    let tabela = document.getElementById('conteudo-avaliacoes');

    if (res.data == -1){

      var linha = document.createElement('tr');

      var tagConteudo = document.createElement('td');
      tagConteudo.setAttribute("colspan", 4);

      var conteudo = document.createTextNode("Sem Avaliações. Termine de ler um livro para avaliá-lo.");

      tagConteudo.appendChild(conteudo);
      linha.appendChild(tagConteudo);
      tabela.appendChild(linha);

    }
    else {
      
      var lista = res.data;

      var countIndex  = 1;
        
      for (var item of lista){

        var novaLinha = document.createElement('tr');
        
        var tagH = document.createElement('th');
        tagH.setAttribute("scope","row");
        var tagHConteudo = document.createTextNode(countIndex);
        
        tagH.appendChild(tagHConteudo);

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        tagDImagem.appendChild(imagem);

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        tagDNomeLivro.appendChild(nomeLivro);

        var tagDAvaliacao = document.createElement('td');
        var avaliacao;
        if (`${item.Avaliacao}` == "null"){
          avaliacao = document.createTextNode("Sem Avaliação");
        }
        else {
          avaliacao = document.createTextNode(`${item.Avaliacao}`);
        }
        
        var br = document.createElement('br');
        var tagEditar = document.createElement('a');
        tagEditar.href = "javascript:void(0)";
        var editar = document.createTextNode("Editar");

        tagEditar.appendChild(editar);
        tagDAvaliacao.appendChild(avaliacao);
        tagDAvaliacao.appendChild(br);
        tagDAvaliacao.appendChild(tagEditar);

        novaLinha.appendChild(tagH);
        novaLinha.appendChild(tagDImagem);
        novaLinha.appendChild(tagDNomeLivro);
        novaLinha.appendChild(tagDAvaliacao);

        tabela.appendChild(novaLinha);

        countIndex++;
      }
    }
  

  })
    .catch(error  =>  {
      alert(error)
    })

  event.preventDefault();
}
/* LISTA 1 */
function getListaParaLer() {
  let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/para-ler/${usuario}`;

  axios.get(url)
  .then(res => {

    let tabela = document.getElementById('lista-para-ler-conteudo');

    if (res.data == -1){

      var linha = document.createElement('tr');

      var tagConteudo = document.createElement('td');
      tagConteudo.setAttribute("colspan", 5);

      var conteudo = document.createTextNode("Lista Vazia. Adicione livros.");

      tagConteudo.appendChild(conteudo);
      linha.appendChild(tagConteudo);
      tabela.appendChild(linha);

    }
    else {
      
      var lista = res.data;

      var countIndex  = 1;
        
      for (var item of lista){

        var novaLinha = document.createElement('tr');
        
        var tagH = document.createElement('th');
        tagH.setAttribute("scope","row");
        var tagHConteudo = document.createTextNode(countIndex);

        tagH.appendChild(tagHConteudo);

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        tagDImagem.appendChild(imagem);

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        tagDNomeLivro.appendChild(nomeLivro);

        var tagDPaginasLivro = document.createElement('td');
        var paginasLivro = document.createTextNode(`${item.Total_Paginas}`);

        tagDPaginasLivro.appendChild(paginasLivro);

        var tagDAtualizarStatus = document.createElement('td');
        var tagA = document.createElement('a');
        tagA.setAttribute("class", "nav-link");
        tagA.href = "javascript:void(0)";
        var atualizarStatus = document.createTextNode("Atualizar Status");

        tagA.appendChild(atualizarStatus);
        tagDAtualizarStatus.appendChild(tagA);

        novaLinha.appendChild(tagH);
        novaLinha.appendChild(tagDImagem);
        novaLinha.appendChild(tagDNomeLivro);
        novaLinha.appendChild(tagDPaginasLivro);
        novaLinha.appendChild(tagDAtualizarStatus);

        tabela.appendChild(novaLinha);        

        countIndex++;
      }
    }
  

  })
    .catch(error  =>  {
      alert(error)
    })

  event.preventDefault();
}
/* LISTA 2 */
function getListaLendoAgora() {
  let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/lendo-agora/${usuario}`;

  axios.get(url)
  .then(res => {

    let tabela = document.getElementById('lista-lendo-agora-conteudo');

    if (res.data == -1){

      var linha = document.createElement('tr');

      var tagConteudo = document.createElement('td');
      tagConteudo.setAttribute("colspan", 5);

      var conteudo = document.createTextNode("Lista Vazia. Adicione livros.");

      tagConteudo.appendChild(conteudo);
      linha.appendChild(tagConteudo);
      tabela.appendChild(linha);

    }
    else {
      
      var lista = res.data;

      var countIndex  = 1;
        
      for (var item of lista){

        var novaLinha = document.createElement('tr');
        
        var tagH = document.createElement('th');
        tagH.setAttribute("scope","row");
        var tagHConteudo = document.createTextNode(countIndex);

        tagH.appendChild(tagHConteudo);

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        tagDImagem.appendChild(imagem);

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        tagDNomeLivro.appendChild(nomeLivro);

        var tagDTempoLendo = document.createElement('td');
        var tempoLendo = document.createTextNode(`${item.Tempo_Lendo}`);

        tagDTempoLendo.appendChild(tempoLendo);
        tagDTempoLendo.appendChild(document.createTextNode(" dias"));

        var tagDAtualizarStatus = document.createElement('td');
        var tagA = document.createElement('a');
        tagA.setAttribute("class", "nav-link");
        tagA.href = "javascript:void(0)";
        var atualizarStatus = document.createTextNode("Atualizar Status");

        tagA.appendChild(atualizarStatus);
        tagDAtualizarStatus.appendChild(tagA);

        novaLinha.appendChild(tagH);
        novaLinha.appendChild(tagDImagem);
        novaLinha.appendChild(tagDNomeLivro);
        novaLinha.appendChild(tagDTempoLendo);
        novaLinha.appendChild(tagDAtualizarStatus);

        tabela.appendChild(novaLinha);        

        countIndex++;
      }
    }
  

  })
    .catch(error  =>  {
      alert(error)
    })

  event.preventDefault();
}
/* LISTA 3 */
function getListaLidos() {
  let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/lidos/${usuario}`;

  axios.get(url)
  .then(res => {

    let tabela = document.getElementById('lista-lidos-conteudo');

    if (res.data == -1){

      var linha = document.createElement('tr');

      var tagConteudo = document.createElement('td');
      tagConteudo.setAttribute("colspan", 6);

      var conteudo = document.createTextNode("Lista Vazia. Adicione livros.");

      tagConteudo.appendChild(conteudo);
      linha.appendChild(tagConteudo);
      tabela.appendChild(linha);

    }
    else {
      
      var lista = res.data;

      var countIndex  = 1;
        
      for (var item of lista){

        var novaLinha = document.createElement('tr');
        
        var tagH = document.createElement('th');
        tagH.setAttribute("scope","row");
        var tagHConteudo = document.createTextNode(countIndex);

        tagH.appendChild(tagHConteudo);

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        tagDImagem.appendChild(imagem);

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        tagDNomeLivro.appendChild(nomeLivro);

        var tagDTempoLeitura = document.createElement('td');
        var tempoLeitura = document.createTextNode(`${item.Tempo_Leitura}`);

        tagDTempoLeitura.appendChild(tempoLeitura);

        var tagDPaginas = document.createElement('td');
        var paginas = document.createTextNode(`${item.Total_Paginas}`);

        tagDPaginas.appendChild(paginas);

        console.log(item);

        var tagDAvaliacao = document.createElement('td');
        var avaliacao;
        if (`${item.Avaliacao}` == "null"){
          avaliacao = document.createTextNode("Sem Avaliação");
        }
        else {
          avaliacao = document.createTextNode(`${item.Avaliacao}`);
        }

        var br = document.createElement('br');
        var tagEditar = document.createElement('a');
        tagEditar.href = "javascript:void(0)";
        var editar = document.createTextNode("Editar");

        tagEditar.appendChild(editar);
        tagDAvaliacao.appendChild(avaliacao);
        tagDAvaliacao.appendChild(br);
        tagDAvaliacao.appendChild(tagEditar);       

        novaLinha.appendChild(tagH);
        novaLinha.appendChild(tagDImagem);
        novaLinha.appendChild(tagDNomeLivro);
        novaLinha.appendChild(tagDTempoLeitura);
        novaLinha.appendChild(tagDPaginas);
        novaLinha.appendChild(tagDAvaliacao);

        tabela.appendChild(novaLinha);

        countIndex++;
      }
    }
  

  })
    .catch(error  =>  {
      alert(error);
    })

  event.preventDefault();
}
/* LISTA LIVROS NOVOS */
function getLivrosNovos(tipoLista) {
  let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/novos-livros/${usuario}`;

  axios.get(url)
  .then(res => {

    let tabela = document.getElementById('lista-livros-novos-conteudo');

    if (res.data == -1){

      var linha = document.createElement('tr');

      var tagConteudo = document.createElement('td');
      tagConteudo.setAttribute("colspan", 8);

      var conteudo = document.createTextNode("Você adicionou todos os livros! Aguarde atualização de novos.");

      tagConteudo.appendChild(conteudo);
      linha.appendChild(tagConteudo);
      tabela.appendChild(linha);

    }
    else {
      
      var lista = res.data;

      var countIndex  = 1;
        
      for (var item of lista){

        var novaLinha = document.createElement('tr');
        
        var tagH = document.createElement('th');
        tagH.setAttribute("scope","row");
        var tagHConteudo = document.createTextNode(countIndex);

        tagH.appendChild(tagHConteudo);

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        tagDImagem.appendChild(imagem);

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        tagDNomeLivro.appendChild(nomeLivro);

        var tagDNomeAutor = document.createElement('td');
        var nomeAutor = document.createTextNode(`${item.Nome_Autor}`);

        tagDNomeAutor.appendChild(nomeAutor);

        var tagDPaginas = document.createElement('td');
        var paginas = document.createTextNode(`${item.Total_Paginas}`);

        tagDPaginas.appendChild(paginas);

        var tagDAno = document.createElement('td');
        var ano = document.createTextNode(`${item.Ano_Lancamento}`);

        tagDAno.appendChild(ano);

        var tagDGenero = document.createElement('td');
        var genero = document.createTextNode(`${item.Nome_Genero}`);

        tagDGenero.appendChild(genero);

        var tagDAdicionarLivro = document.createElement('td');
		
		// <button class="btn btn-secondary" data-id="1" data-toggle="modal" data-target="#modalLista3">Adicionar Livro</button>
		
		var tagButton = document.createElement('button');
        tagButton.setAttribute("type", "button");
		tagButton.setAttribute("class", "btn btn-lg btn-dark");

		var idLivro = `${item.idLivro}`
		tagButton.setAttribute("data-id", idLivro);
		tagButton.setAttribute("data-toggle", "modal");
		var tipoModal = "modalLista" + tipoLista;
		tagButton.setAttribute("data-target", tipoModal);

        var adicionarLivro = document.createTextNode("Adicionar Livro");

        tagButton.appendChild(adicionarLivro);
        tagDAdicionarLivro.appendChild(tagButton);

        novaLinha.appendChild(tagH);
        novaLinha.appendChild(tagDImagem);
        novaLinha.appendChild(tagDNomeLivro);
        novaLinha.appendChild(tagDNomeAutor);
        novaLinha.appendChild(tagDPaginas);
        novaLinha.appendChild(tagDAno);
        novaLinha.appendChild(tagDGenero);
        novaLinha.appendChild(tagDAdicionarLivro);

        tabela.appendChild(novaLinha);        

        countIndex++;
      }
    }
  

  })
    .catch(error  =>  {
      alert(error)
    })

  event.preventDefault();
}

/* ------ POST ------ */

/* MODAL */

$('#modalLista1').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	
	var idLivro = button.data('id');

	var modal = $(this);
	
	modal.find('.modal-title').text("Adicionar Livro '"+idLivro+"'");
	modal.find('.modal-body #nomeLivro').val(idLivro);
});

$('#modalLista2').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	
	var idLivro = button.data('id');

	var modal = $(this);
	
	modal.find('.modal-title').text("Adicionar Livro '"+idLivro+"'");
	modal.find('.modal-body #nomeLivro').val(idLivro);

	var hoje = new Date().toISOString().split('T')[0];
	$('#dataIniL2').prop('max', hoje);

});

$('#modalLista3').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget);
	
	var idLivro = button.data('id');

	var modal = $(this);
	
	modal.find('.modal-title').text("Adicionar Livro '"+idLivro+"'");
	modal.find('.modal-body #nomeLivro').val(idLivro);

	var hoje = new Date().toISOString().split('T')[0];
	$('#dataIniL3').prop('max', hoje);
	$('#dataFimL3').prop('max', hoje);

});

//POST

function postLista1(idLivro) {
	alert("1 e idLivro " + idLivro);

  // axios.defaults.headers.common['header1'] = ["Access-Control-Allow-Origin", "*"];

	let usuario = localStorage.getItem("idUsuario");
  let url = `http://localhost:3000/para-ler/${usuario}`;

	let json = {"idUsuario": usuario, "idLivro": idLivro};

  axios.post(url , json)
  .then(res => {
    
     console.log(res.data);    

})
  .catch(error  =>  {
    alert(error)
  })

  event.preventDefault()

}

function postLista2(idLivro) {
	alert("2 e idLivro " + idLivro);
}

function postLista3(idLivro) {
	alert("3 e idLivro " + idLivro);
}


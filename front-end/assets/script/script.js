function dataHoje () {
  var hoje = new Date();
  return hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();
}

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

function sair () {

  localStorage.removeItem("idUsuario");

}

function getResumo () {

  let usuario = localStorage.getItem("idUsuario");  
  let url = `http://localhost:3000/perfil/${usuario}`;

  axios.get(url)
  .then(res => {

    document.getElementById('livros-lidos').innerHTML = `${res.data[0].Livros_Lidos}`
    document.getElementById('paginas-lidas').innerHTML = `${res.data[0].Paginas_Lidas}`
    document.getElementById('tempo-leitura').innerHTML = `${res.data[0].Tempo_Total_Leitura}`

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

function getPerfil () {

  let usuario = localStorage.getItem("idUsuario");  
  let url = `http://localhost:3000/perfil/${usuario}`;

  axios.get(url)
  .then(res => {

    document.getElementById('nome-exibicao').innerHTML = `${res.data[0].Nome_Exibicao}`
    document.getElementById('nome-usuario').innerHTML = `${res.data[0].Nome_Usuario}`
    document.getElementById('biografia').innerHTML = `${res.data[0].Biografia_Usuario}`

    document.getElementById('livros-lidos').innerHTML = `${res.data[0].Livros_Lidos}`
    document.getElementById('paginas-lidas').innerHTML = `${res.data[0].Paginas_Lidas}`
    document.getElementById('tempo-leitura').innerHTML = `${res.data[0].Tempo_Total_Leitura}`

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

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        var tagDAvaliacao = document.createElement('td');

        var avaliacao

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

        tagDNomeLivro.appendChild(nomeLivro);

        tagDImagem.appendChild(imagem);

        tagH.appendChild(tagHConteudo);

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

        var tagDImagem = document.createElement('td');
        var imagem = document.createElement('img');
        imagem.setAttribute("src", "../assets/images/capa-livro.png");
        imagem.setAttribute("alt", "logo");
        imagem.setAttribute("height", "25%");

        var tagDNomeLivro = document.createElement('td');
        var nomeLivro = document.createTextNode(`${item.Nome_Livro}`);

        var tagDPaginasLivro = document.createElement('td');
        var paginasLivro = document.createTextNode(`${item.Total_Paginas}`);

        //<td><a class="nav-link" href="javascript:void(0);">Atualizar Status</a></td>

        var tagDAtualizarStatus = document.createElement('td');
        var tagA = document.createElement('a');
        tagA.setAttribute("class", "nav-link");
        tagA.href = "javascript:void(0)";
        var atualizarStatus = document.createTextNode("Atualizar Status");

        tagA.appendChild(atualizarStatus);
        tagDAtualizarStatus.appendChild(tagA);

        tagDPaginasLivro.appendChild(paginasLivro);

        tagDNomeLivro.appendChild(nomeLivro);

        tagDImagem.appendChild(imagem);

        tagH.appendChild(tagHConteudo);

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
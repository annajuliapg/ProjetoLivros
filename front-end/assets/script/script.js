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

    var mediaLeitura = Math.round(`${res.data[0].Paginas_Lidas}` / `${res.data[0].Tempo_Total_Leitura}`);

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

    var mediaLeitura = Math.round(`${res.data[0].Paginas_Lidas}` / `${res.data[0].Tempo_Total_Leitura}`);

    document.getElementById('media-leitura').innerHTML = mediaLeitura;

  })
    .catch(error  =>  {
      alert(error)
    })

    event.preventDefault();

}
function dataHoje () {
  var hoje = new Date();
  return hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();

}

function login () {
  
  let emailForm = document.getElementById('inputEmail').value;
  let senhaForm = document.getElementById('inputSenha').value;

  if (!emailForm || !senhaForm) return alert("Preencha todos os campos");

  let url = "localhost:3000/usuarios"

  axios.get(url)
  .then(response => {

    var usuarios = response.data;
  
    for (i = 0; i < usuarios.length; i++) {
        if (emailForm == usuarios[i].Email_Usuario && senhaForm == usuarios[i].Senha_Usuario) {
            localStorage.setItem("idUsuario", usuarios[i].idUsuario);
            return window.location.href = "../portal/index.html";
        }
        else {
          return alert("Email ou senha inválidos");
        }
    }

})
  .catch(error  =>  {
    alert(error)
  })

  event.preventDefault()

}

function sair () {

  localStorage.removeItem("idUsuario");

}
function enterPesquisa(e) {
  if (e.keyCode == 13) {
    var pesquisa = document.getElementById("pesquisa-header");

    if (pesquisa.value == "") {
      document.getElementById("result-pesquisa").innerHTML = "Pesquisa Vazia";
    } else {
      document.getElementById("result-pesquisa").innerHTML =
        "Você pesquisou por: " + pesquisa.value;
    }
    return false;
  }
}

var hoje = new Date();

var dataHoje = hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+hoje.getDate();
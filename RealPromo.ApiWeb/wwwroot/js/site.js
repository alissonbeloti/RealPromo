//<reference path="../lib/signalr/dist/browser/signalr.js" />
var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();

start();

connection.onclosed(async () => { await start(); });

connection.on("cadastradoSucesso", function () {
    var mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = "Cadstro de promoção realizado com sucesso!"
});

connection.on("receberPromocao", function (promocao) {

    var containerLogin = document.getElementById("container-login");
    var containerPromo = document.createElement("div");
    containerPromo.setAttribute("class", "container-promo")
    var containerChamada = document.createElement("div");
    containerChamada.setAttribute("class", "container-chamada");
    var h1Titulo = document.createElement("h1");
    h1Titulo.innerText = promocao.nomeEmpresa;
    var p1 = document.createElement("p");
    p1.innerText = promocao.chamada.toString();
    var p2 = document.createElement("p");
    p2.innerText = promocao.regras;
    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");
    var link = document.createElement("a");
    link.setAttribute("href", promocao.url);
    link.innerText = 'Pegar';
    console.info(promocao);

    containerChamada.appendChild(h1Titulo);
    containerChamada.appendChild(p1);
    containerChamada.appendChild(p2);

    containerBotao.appendChild(link);

    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);

    containerLogin.appendChild(containerPromo);
    /*
    <div class="container-promo">
        <div class="container-chamada">
            <h1>Carrefour</h1>
            <p>TV LG 40" - R$ 999,99</p>
            <p>Somente 20 unidades</p>
        </div>
        <div class="container-botao">
            Pegar
        </div>
    </div>
    */
});

var btnCadastrar = document.getElementById('BtnCadastrar');

if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function () {
        var empresa = document.getElementById('Empresa').value;
        var chamada = document.getElementById('Chamada').value;
        var regras = document.getElementById('Regras').value;
        var enderecoUrl = document.getElementById('EnderecoUrl').value;

        var promocao = {
            NomeEmpresa: empresa,
            Chamada: chamada,
            Regras: regras,
            Url: enderecoUrl
        };

        //Chamar cadastro de promoção
        connection.invoke("CadastrarPromocao", promocao).then(function () {
            console.info("Cadastrado com sucesso!")
        }).catch(function (err) {
            console.error(err.toString());
        });;
    });
}

function start() {
    connection.start()
        .then(function () {
            console.info("Conectado!");
        })
        .catch(function (err) {
            console.error(err.toString());
            setTimeout(() => start(), 5000);
        });
}
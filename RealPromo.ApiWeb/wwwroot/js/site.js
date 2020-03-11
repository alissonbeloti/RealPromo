//<reference path="../lib/signalr/dist/browser/signalr.js" />
var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();

connection.start()
    .then(function () {
        console.info("Conectado!");
    })
    .catch(function (err) {
        console.error(err.toString());
    });

connection.on("cadastradoSucesso", function () {
    var mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = "Cadstro de promoção realizado com sucesso!"
});

connection.on("receberPromocao", function (promocao) {
    console.info(promocao);
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

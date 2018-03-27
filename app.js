var express = require('express');
let path = require('path');
var bodyParser = require('body-parser');
var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname)));

const sendResposta = function (res, statusCode, mensagem) {
    res.status(statusCode).json({'mensagem': mensagem});
}

app.route('/').get(function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.route('/api/auth').post(function (req, res) {
    console.log(req.body.email)
    if(req.body.email && req.body.senha) {
        var erro = false;
        const email = req.body.email;
        const senha = req.body.senha;
        console.log(email)
        //validacao email

        const splitEmail = email.split('@');

        const regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!regEmail.test(email)) {
            erro = true;
            sendResposta(res, 401, 'Email em formato inválido!');
        }

        if(splitEmail[0].length > 64) {
            erro = true;
            sendResposta(res, 401, 'Parte local do Email muito extenso!');
        }
        if(splitEmail[1].length > 128) {
            erro = true;
            sendResposta(res, 401, 'Dominio do Email muito extenso!');
        }
        //fim validacao email

        //validacao senha
        console.log(senha.length)
        if( senha.length < 10 || senha.length > 128 ) {
            erro = true;
            sendResposta(res, 401, 'Tamanho da senha invalido!');
        }
        const regSenhaNumero = new RegExp("(.*[0-9]+.*[0-9]+.*)");
        const regSenhaMinusculas = new RegExp("^.*([a-z]+.*[a-z]+.*)$");
        const regSenhaMaiusculas = new RegExp("^.*([A-Z]+.*[A-Z]+.*)$");
        const regSenhaSimbolos = new RegExp("^.*([(!#$%&'*+-/=?^_`@{|}~)]+.*[(!#$%&'*+-/=?^_`@{|}~)]+.*)$");
        console.log(senha);
        console.log(regSenhaMaiusculas.test(senha));
        console.log(regSenhaMinusculas.test(senha));
        console.log(regSenhaNumero.test(senha));
        console.log(regSenhaSimbolos.test(senha));
        // ssSS$$22

        if(!regSenhaMaiusculas.test(senha) || !regSenhaMinusculas.test(senha) || !regSenhaNumero.test(senha) || !regSenhaSimbolos.test(senha)) {
            erro = true;
            sendResposta(res, 401, 'Senha no formato inválido!');
        }
        //fim validacao senha

        if (!erro) {
            sendResposta(res, 200, 'Credenciais válidas');
        }
    } else {
        res.status(401).json({
            mensagem: 'Credenciais inválidas!'
        })
    }
});

app.listen(
    process.env.PORT || port,
    () => {
        console.log(`Servidor rodando  na porta ${port}`)
}
);
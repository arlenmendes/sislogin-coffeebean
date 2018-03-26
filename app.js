var express = require('express');
let path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(cors());
const sendResposta = function (res, statusCode, mensagem) {
    res.status(statusCode).json({'mensgem': mensagem});
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

        const regSenha= new RegExp("^(?!^([a-z]+|[A-Z]+|\\d+|[\\W_]+)$).{10,128}$");

        if(!regSenha.test(senha)) {
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
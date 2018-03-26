var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.route('/api/auth').post(function (req, res) {
    console.log(req.body.email)
    if(req.body.email && req.body.senha) {

        const email = req.body.email;
        const senha = req.body.senha;
        console.log(email)
        //validacao email

        const splitEmail = email.split('@');

        const regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!regEmail.test(email)) {
            res.status(401).json({
                mensgem: 'Email em formato inválido!'
            })
        }

        if(splitEmail[0].length > 64) {
            res.status(401).json({
                mensgem: 'Parte local do Email muito extenso!'
            })
        }
        if(splitEmail[1].length > 128) {
            res.status(401).json({
                mensgem: 'Dominio do Email muito extenso!'
            })
        }
        //fim validacao email

        //validacao senha

        const regSenha= new RegExp("^(?!^([a-z]+|[A-Z]+|\\d+|[\\W_]+)$).{10,128}$");

        if(!regSenha.test(senha)) {
            res.status(401).json({
                mensgem: 'Senha no formato inválido!'
            })
        }

        //fim validacao senha


        res.status(200).json({
            mensgem: 'Credenciais Válidas!'
        });
    } else {
        res.status(401).json({
            mensagem: 'Credenciais inválidas!'
        })
    }
});

// app.listen(3000);
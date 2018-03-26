const api = 'http://localhost:3000/api';

function logar() {
    $('#formulario').submit(function (event) {

        event.preventDefault();

        const email = $('#email').val();
        const senha = $('#senha').val();
        $.post(
            api + '/auth',
            {
                email: email,
                senha: senha
            }, function (res) {

            },
            "application/json"
        ).done(function (res) {
            alert(res.responseJSON.mensagem);
        }).fail(function (res) {
            alert(res.responseJSON.mensagem);
        })
    })
}
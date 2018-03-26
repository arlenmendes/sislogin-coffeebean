const api = 'https://coffeebean-api.herokuapp.com/api';

function logar() {
    $('#formulario').submit(function (event) {

        event.preventDefault();

        const email = $('#email').val();
        const senha = $('#senha').val();
        // $.post(
        //     api + '/auth',
        //     {
        //         email: email,
        //         senha: senha
        //     }, function (res) {
        //
        //     },
        //     "application/json"
        // ).done(function (res) {
        //     dados = JSON.parse(res);
        //     alert(dados);
        // }).fail(function (res) {
        //     alert(dados);
        // })
        $.ajax({
            method: 'POST',
            url: api + '/auth',
            data: {
                email: $('#email').val(),
                senha: $('#senha').val()
            },
            dataType: 'application/json',
            success: function (res) {
                alert(JSON.parse(res.responseText).mensagem)
            },
            error: function (res) {
                alert(JSON.parse(res.responseText).mensagem)
            },
            crossDomain : true
        })

    })
}
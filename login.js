const api = 'https://coffeebean-api.herokuapp.com/api';


$('#formulario').submit(function (event) {

    event.preventDefault();
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
        }
    })

})
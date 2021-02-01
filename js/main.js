// namespace global
var CobrasEscadas = CobrasEscadas || {};

CobrasEscadas.jogador = {
    QtdJogadores: [{
        nome: 'Jogador 1',
        posicao: 0,
        cor: '#f55bf5'
    }, {
        nome: 'Jogador 2',
        posicao: 0,
        cor: '#31B404'
    }],

    LegendaJogadores: $('#jogadores').ready(function () {
        //alert('teste');
        for (var i = 0; i < CobrasEscadas.jogador.QtdJogadores.length; i++) {
            var player = CobrasEscadas.jogador.QtdJogadores[i];
            var playerHtml = "<span id='player" + i + "' class='jogador' style='background-color:" + player.cor + "'></span>";
            var playerLegendHtml = "<div id='playerLegend" + i + "' class='legenda' style='background-color:" + player.cor + "'>" + player.nome + "<br><span>0</span></div>";
            $("#jogadores").append(playerHtml + playerLegendHtml);
        }
    }),
}

var idOfplayerTurn = 0;

CobrasEscadas.jogar = {

    tabuleiro: $('#tabuleiro').ready(function () {
        for (var i = 0; i < 10; i++) {
            var decrow = $('<div class="row"></div>');
            for (var j = 0; j < 10; j++) {
                var disVal = 0;
                if (i % 2 == 0) {
                    disVal = (10 * i + j + 1);
                } else {
                    disVal = (10 * i + 10 - j);
                }
                disVal = 100 - disVal + 1;
                decrow.append('<div id="cell_' + disVal + '"></div>'); //' + disVal + '
            }
            $('#tabuleiro').append(decrow[0].outerHTML);
        }
    }),

    jogarDados: $('#jogar').click(function () {
        var dado1 = Math.floor(Math.random() * 6) + 1;
        var dado2 = Math.floor(Math.random() * 6) + 1;
        var cobras = {
            16: 6,
            46: 25,
            49: 11,
            62: 19,
            64: 60,
            74: 53,
            89: 68,
            92: 88,
            95: 75,
            99: 80
        };
        var escadas = {
            2: 38,
            7: 14,
            8: 31,
            15: 26,
            21: 42,
            28: 84,
            36: 44,
            51: 67,
            71: 91,
            78: 98,
            87: 94
        };

        var somaDados = dado1 + dado2;
        idOfplayerTurn = idOfplayerTurn % CobrasEscadas.jogador.QtdJogadores.length;
        $(".legenda").removeClass('border-legenda');
        $("#playerLegend" + ((idOfplayerTurn + 1) % CobrasEscadas.jogador.QtdJogadores.length)).addClass('border-legenda');

        var currentPosition = CobrasEscadas.jogador.QtdJogadores[idOfplayerTurn].posicao;
        currentPosition += somaDados;

        if (currentPosition >= 100) {
            currentPosition = 100;
            $("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
            $("#playerLegend" + idOfplayerTurn).find('span').text('Ganhou!'); //currentPosition
            $("#jogar").attr('disabled', 'disabled');
        } else {
            $.each(cobras, function (key, value) {
                if (currentPosition == key) {
                    currentPosition = value;
                    return false;
                }
            });
            $.each(escadas, function (key, value) {
                if (currentPosition == key) {
                    currentPosition = value;
                    return false;
                }
            });
            //debugger;
            //$("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
            var $cell = $("#cell_" + currentPosition);
            $("#player" + idOfplayerTurn).css({
                'left': $cell.position().left + 100,
                'top': $cell.position().top + 35
            });
            $("#playerLegend" + idOfplayerTurn).find('span').text(currentPosition); //currentPosition  

            /*var re = /(\d)/;
            var imgSrc = $('#dice').attr("src");
            var imgSrc = imgSrc.replace(re, randm);
            $('#dice').attr("src", imgSrc);*/
        }

        console.log('dado 1: ' + dado1 + ' e dado 2: ' + dado2);
        console.log(currentPosition);
        CobrasEscadas.jogador.QtdJogadores[idOfplayerTurn].posicao = currentPosition;
        idOfplayerTurn++;
    }),

}
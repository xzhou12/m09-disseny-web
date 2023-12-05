
$(document).ready(function(){
    let grid = $('.grid > div');
    var numero = 1;
    var nextNum = 26;
    var numeros = generarNumerosAleatorios(1, 25);
    var contador = 0;
    var intervalId;

    for (let i = 0; i < grid.length; i++) {
        grid[i].append(numeros[i]);

        $(grid[i]).on("click", function () {
            play(grid[i]);
        });
    }

    function generarNumerosAleatorios(min, max) {
        var numeros = [];
        for (var i = min; i <= max; i++) {
            numeros.push(i);
        }
        // Mezcla los números de forma aleatoria
        return numeros.sort(function() { return Math.random() - 0.5 });
    }

    function play(valor) {
        let num = parseInt(valor.innerText, 10);

        if (num === numero) {
            numero++;

            if (nextNum <= 50) {
                valor.innerText = nextNum;
                nextNum++;
                $(valor).addClass('second-half');
            } else {
                valor.innerText = '';
                $(valor).addClass('hide');
            }

            if (num === 50) {
                detenerContador();
                alert('Has ganado!');
            } else {
                iniciarContador();
            }
        }
    }

    function iniciarContador() {
        if (!intervalId) {
            intervalId = setInterval(function() {
                contador += 100;
                actualizarContador();
            }, 100);
        }
    }

    function detenerContador() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function actualizarContador() {
        var segundos = Math.floor(contador / 1000);
        var milisegundos = Math.floor((contador % 1000) / 100); // Convertir milisegundos a centésimas
        $('#contador').text(segundos + '.' + milisegundos + ' sec.');
    }

});
$(document).ready(function () {
    // Verifica se o Turn.js foi carregado
    if ($.isFunction($.fn.turn)) {
        $('#flipbook').turn({
            width: 800, // Largura do flipbook
            height: 500, // Altura do flipbook
            autoCenter: true, // Centraliza automaticamente
        });
    } else {
        console.error('Turn.js não foi carregado corretamente.');
    }
});

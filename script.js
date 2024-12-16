$(document).ready(function () {
    if ($.isFunction($.fn.turn)) {
        $('#flipbook').turn({
            width: 800,
            height: 500,
            autoCenter: true,
        });
    } else {
        console.error('Turn.js não foi carregado corretamente.');
    }
});

/**
 * function of loading
 */
function init() {

    if(!localStorage.getItem('saveLocal')) {
        $('#board').addClass('hidden');
        $('.begin-game').removeClass('hidden')
    } else {
        create();
    }
    $(window).on('keydown', keyboardEvent);

    $('#new').on('click', newGame);
}
/**
 *
 * @param i (number) - number of block
 */
function getXY(i) {
   return 'x'+( ((i-1) % 4)+1 )+'y'+Math.ceil( (i)/4);
}
/**
 * function of creating blocks
 */
function create() {
    var positionClass;

    for(var i=1; i<=15; i++) {
        if(localStorage.getItem('saveLocal')) {
            positionClass = localStorage.getItem(i);
        } else {
            positionClass = getXY(i);
        }
        $('#board').append('<div class="block block-'+i+' '+positionClass+'" data-num = '+i+'>'+i+'</div>');
    }
}

/**
 *
 * @param e - event of keydown
 */
function keyboardEvent(e) {

    switch(e.keyCode) {
        case 38: key('up');    break;
        case 40: key('down');  break;
        case 37: key('left');  break;
        case 39: key('right'); break;
    }

     checkWin();
}

/**
 *
 * @param type (string) - type of key
 */
function key( type ) {

    for(var a = 1; a <= 4; a++) {
        for(var b = 1; b <= 3; b++) {
            switch( type ) {
                case 'up':
                    var from = 'x'+a+'y'+(b+1);
                    var to   = 'x'+a+'y'+b;
                    break;
                case 'down':
                    var from = 'x'+a+'y'+(4-b);
                    var to   = 'x'+a+'y'+(5-b);
                    break;
                case 'left':
                    var from = 'x'+(b+1)+'y'+a;
                    var to   = 'x'+b+'y'+a;
                    break;
                case 'right':
                    var from = 'x'+(4-b)+'y'+a;
                    var to   = 'x'+(5-b)+'y'+a;
                    break;
            }
            if( !$('.'+to).length ) {
                $('.'+from).removeClass(from).addClass(to);
                var blockItem = $('.' + to).data('num');
                localStorage.setItem(blockItem, to);
                return;
            }
        }
    }
}

/**
 *
 * @param min (number) - min number
 * @param max (number) - max number
 * function get random numbers
 */
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * function get random numbers of blocks
 */
function newGame() {
    $('#board').removeClass('hidden');
    $('.begin-game').addClass('hidden');
    create();

        for(var a=1; a <= 1000; a++) {
            switch( getRandomInt(1 , 4) ) {
                case 1: key('up');    break;
                case 2: key('down');  break;
                case 3: key('left');  break;
                case 4: key('right'); break;
            }
        }
        setStartData();

}
/**
 * function set blocks information to LocalStorage
 */
function setStartData() {
    var blocks = $('.block');

    for(var i = 0; i < blocks.length; i++) {
        localStorage.setItem(i + 1, $(blocks[i]).attr('class').split(' ')[2]);
    }
    localStorage.setItem('saveLocal', true);
}

/**
 * function check if gamer wins
 */
function checkWin() {

    var good = 0;
    for(var i=1; i <= 15; i++) {
        if( $('.block-'+i).hasClass( getXY(i) ) ) good++;
    }
    if(good == 15) alert('Поздравляем! Вы победили!');
}

init();
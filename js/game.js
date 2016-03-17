jQuery(document).ready(function($) {

    //Variables
    var cardWidth = $('.card-wrapp').outerWidth();
    $(window).resize(function() {
        cardWidth = $('.card-wrapp').outerWidth();
    });

    var left = cardWidth;
    var top = 0;
    var user, dealer, flash, winner;

    function loadGame() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                winner = parseInt(xhttp.responseText);
            }
        };
        xhttp.open("POST", "game-settings.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("");
    }

    loadGame();

    //Check for mobile devices
    function isTouchEnabled() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    //Identify mobile devices and small resolution screens
    function isMobile() {
        if ($(window).width() < 1000) {
            $('body').addClass('mobile').removeClass('desktop');
            return true;
        } else {
            $('body').addClass('desktop').removeClass('mobile');
            return 0;
        }
    }

    isMobile();
    $(window).resize(isMobile);


    function constructor() {
        var top = 0;
        var left = 0;

        $('.card-wrapp').each(function(index) {
            var self = this;
            $(self).css({
                'display': 'block',
                '-webkit-transform': 'translate(' + left + 'px,' + top + 'px)',
                'transform': 'translate(' + left + 'px,' + top + 'px)'
            });
            left = left + 2;
            top = top + 2;
            setTimeout(function() {
                $(self).css('opacity', 1);
            }, index * 200);
        });
    }

    constructor();

    $('.card-wrapp').css('height', cardWidth + 'px');
    $('#cards').css('height', (cardWidth + 16 + $('#cards').width() * 0.06) | 0);
    $(window).resize(function() {
        $('.card-wrapp').css('height', cardWidth + 'px');
        $('#cards').css('height', (cardWidth * 3 + $('#cards').width() * 0.06) | 0);
    });


    $('body').on('click', '.gamebutton.notclicked, #cards.notclicked .card', function() {
        mix();

        setTimeout(function() {
            $('.notclicked').removeClass('notclicked');
            $('.card').addClass('notclicked userturn');
            $('.gamebutton').css({
                'opacity': 0.5,
                'cursor': 'default'
            });
        }, 1000);

        game(winner);
    });

    function mix() {

        $('#cards').css('height', (cardWidth * 3 + $('#cards').width() * 0.06) | 0);
        var count = 2;
        $($('.card-wrapp').get().reverse()).each(function(index) {
            var self = this;

            setTimeout(function() {

                if ((count % 3 === 0) && (count < 10)) {
                    $(self).css({
                        '-webkit-transform': 'translate(' + left + 'px,' + top + 'px)',
                        'transform': 'translate(' + left + 'px,' + top + 'px)',
                        'transition': 'transform 1s',
                        'z-index': count + 10
                    });
                    left = 0;
                    top += cardWidth;

                } else if (count < 10) {
                    $(self).css({
                        '-webkit-transform': 'translate(' + left + 'px,' + top + 'px)',
                        'transform': 'translate(' + left + 'px,' + top + 'px)',
                        'transition': 'transform 1s',
                        'z-index': count + 10
                    });
                    left += cardWidth;
                }

                count++;


            }, index * 350);
        });
    }

    function userturn() {
        $(document).on('click', '.userturn.notclicked', function() {
            $('.userturn').removeClass('notclicked userturn');
            $('.card').addClass('dealerturn');
            $(this).parent().addClass('user');
            $(this).find('.card-back').addClass(user);
            $(this).addClass('flipped');
        });
    }

    function dealerturn() {
        $(document).on('click', '.card-wrapp:not(.user) .dealerturn', function() {
            $(this).parent().addClass('dealer');
            $(this).find('.card-back').addClass(dealer);

            $('.card-wrapp:not(.user):not(.dealer) .card').css({
                '-webkit-transform': 'rotate(360deg)',
                'transform': 'rotate(360deg)',
                'transition': 'transform 2s'
            }).fadeOut(1300, function() {
                $('.card-wrapp:not(.user):not(.dealer)').css('display', 'none');
            });

            $('.card-wrapp:not(.user):not(.dealer)').css({
                '-webkit-transform': 'translate(' + cardWidth + 'px,' + cardWidth * 2 + 'px)',
                'transform': 'translate(' + cardWidth + 'px,' + cardWidth * 2 + 'px)',
                'transition': 'transform 3s'
            });

            flop();
            $(this).addClass('flipped');
            msg();



        });
    }

    userturn();
    dealerturn();


    function flop() {

        $('.user').css({
            '-webkit-transform': 'translate(' + cardWidth / 2 + 'px,0)',
            'transform': 'translate(' + cardWidth / 2 + 'px,0)',
            'transition': 'transform 2s'
        });
        $('.dealer').css({
            '-webkit-transform': 'translate(' + (cardWidth / 2 + cardWidth) + 'px,0)',
            'transform': 'translate(' + (cardWidth / 2 + cardWidth) + 'px,0)',
            'transition': 'transform 2s'
        });

    }


    function game(result) {
        var randorder = shuffle(['carrot', 'bunny', 'egg']);
        var removeItem;

        if (result) {
            removeItem = 'egg';
            randorder = jQuery.grep(randorder, function(value) {
                return value != removeItem;
            });
            var index = 0;

            user = randorder[index++];
            dealer = randorder[index++];
        } else {

            var ind = 0;

            user = randorder[ind++];
            flash = user;

            if (flash == 'carrot') {
                removeItem = 'bunny';
                randorder = jQuery.grep(randorder, function(value) {
                    return value != removeItem;
                });
            } else if (flash == 'bunny') {
                removeItem = 'carrot';
                randorder = jQuery.grep(randorder, function(value) {
                    return value != removeItem;
                });
            }

            dealer = randorder[(Math.floor(Math.random() * randorder.length) + 1) - 1];

        }

    }

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function msg() {
        if (winner) {
            $('#gameform').css({
                'display': 'block',
                'opacity': 1
            });

            $('#result').css({
                'margin-top': cardWidth + 80,
                'display': 'block'
            });

            $('#result h2').css({
                'background': '#13a538',
                'opacity': 1
            }).text('Sie haben gewonnen!');

            $('#gameform').attr('action', 'insert-win.php');
            $(window).trigger("resize");

        } else {
            $('#gameform > label:nth-child(7),#gameform > input[type="text"]:nth-child(8),#gameform > label:nth-child(9),#gameform > input[type="text"]:nth-child(10)').remove();

            $('#gameform').css({
                'display': 'block',
                'opacity': 1
            });

            $('#result').css({
                'margin-top': cardWidth + 80,
                'display': 'block'
            });

            $('#result h2').css({
                'background': '#d10a11',
                'opacity': 1
            }).text('Sie haben leider verloren!');

            $('#gameform').attr('action', 'insert-lose.php');
        }

        $('#cards').css('height', 'auto');

    }


    $('input[name="newsletter"]').on('click', function() {
        if ($(this).prop('checked')) {
            $('#bahnhof').slideToggle();
        } else {
            $('#bahnhof').slideToggle();
        }
    });




}); //END document ready

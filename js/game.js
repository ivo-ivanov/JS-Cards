jQuery(document).ready(function($) {

    //Variables
    var cardWidth = $('.card-wrapp').outerWidth();
    $(window).resize(function(){
        cardWidth = $('.card-wrapp').outerWidth();
    });
    console.log('.card wrapp: ' + cardWidth);
    var left = 0;
	var top = 0;


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
    $(window).resize(function() {
        $('.card-wrapp').css('height', cardWidth + 'px');
    });


    $('#button').on('click', function() {
		mix();
	});

	function mix() {
		var i;
		for (i = 9; i > 0; i--) {
			pos(i, cardWidth);
		}
	}
    var count = 1;
	function pos(i, cardWidth) {

		setTimeout(function() {
			var card = $('.card' + i);

            $(card).css('transform', 'translate(' + left + 'px,' + top + 'px)').css('transition', '2s');


            if (count<3) {
                left += cardWidth;
            }
            else {
                left = 0;
                top += cardWidth;
                count = 0;
            }
            console.log(left,top,count);
			count++;

		}, i * 50);
	}

    function selectCard() {
        $('.card').on('click',function(){
            $(this).addClass('selected');
            $('.card').find(':not(.selected)').filter(':nth-child(5)').addClass('dealer');

            // console.log('.card:not(.selected):nth-child(' +  Math.floor( (Math.random() * $('.card').length) + 1 ) +')');

            $(this).parent().css('transform','translate(0,0)').css('transition', '1.3s');
            $(this).css('transform','rotateY(180deg)').css('transition', '1.3s');
            $('.card:not(.selected):not(.dealer)').css('opacity', 0);

        });
    }

    selectCard();





}); //END document ready

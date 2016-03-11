jQuery(document).ready(function($) {

	//Variables
	var cardWidth = $('.card-wrapp').outerWidth();
	$(window).resize(function() {
		cardWidth = $('.card-wrapp').outerWidth();
	});

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


	$('body').on('click', '.button.notclicked, #cards.notclicked .card', function() {
		mix();
		$('.notclicked').removeClass('notclicked');
		$('.card').addClass('notclicked');
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

			$(card).css('transform', 'translate(' + left + 'px,' + top + 'px)').css('transition', 'transform 1.3s');


			if (count < 3) {
				left += cardWidth;
			} else {
				left = 0;
				top += cardWidth;
				count = 0;
			}
			console.log(left, top, count);
			count++;

		}, i * 50);
	}

    $.fn.randomCard = function() {
      return this.eq(Math.floor(Math.random() * this.length));
  };




	function selectCard() {
		$('body').on('click', '.card.notclicked', function() {
			$(this).parent().addClass('selected');
            $($('.card-wrapp:not(.selected)').randomCard()).addClass('dealer');

            $('.card-wrapp:not(.selected):not(.dealer) .card').css('transform', 'rotate(360deg)').css('transition', 'transform 2.3s').fadeOut(2300,function(){
                $('.card-wrapp:not(.selected):not(.dealer)').css('display','none');
            });

            $('.card-wrapp:not(.selected):not(.dealer)').css('transform', 'translate('+cardWidth+'px,'+cardWidth*2+'px)').css('transition', 'transform 5.3s');



            console.log(exitLeft,exitTop);

			// console.log('.card:not(.selected):nth-child(' +  Math.floor( (Math.random() * $('.card').length) + 1 ) +')');
            //
			// $(this).parent().css('transform', 'translate(16.6666%,0)').css('transition', 'transform 1.3s');
			// $(this).css('transform', 'rotateY(180deg)').css('transition', 'transform 1.3s');
			// $('.card-wrapp:not(.selected):not(.dealer)').css('opacity', 0);

		});
	}

	selectCard();





}); //END document ready

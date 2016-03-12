jQuery(document).ready(function($) {

	//Variables
	var cardWidth = $('.card-wrapp').outerWidth();
	$(window).resize(function() {
		cardWidth = $('.card-wrapp').outerWidth();
	});

	var left = cardWidth;
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
		$('.card').addClass('notclicked userturn');
	});

	function mix() {
		var count = 2;
		$($('.card-wrapp').get().reverse()).each(function(index) {
			var self = this;

			setTimeout(function() {

				if ((count % 3 === 0) && (count < 10)) {
					$(self).css({
						'transform': 'translate(' + left + 'px,' + top + 'px)',
						'transition': 'transform 1s',
						'z-index': count+10
					});
					left = 0;
					top += cardWidth;
				} else if (count < 10) {
					$(self).css({
						'transform': 'translate(' + left + 'px,' + top + 'px)',
						'transition': 'transform 1s',
						'z-index': count+10
					});
					left += cardWidth;
				}
				count++;


			}, index * 450);
		});
	}

	function userturn() {
		$(document).on('click', '#cards:not(.notclicked) .userturn.notclicked', function() {
			$('.userturn').removeClass('notclicked userturn');
			$('.card').addClass('dealerturn');
			$(this).parent().addClass('user');
            $(this).addClass('flipped');
		});
	}

	function dealerturn() {
		$(document).on('click', '.card-wrapp:not(.user) .dealerturn', function() {
			$(this).parent().addClass('dealer');
			$('.card-wrapp:not(.user):not(.dealer) .card').css({
				'transform': 'rotate(360deg)',
				'transition': 'transform 2s'
			}).fadeOut(1300, function() {
				$('.card-wrapp:not(.user):not(.dealer)').css('display', 'none');
			});

			$('.card-wrapp:not(.user):not(.dealer)').css('transform', 'translate(' + cardWidth + 'px,' + cardWidth * 2 + 'px)').css('transition', 'transform 3s');

			flop();
            $(this).addClass('flipped');


		});
	}

	userturn();
	dealerturn();




	function dealer() {
		$('#wrapper').on('click', '.dealerturn .card.notclicked', function() {
			$(this).addClass('dealer');

			$('.selected').css('transform', 'translate(' + cardWidth / 2 + 'px, 0)');

			$('.card-wrapp:not(.selected):not(.dealer) .card').css('transform', 'rotate(360deg)').css('transition', 'transform 2.3s').fadeOut(2300, function() {
				$('.card-wrapp:not(.selected):not(.dealer)').css('display', 'none');
			});

			$('.card-wrapp:not(.selected):not(.dealer)').css('transform', 'translate(' + cardWidth + 'px,' + cardWidth * 2 + 'px)').css('transition', 'transform 5.3s');
		});
	}

	function flop() {
		var win = true;
		if (win) {
			$('.user').css({
				'transform': 'translate(' + cardWidth / 2 + 'px,0)',
				'transition': 'transform 2s'
			});
            $('.dealer').css({
				'transform': 'translate(' + (cardWidth / 2 + cardWidth) + 'px,0)',
				'transition': 'transform 2s'
			});



	}
}







}); //END document ready

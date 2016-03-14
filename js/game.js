jQuery(document).ready(function($) {

	//Variables
	var cardWidth = $('.card-wrapp').outerWidth();
	$(window).resize(function() {
		cardWidth = $('.card-wrapp').outerWidth();
	});

	var left = cardWidth;
	var top = 0;
	var user, dealer, falsh;
	var winner = false;


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


	$('body').on('click', '.gamebutton.notclicked, #cards.notclicked .card', function() {
		mix();
		$('.notclicked').removeClass('notclicked');
		$('.card').addClass('notclicked userturn');
		$('.gamebutton').css({
			'opacity': 0.5,
			'cursor': 'default'
		});
		setTimeout(function() {
			// $('.gamebutton').css('margin', '5% auto').empty();
		}, 1000);
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
						'z-index': count + 10
					});
					left = 0;
					top += cardWidth;
				} else if (count < 10) {
					$(self).css({
						'transform': 'translate(' + left + 'px,' + top + 'px)',
						'transition': 'transform 1s',
						'z-index': count + 10
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
			$(this).find('.card-back').addClass(user);
			$(this).addClass('flipped');
		});
	}

	function dealerturn() {
		$(document).on('click', '.card-wrapp:not(.user) .dealerturn', function() {
			$(this).parent().addClass('dealer');
			$(this).find('.card-back').addClass(dealer);

			$('.card-wrapp:not(.user):not(.dealer) .card').css({
				'transform': 'rotate(360deg)',
				'transition': 'transform 2s'
			}).fadeOut(1300, function() {
				$('.card-wrapp:not(.user):not(.dealer)').css('display', 'none');
			});

			$('.card-wrapp:not(.user):not(.dealer)').css('transform', 'translate(' + cardWidth + 'px,' + cardWidth * 2 + 'px)').css('transition', 'transform 3s');

			flop();
			$(this).addClass('flipped');
			msg();



		});
	}

	userturn();
	dealerturn();


	function flop() {

		$('.user').css({
			'transform': 'translate(' + cardWidth / 2 + 'px,0)',
			'transition': 'transform 2s'
		});
		$('.dealer').css({
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

			console.log('win!');

			user = randorder[index++];
			dealer = randorder[index++];
		} else {

			var ind = 0;

			console.log('lose!');
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

	game(winner);
	console.log(user, dealer);

	function msg() {
		if (winner) {
			$('.gamebutton2').css({
				'background': '#13a538'
			}).text('Sie haben gewonnen!');
		} else {
			$('.gamebutton2').text('Sie haben leider verloren.');
		}
		setTimeout(function() {
			$('.gamebutton2').css({
				'opacity': 1
			});
		}, 500);
	}

	function formConstructor(){
		if(winner){


		}
		else{

		}
	}


formConstructor();








}); //END document ready

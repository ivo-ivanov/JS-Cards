jQuery(document).ready(function($) {

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
        if ($(window).width() < 1000)  {
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
        $('.card').css('height', $('.card').outerWidth());
    }

    constructor();



}); //END document ready

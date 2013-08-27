(function($) {
    $.fn.zooma = function(options) {
        options = options || {'speed': 300, 'factor': 2};
        var $el = this
                , $body = $('.zoomcontainer');

        var
                elCenterX = $el.offset().left - $body.offset().left + ($el.width() / 2)
                , elCenterY = $el.offset().top - $body.offset().top + ($el.height() / 2)
                , bodyX = (screen.width / 2) - elCenterX
                , bodyY = (screen.height / 2) - elCenterY;

        if ($body.hasClass('zooma')) {
            options.factor = 'none';
            bodyX = 0;
            bodyY = 0;
            elCenterX = 0;
            elCenterY = 0;
            $body.removeClass('zooma');
            $el.removeClass('zoomed');
            $('.zoombackground').removeClass('show');

        } else {
            $body.addClass('zooma');
            $el.addClass('zoomed');
            $el.parent().append($('<div class="zoombackground"></div>'));
            $('.zoombackground').attr('style', 'top:' + (-bodyY / 2) + 'px;left:' + (-bodyX / 2) + 'px;height:' + screen.height + 'px;width:' + screen.width + 'px;transition: ' + options.speed + 'ms opacity ease-in-out;');
            window.setTimeout(function() {
                $('.zoombackground').addClass('show');
            }, options.speed / 2);


        }



        $body.attr('style', 'transition-duration: ' + options.speed + 'ms; left:' + bodyX + 'px;top:' + bodyY + 'px;-webkit-transform:scale(' + options.factor + ');transform:scale(' + options.factor + ') ;transform-origin: ' + (elCenterX) + 'px ' + (elCenterY) + 'px;-webkit-transform-origin: ' + (elCenterX) + 'px ' + (elCenterY) + 'px;');

    };
})(jQuery);





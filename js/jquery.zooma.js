/* ==========================================================================
 zooma Author Alexander Kindziora 2013 https://github.com/kindziora
 ========================================================================== */
(function($) {
    $.fn.zooma = function(options) {
        var $el = this
                , $body = $('.zoomcontainer')
                , bodyX = 0
                , bodyY = 0
                , elCenterX = 0
                , elCenterY = 0
                , defaultOptions = {
            'speed': $el.attr('data-speed') || 250,
            'factor': $el.attr('data-factor') || 1.5,
            'shown': function() {
                var $el = this;
                /*var stylesZoomedEl = [
                 'font-size:' + (100 / options.factor) + '%'
                 ];
                 
                 $el.attr('style', stylesZoomedEl.join(';'));*/
            },
            'closed': function() {
                var $el = this;
            }
        };

        options = $.extend(true, defaultOptions, options);


        if ($body.hasClass('zooma')) {

            options.factor = 'none';
            $body.removeClass('zooma');
            $el.removeClass('zoomed');

            $('.zoombackground').removeClass('show');

            window.setTimeout(function() {
                $('.zoombackground').remove();
                options.closed.call($el);
            }, options.speed);
        } else {

            elCenterX = $el.offset().left - $body.offset().left + ($el.width() / 2)
                    , elCenterY = $el.offset().top - $body.offset().top + ($el.height() / 2)
                    , bodyX = (screen.width / 2) - elCenterX
                    , bodyY = (screen.height / 2) - elCenterY;

            $body.addClass('zooma');
            $el.addClass('zoomed');
            $el.parent().append($('<div class="zoombackground"></div>'));

            var stylesBackground = [
                'top:' + (-bodyY) + 'px',
                'left:' + (-bodyX) + 'px',
                'height:' + screen.height + 'px',
                'width:' + screen.width + 'px',
                'transition: ' + options.speed + 'ms opacity ease-in-out'
            ];

            $('.zoombackground').attr('style', stylesBackground.join(';'));

            window.setTimeout(function() {
                $('.zoombackground').addClass('show');
                options.shown.call($el);
            }, options.speed);

        }

        var stylesBody = [
            'transition-duration: ' + options.speed + 'ms',
            'left:' + bodyX + 'px',
            'top:' + bodyY + 'px',
            'transform:scale(' + options.factor + ')',
            'transform-origin: ' + (elCenterX) + 'px ' + (elCenterY) + 'px',
            '-webkit-transform:scale(' + options.factor + ')',
            '-webkit-transform-origin: ' + (elCenterX) + 'px ' + (elCenterY) + 'px'
        ];

        $body.attr('style', stylesBody.join(';'));


    };
})(jQuery);





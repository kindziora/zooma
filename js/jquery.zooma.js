/* ==========================================================================
 zooma Author Alexander Kindziora 2013 https://github.com/kindziora
 ========================================================================== */
(function($) {
    var ContainerWidth = $('.zoomcontainer').width(), ContainerHeight = $('.zoomcontainer').height();

    var methods = {
    };

    methods.zoomIn = function($el, options) {
        options.bodyX = (screen.width / 2) - options.elCenterX
                , options.bodyY = (screen.height / 2) - options.elCenterY;

        options.body.addClass('zooma');
        $el.addClass('zoomed');
        $el.parent().append($('<div class="zoombackground"></div>'));

        var stylesBackground = [
            'top:' + (-options.bodyY) + 'px',
            'left:' + (-options.bodyX) + 'px',
            'height:' + screen.height + 'px',
            'width:' + screen.width + 'px',
            'transition: ' + options.speed + 'ms opacity ease-in-out'
        ];

        $('.zoombackground').attr('style', stylesBackground.join(';'));

        window.setTimeout(function() {
            $('.zoombackground').addClass('show');
            options.shown.call($el);
        }, options.speed);
    };

    methods.zoomOut = function($el, options) {
        $('.zoombackground').removeClass('show');
        options.factor = 'none';
        options.body.removeClass('zooma');
        $el.removeClass('zoomed');
        options.body.addClass('fixed');

        window.setTimeout(function() {
            $('.zoombackground').remove();
            options.closed.call($el);
            options.body.removeClass('fixed');
        }, options.speed);
    };

    $.fn.zooma = function(options) {

        var $el = this,
                defaultOptions = {
            'speed': $el.attr('data-speed') || 200,
            'factor': $el.attr('data-factor') || 1.4,
            'body': $('.zoomcontainer'),
            'bodyX': 0,
            'bodyY': 0,
            'elCenterX': $el.offset().left - $('.zoomcontainer').offset().left + ($el.width() / 2),
            'elCenterY': $el.offset().top - $('.zoomcontainer').offset().top + ($el.height() / 2),
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

        if (!options.body.hasClass('zooma')) {
            methods.zoomIn($el, options);
        } else {
            methods.zoomOut($el, options);
        }

        var stylesBody = [
            'transition-duration: ' + options.speed + 'ms',
            'left:' + options.bodyX + 'px',
            'top:' + options.bodyY + 'px',
            'width:' + ContainerWidth + 'px',
            'height:' + ContainerHeight + 'px',
            'transform: scale(' + options.factor + ')',
            'transform-origin: ' + (options.elCenterX) + 'px ' + (options.elCenterY) + 'px',
            '-webkit-transform: scale(' + options.factor + ')',
            '-webkit-transform-origin: ' + (options.elCenterX) + 'px ' + (options.elCenterY) + 'px'
        ];

        options.body.attr('style', stylesBody.join(';'));


    };
})(jQuery);





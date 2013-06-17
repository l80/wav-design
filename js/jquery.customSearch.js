//(function() {
//
//    var openedDialogs = {};
//
//    jQuery.fn.customSearch = function(method) {
//        var $this = this;
//        var $body = $('body');
//        var $content = $('#content');
//
//        var closeOnOutsideClick = function() {
//            $this.on("clickoutside", (function(e) {
//                close();
//            }));
//        };
//
//        var addToOpened = function() {
//            openedDialogs[$this.selector] = $this;
//        };
//
//        var removeFromOpened = function() {
//            openedDialogs[$this.selector] = null;
//        };
//
//        var refresh = function() {
//            var height = $this.children().height();
//            $content.css('min-height', height);
//        };
//
//        var isOpened = function() {
//            return (openedDialogs[$this.selector]);
//        };
//
//        var toggle = function() {
//            if (isOpened()) {
//                close();
//            } else {
//                open();
//            }
//        };
//
//        var open = function() {
//            refresh();
//            $body.addClass('custom-search-opened');
//            setTimeout(closeOnOutsideClick, 0);
//            addToOpened();
//            console.log('opened');
//        };
//
//        var close = function() {
//            $content.css('min-height', '');
//            $body.removeClass('custom-search-opened');
//            $this.off('clickoutside');
//            removeFromOpened();
//        };
//
//        var methods = {
//            open: open,
//            close: close,
//            refresh: refresh,
//            toggle: toggle
//        };
//
//        if ( methods[method] ) {
//            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
//        } else if ( typeof method === 'object' || ! method ) {
//            return methods.init.apply( this, arguments );
//        } else {
//            $.error( 'Method ' +  method + ' doesn\'t exist');
//        }
//
//    };
//
//    $(window).on( 'orientationchange', function(e){
//        _.each(openedDialogs, function($dialog) {
//            if ($dialog) $dialog.customSearch('refresh');
//        });
//    });
//
//}());


(function ($) {
    $.fn.customSearch = function (options) {

        options = $.extend({
            android: false,
            openedClass: 'custom-search-opened',
            alsoDisplay: $('')
        }, options);

        var that = {},
            $this = $(this),
            $child = $($this.children()[0]),
            $window = $(window),
            $html = $('html'),
            $body = $('body'),
            opened = false;

        var resize = function(doResize) {
            if (doResize) {
                var modalHeight = max($window.height(), options.alsoDisplay.outerHeight(true) + $child.outerHeight(true));

                $body.css('height', modalHeight+'px');
                $this.css('height', modalHeight+'px');
            }
        };

        var toggle = function() {
            if (opened) {
                close();
            } else {
                open();
            }
        };

        var open = function() {
            resize(true);

            if (options.android) {
                //VS-1054 - fixing nexus bug
                $body.css('overflow-y', 'hidden');
                $html.css('overflow-y', 'auto');
            } else {
                $body.css('overflow-y', 'hidden');
                $html.css('overflow-y', 'hidden');
            }

            opened = true;

            if (options.android) {
                //problem... we need to fix http://code.google.com/p/android/issues/detail?id=6721
                //disable all input
                $('a, input, select, textarea').addClass('android-disabled').attr('disabled','disabled');
                //enable dialog input
                $('.dialog .android-disabled').removeClass('android-disabled').removeAttr('disabled');
                //disable click highlighting
                $body.addClass('android-dialog-open');
            }

            $body.addClass(options.openedClass);
        };

        var close = function() {
            if (opened) {
                $this.removeClass('dialog');
                $body.css({'overflow-y':'', 'height':''});
                $html.css({'overflow-y':''});
                $this.css({'height': ''});
                opened = false;

                if (options.android) {
                    //enable input
                    $('.android-disabled').removeClass('android-disabled').removeAttr('disabled');
                    //enable click highlighting
                    $body.removeClass('android-dialog-open')
                }
            }

            $body.removeClass(options.openedClass);
        };

        //recalculate on resize
        $window.resize(function() {
            resize(opened); //resize only when dialog is displayed
        });

        that.toggle = toggle;

        return that;
    };

    function max(a, b) {
        return (a>b) ? a : b
    }
})(jQuery);
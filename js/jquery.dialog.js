(function ($) {
    $.fn.daDialog = function (options) {

        options = $.extend({
            onOpen: function() {},
            onClose: function() {},
            onOk: function() {},
            postConstruct: function() {},
            android: false,
            positionByCenter: true,
            openedClass: '',
            alsoDisplayed: null,
            closeOnOutsideClick: true
        }, options);

        var that = {},
            $this = $(this),
            $child = $($this.children()[0]),
            $window = $(window),
            $html = $('html'),
            $body = $('body'),
            displayed = false;

        var resize = function(doResize) {
            if (doResize) {
                if (options.positionByCenter) {
                    var heightDiff = $window.height() - $child.height();

                    if (heightDiff > 0) {
                        $child.css('padding-top', heightDiff/2+'px')
                    }
                }

                var modalHeight;

                if (options.alsoDisplayed) {
                    modalHeight = max($window.height(), options.alsoDisplayed.outerHeight(true) + $child.outerHeight(true));
                } else {
                    modalHeight = max($window.height(), $child.outerHeight(true));
                }

                $body.css('height', modalHeight+'px');
                $this.css('height', modalHeight+'px');
            }
        };

        var open = function() {
            options.onOpen(that);

            $this.addClass('dialog');

            resize(true);

            if (options.android) {
                //VS-1054 - fixing nexus bug
                $body.css('overflow-y', 'hidden');
                $html.css('overflow-y', 'auto');
            } else {
                $body.css('overflow-y', 'hidden');
                $html.css('overflow-y', 'hidden');
            }

            displayed = true;

            if (options.android) {
                //problem... we need to fix http://code.google.com/p/android/issues/detail?id=6721
                //disable all input
                $('a, input, select, textarea').addClass('android-disabled').attr('disabled','disabled');
                //enable dialog input
                $('.dialog .android-disabled').removeClass('android-disabled').removeAttr('disabled');
                //disable click highlighting
                $body.addClass('android-dialog-open');
            }

            if (options.openedClass) $body.addClass(options.openedClass);
        };

        var close = function() {
            if (displayed) {
                $this.removeClass('dialog');
                $body.css({'overflow-y':'', 'height':''});
                $html.css({'overflow-y':''});
                $this.css({'height': ''});
                displayed = false;

                if (options.android) {
                    //enable input
                    $('.android-disabled').removeClass('android-disabled').removeAttr('disabled');
                    //enable click highlighting
                    $body.removeClass('android-dialog-open')
                }

                options.onClose();
                if (options.openedClass) $body.removeClass(options.openedClass);
            }
        };

        var toggle = function() {
            if (displayed) {
                close();
            } else {
                open();
            }
        };

        //recalculate on resize
        $window.resize(function() {
            resize(displayed); //resize only when dialog is displayed
        });

        if (options.closeOnOutsideClick) {
            //close dialog on click
            $this.on('click', function(e) {
                //close when user clicks outside area
                if (e.target == $this[0] || e.target == $child[0]) {
                    close();
                }
            });
        }

        //ok button handler
        $this.find('.button.ok').on('click', function(e) {
            e.preventDefault();
            if (displayed) {
                options.onOk(that);
                close();
            }
        });

        //close button handler
        $this.find('.button.close').on('click', function(e) {
            e.preventDefault();
            if (displayed) {
                close();
            }
        });

        that.open = open;
        that.close = close;
        that.toggle = toggle;
        that.child = $child;

        options.postConstruct(that);

        return that;
    };

    function max(a, b) {
        return (a>b) ? a : b
    }
})(jQuery);
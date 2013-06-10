$(document).ready(function() {
    var $nav = $('.main-navigation');
    var $opened = $nav.children('.opened-navigation');
    var $collapsed = $nav.children('.collapsed-navigation');
    var opened = $nav.hasClass('opened');

    var open = function() {
        if (!opened) {
            $nav.addClass('opened');

            if (!Modernizr.cssanimations) {
                $opened.animate({
                    left: 0
                }, {
                    duration: 350
                })
            }

            opened = true;
        }
    };

    var close = function() {
        if (opened) {
            $nav.removeClass('opened');

            if (!Modernizr.cssanimations) {
                $opened.animate({
                    left: -1*$opened.width()
                }, {
                    duration: 350
                })
            }

            opened = false;
        }
    };

    $opened.children('.trigger').click(function(e) {
        e.preventDefault();
        close();
    });

    $collapsed.children('.trigger').click(function(e) {
        e.preventDefault();
        open();
    });

    $nav.on("clickoutside", (function(e) {
        close();
    }));

    open();
});
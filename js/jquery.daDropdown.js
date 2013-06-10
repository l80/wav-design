(function( $ ) {
    $.fn.daDropdown = function( method ) {
        var $this = this;

        var closeOnOutsideClick = function() {
            $this.on("clickoutside", (function(e) {
                close();
            }));
        };

        var open = function() {
            if (!$this.hasClass('open')) {
                $this.addClass('open');
                $this.trigger('dropdown-open');
                setTimeout(closeOnOutsideClick, 0);
            }
        };

        var close = function() {
            if ($this.hasClass('open')) {
                $this.removeClass('open');
                $this.trigger('dropdown-close');
                $this.off('clickoutside');
            }
        };

        var methods = {
            open : open,
            close : close
        };

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Doesn\'t have method ' +  method + '' );
        }

    };

//    $.fn.daDropdown = function(action) {
//        var close = function() {
//            if (this.hasClass('open')) {
//                this.removeClass('open');
//                this.trigger('dropdown-close');
//            }
//        };
//
//        if (action == 'open') {
//            if (!this.hasClass('open')) {
//                this.addClass('open');
//                this.trigger('dropdown-open')
//            }
//        } else if (action == 'close') {
//            close();
//        } else {
//            //init
//            this.on("clickoutside", (function(e) {
//                close();
//            }));
//        }
//
//    };

    $(document).ready(function() {
        $('[dropdown-open]').click(function(e) {
            e.preventDefault();

            var $this = $(this);
            $($this.attr('dropdown-open')).daDropdown('open');
        });
    })
})(jQuery);
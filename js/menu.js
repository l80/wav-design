$(document).ready(function() {
    var st = sidetap();

    $('header .menu-trigger').click(function(e) {
        e.preventDefault();
        st.toggle_nav();
    })

    $('.collapsable .item').click(function(e) {
        e.preventDefault();

        var $collapsable = $(this).parent();
        var $subItems = $collapsable.find('.sub-items');
        var height = $subItems.height();
        var margin = parseInt($collapsable.css('margin-bottom'));

        if ($collapsable.hasClass('opened')) {
            $subItems.css('bottom', 0);
            $collapsable.css('margin-bottom', margin - height);
            $collapsable.removeClass('opened');
        } else {
            //open it
            $subItems.css('bottom', -1*height);
            $collapsable.css('margin-bottom', margin + height);
            $collapsable.addClass('opened');
        }
    })
})
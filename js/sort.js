var wav = wav || {};

wav.init = function() {
    wav.navigation = $('.main-navigation');
    wav.sortSubMenu = $('.sort-container');
    wav.sortSubMenuDisplayed = false;
};

wav.toggleSortSubMenu = function($trigger) {
    var wrapper = $trigger.parents('.drop-down-wrapper');
    var container = wrapper.find('.drop-down-container');
    var content = container.children();

    var displayed = wrapper.hasClass('drop-down-displayed');

    if (displayed) {
        container.css('height', 0);
        content.css('top',-1*content.height());
        wrapper.removeClass('drop-down-displayed');
    } else {
        container.css('height', content.height());
        content.css('top', 0);
        wrapper.addClass('drop-down-displayed');
    }
};

$(document).ready(function() {
    wav.init();
    $('.drop-down-trigger').click(function(e) {
        e.preventDefault();
        wav.toggleSortSubMenu($(this));
    })
});
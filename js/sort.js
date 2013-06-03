var wav = wav || {};

wav.init = function() {
    wav.navigation = $('.main-navigation');
    wav.sortSubMenu = wav.navigation.children('.sort-container');
    wav.sortSubMenuDisplayed = false;
};

wav.toggleSortSubMenu = function() {
    var content = wav.sortSubMenu.children();

    if (wav.sortSubMenuDisplayed) {
        wav.sortSubMenu.css('height', 0);
        content.css('top',-1*content.height());
        wav.sortSubMenuDisplayed = false;
    } else {
        wav.sortSubMenu.css('height', content.height());
        content.css('top', 0);
        wav.sortSubMenuDisplayed = true;
    }
};

$(document).ready(function() {
    wav.init();
    wav.navigation.children('.menu-sorting').click(function(e) {
        e.preventDefault();
        wav.toggleSortSubMenu();
    })
});
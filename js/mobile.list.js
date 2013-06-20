$(document).ready(function () {
//    var $customSearch = $('.custom-search-container').customSearch({
//        android: true,
//        alsoDisplay: $('header')
//    });

    var $customSearch = $('.custom-search-container').daDialog({
        android: true,
        positionByCenter: false,
        closeOnOutsideClick : false,
        openedClass: 'custom-search-opened',
        alsoDisplayed: $('header')
    });

    $('header .search').click(function(e) {
        e.preventDefault();
        $customSearch.toggle();
    });

    $('.header-custom-search .close').click(function(e) {
        e.preventDefault();
        $customSearch.close();
    })
});
$(document).ready(function() {
    /* some custom settings */
    var abcIndex = $('.iosSlider').iosSlider({
        snapToChildren: true,
        desktopClickDrag: true
    });

    $('.abc-index-container .next').click(function(e) {
        e.preventDefault();

        var args = $('.iosSlider').data('args');

//        $('.iosSlider').iosSlider('nextSlide', 3);
        $('.iosSlider').iosSlider('goToSlide', args.currentSlideNumber + 5);
    })
});
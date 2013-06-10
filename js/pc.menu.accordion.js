$(document).ready(function() {
//    $('.opened-navigation').ftaccordion({
//        stowage: true
//    });

//    $('.opened-navigation .accordion').accordion({
//        autoheight: false,
//        collapsible: true
//    });

    //http://projects.timhuegdon.com/jquery-accordion/
    $('.pages-and-filters').accordion({
        handle: ".handle", // Default: "h3"
        panel: ".panel", // Default: ".panel"
        speed: 500, // Default: 200
//        easing: "easeInOutQuad", // Default "swing"
        canOpenMultiple: true, // Default: false
        canToggle: true, // Default: false
        activeClassPanel: "open", // Default: "open"
        activeClassLi: "active", // Default: "active"
        lockedClass: "locked", // Default: "locked"
        loadingClass: "loading" // Default: "loading"
    });
});
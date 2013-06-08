$(document).ready(function() {
    $("label").click(function(){
        if ($(this).attr("for") != "") {
            var $input = $("#" + $(this).attr("for"));
            var type = $input.attr("type");

            if (type == "checkbox") {
                $input.attr('checked', !$input.is(":checked"));
                $input.trigger('change');
            } else if (type == "radio") {
                $input.attr('checked', true);
                $input.trigger('change');
            }
        }
    });
});
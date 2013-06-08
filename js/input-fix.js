$(document).ready(function() {
    $('[type=checkbox], [type=radio]').change(function() {
        var clazz = "checked";
        var $this = $(this);

        if ($this.is(":checked")) {
            $this.parent().addClass(clazz);

            if (this.name) {
                $('input[name=' + this.name + ']:not(:checked)').parent().removeClass(clazz)
            }
        } else {
            $this.parent().removeClass(clazz);
        }
    })
});
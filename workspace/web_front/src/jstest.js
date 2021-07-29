jQuery(document).ready(function() {


    $(document).on('click', function(event) {
        if (!$(event.target).closest('.loc-top').length) {
            jQuery('.city-list').slideUp();
            jQuery('.loc-top').removeClass('active');

        }
        if (!$(event.target).closest('#sabad').length) {

            jQuery('#sabad').removeClass('active');
            jQuery('.sabad-content').slideUp();
        }



    });


    $("select").change(function () {
        var str = "";
        str = $(this).find(":selected").text();
        $(".loc-top-s span").text(str);
    }).trigger('change');


    $('#checkbox').change(function(){
        setInterval(function () {
            moveRight();
        }, 3000);
    });


});

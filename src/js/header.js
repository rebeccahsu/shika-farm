// $(".ham_btn").on("click", function(){
//     $(".ham_line").toggleClass("-on");
//     $(".hamSel").toggleClass("-on");
//     $(".hamMask").toggleClass("-on");
//     $(".hamMask").animate({opacity: "1"});
//     $(".hamMask").css({display: "block"});
// });

$(".ham_btn").on("click", function () {
    if ($(".hamSel").hasClass("-on")) {
        $(".ham_line").removeClass("-on");
        $(".hamSel").removeClass("-on");
        $(".hamMask").animate({ opacity: "0" }, { duration: "300" });

        setTimeout(function () {
            $(".hamMask").css({ display: "none" });
        }, 300);
        $(".hamMask").removeClass("-on");
    } else {
        $(".ham_line").addClass("-on");
        $(".hamSel").addClass("-on");
        $(".hamMask").addClass("-on");
        // $(".hamMask").css({ display: "block" });

        $(".hamMask").animate({ opacity: "1" }, { duration: "300" });
        $(".hamMask").css({ display: "block" });

    };

});

$(".hamMask").on("click", function () {
    $(".ham_line").removeClass("-on");
    $(".hamSel").removeClass("-on");
    $(".hamMask").removeClass("-on");
});


$(".ham_btn").on("click", function(){
    $(".ham_line").toggleClass("-on");
    $(".hamSel").toggleClass("-on");
    $(".hamMask").toggleClass("-on");
});

$(".hamMask").on("click", function(){
    $(".ham_line").removeClass("-on");
    $(".hamSel").removeClass("-on");
    $(".hamMask").removeClass("-on");
});


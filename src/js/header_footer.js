AOS.init();

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
    $(".hamMask").animate({ opacity: "0" }, { duration: "300" });

    setTimeout(function () {
        $(".hamMask").css({ display: "none" });
    }, 300);
    $(".hamMask").removeClass("-on");
});




new Vue({
    el: '#appMenu',
    data: {
        menus: [
            { title: 'Sìkha動物', link: '../animal.html', icon: './img/icon/animal_icon.png' },
            { title: '園區資訊', link: '../info.html', icon: './img/icon/info_icon.png' },
            { title: '最新消息', link: '../news.html', icon: './img/icon/news_icon.png' },
            { title: '牧場節目', link: '../activity.html', icon: './img/icon/activity_icon.png' },
            { title: '周邊商品', link: '../products.html', icon: './img/icon/products_icon.png' },

        ],
    },
});

gsap.to(['.tree1', '.tree2'], {
    repeat: -1,
    keyframes: [
        { duration: 2, rotation: 3},
        { duration: 1, rotation: -3},
        { duration: 1, rotation: -10},
    ]
});

gsap.to(['.cow1', '.cow2'], {
    repeat: -1,
    keyframes: [
        { duration: 2, rotation: 3},
        { duration: 1, rotation: -3},
        { duration: 1, rotation: 10},
    ]
});
new Vue({
    el:'#blackBg',
    data:()=>{
        return{
            isShow: true,
        }
    },
    methods: {
    
        // openCart(){
        //     this.isShow = !this.isShow;
        //     console.log(this.isShow);
        // }
        
    },
});

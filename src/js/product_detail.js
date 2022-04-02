// 套件================================
// import Splide from './vendors/splide.min.js';
new Splide('.splide01').mount();

document.addEventListener('DOMContentLoaded', function () {
    var main_1 = new Splide('.splide01', {
        type: 'splide',
        rewind: true,
        pagination: false,
        // arrows: false,
        // fixedHeight: 500,
        padding: { bottom: 10 },
        // マウスホイールによるスライダーの移動を有効
        wheel       : true,
        releaseWheel: true,

    });


    var thumbnails_1 = new Splide('#thumbnail-slider1', {
        fixedWidth:183,
        fixedHeight:183,
        gap:10,
        rewind: true,
        pagination: false,
        cover: true,
        isNavigation: false,
        arrows: false,
        padding: { top: 10, left: 0, right: 0 },
        breakpoints: {
            1200:{
                fixedWidth:163,
                fixedHeight:163,
            },
            992:{
                fixedWidth:130,
                fixedHeight:130,
                gap:10,
            },
            768: {
                // destroy:true,  //廢棄會將此段套件失效
                // autoWidth: false
            },
        },
    });

    main_1.sync(thumbnails_1);
    main_1.mount();
    thumbnails_1.mount();


});

var main_2 = new Splide('#splide02', {
    fixedWidth: '80',
    type: 'fade',
    rewind: true,
    pagination: true,
    arrows: true,
    padding: { right: 10, left: 10, bottom: 10 },
    // mediaQuery: 'min',  //mediaQuery:'min'or'max'配合breakpoints: 尺寸
    // destroy: false,  //廢棄會將此段套件區塊會display:none
    // breakpoints: {
    //     768: {
    //         destroy: true
    //     }}
}).mount();

if (window.innerWidth > 991.98) { removeSplide(); }


// for resize
function addSplide() {
    $('.pd_recommend').attr("id", "splide02")
    $('.pd_recommend_list').parent("div").addClass('splide__track');
    $('.pd_recommend_list').addClass('splide__list');
    $('.pd_recommend_list').find("li").addClass('splide__slide');
}

function removeSplide() {
    $('.pd_recommend').removeAttr("id", "splide02")
    $('.pd_recommend_list').parent("div").removeClass('splide__track');
    $('.pd_recommend_list').removeClass('splide__list');
    $('.pd_recommend_list').find("li").removeClass('splide__slide');
}

$(window).on('resize', function () {
    console.log(innerWidth);
    if (window.innerWidth > 991.98) {
        if ($('.pd_recommend').has('#splide02')) {
            removeSplide();

            console.log('object');
        }
    } else {
        addSplide();
    }
})

// ===========================

// 數量調整按鍵


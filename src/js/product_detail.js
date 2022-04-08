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
    fixedWidth: '90',
    autoHeight:true,
    type: 'splide',
    rewind: true,
    pagination: true,
    arrows: true,
    gap:20,
    padding: {  bottom: 10 },
    mediaQuery: 'min',  //mediaQuery:'min'or'max'配合breakpoints: 尺寸
    // destroy: false,  //廢棄會將此段套件區塊會display:none
    breakpoints: {
        992: {
            drag: false,
        }}
}).mount();


    if (window.innerWidth > 992){ removeSplide(); }



// for resize
function addSplide() {
    $('.pd_recommend').children("div").attr("id", "splide02")
    $('.pd_recommend_list').parent("div").addClass('splide__track');
    $('.pd_recommend_list').addClass('splide__list');
    $('.pd_recommend_list').find("li").addClass('splide__slide');
}

function removeSplide() {
    $('.pd_recommend').children("div").removeAttr("id", "splide02")
    $('.pd_recommend_list').parent("div").removeClass('splide__track');
    $('.pd_recommend_list').removeClass('splide__list');
    $('.pd_recommend_list').find("li").removeClass('splide__slide');
}

$(window).on('resize', function () {
    console.log(innerWidth);
    if (window.innerWidth > 992.98) {
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
var stockCount = document.querySelector('#pd_stockCount_input');
var inStock = document.querySelector('#pd_inStock');


$('#pd_stockCount_minus').on('click',(e) => { 
    stockChack(-1);
})
$('#pd_stockCount_plus').on('click',(e) => { 
    stockChack(+1);
})
$('#pd_stockCount_input').on('keyup',(e)=>{
    // 濾除其他字
    var str = (e.target.value).replace(/\D/g, "");
        console.log('keyin');
        if(str <= parseInt(inStock.innerText)){
            stockCount.value = str;
        }else{
            stockCount.value = 1
            alert('sorry! 超過在庫數量');
        }
})

function stockChack(el){
    // -+按鈕
    // 當el= -1 檢查是否大於2
    switch (el) {
        case -1:
            console.log("--");
            if(parseInt(stockCount.value) > 1){
                stockCount.value = parseInt(stockCount.value)-1;
            }
            break;
    // 當el = +1 檢查是否<庫存
        default:
            console.log("++");
            if(parseInt(stockCount.value) < parseInt(inStock.innerText)){
                stockCount.value = parseInt(stockCount.value)+1;
            }
            break;
    }

}
// 數量調整按鍵end
// ==========================================

let img = document.getElementsByClassName('splide__slide')[0];
// let info = document.querySelector('');
// 放入購物車、直接購買
// let products = [
//     {
//         // 'img': img,
//         // 'info' : info,

//     },
// ]
$('#pd_info_cart').on('click',(e)=>{
    e.preventDefault();
    localStorage.setItem('products', JSON.stringify('products'));
})

$('#pd_info_buy').on('click',(e)=>{
    e.preventDefault();
    console.log('buy');
})

// 放入購物車、直接購買end
// ==========================================
// 庫存0時，停用按鈕、加入購物車和購買
// 沒有庫存時
$(function(){
    if($('#pd_inStock').text() == 0){
        $('#pd_info_cart').attr("style","background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;");
        $('#pd_info_buy').attr("style","background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;");
        $('.pd_stockCount_btn').attr('disabled')
        $('.pd_stockCount_btn').attr("style","background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;");
        $("#pd_stockCount_input").attr("style","background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;");
    }
})
// 
// 進入頁面是否讀資料
// $(function(){
//     if(window.href == )
// })



// ========================================
// 提示價錢未寫、成本比售價高

$('#prd_price').on('blur',check_price);
$('#prd_cost').on('blur',check_cost);


function check_price() {
    if ($('#prd_price').val() == "") {
        $('#prd_price').addClass('warn');
        $('p[for="prd_price"]').html('售價<span>*請輸入售價</span>');
    } else if ($('#prd_price').val() < $('#prd_cost').val()) {
        $('#prd_price').addClass('warn');
    } else {
        $('#prd_price').removeClass('warn');
        $('p[for="prd_price"]').html('售價');
    }
}

function check_cost() {
    if ($('#prd_cost').val() == "") {
        $('#prd_cost').addClass('warn');
        $('p[for="prd_cost"]').html('成本<span>*請輸入成本</span>');
    } else if ($('#prd_price').val() < $('#prd_cost').val()) {
        $('#prd_price').addClass('warn');
    } else {
        $('#prd_cost').removeClass('warn');
        $('p[for="prd_cost"]').html('成本');
    }
}

// ========================================
// 庫存、商品名稱不可空白，種類檢查
$('#prd_name').on('blur',check_name);
$('#prd_inStock').on('blur',check_inStock);
$('#prd_kind').on('change',check_kind);


function check_inStock() {
    if ($('#prd_inStock').val() == "") {
        $('#prd_inStock').addClass('warn');
        $('p[for="prd_inStock"]').html('庫存<span>*請輸入庫存數量</span>');
    } else {
        $('#prd_inStock').removeClass('warn');
        $('p[for="prd_inStock"]').html('庫存');
    }
}

function check_name() {
    if ($('#prd_name').val() == "") {
        $('#prd_name').addClass('warn');
        $('p[for="prd_name"]').html('商品名稱<span>*請輸入商品名稱</span>');
    } else {
        $('#prd_name').removeClass('warn');
        $('p[for="prd_name"]').html('商品名稱');
    }
}

function check_kind(){
    if ($('#prd_kind')[0].options.selectedIndex == 0) {
        $('#prd_kind').addClass('warn');
        $('p[for="prd_kind"]').html('商品類別<span>*請選擇商品類別</span>');
    }else{
        // console.log('nn');
        $('#prd_kind').removeClass('warn');
        $('p[for="prd_kind"]').html('商品類別');

    }
}
// 庫存、商品名稱不可空白end
// ================================================
// 商品介紹intro區塊

// 刪除區塊
$(document).on('click',(e)=>{
    if($(e.target).hasClass('bi-x')){
        console.log($(e.target).closest('li'));
        $(e.target).closest('li').remove();
    }
})

// 新增區塊
$('#add_prdIntroduce').on('click',(e)=>{
    e.preventDefault;
    if($('.prd_introduce').length == 2 || $('.prd_introduce').length < 5){
        $('#introduce_area').append(`<li class="prd_introduce">
        <div class="select_image"><span>上傳圖片</span></div>
        <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
        <i class="bi bi-x"></i>
    </li>`);
    }else{
        alert("商品介紹區塊最多只能5個");
    }
})

// =================================================
/*
// 資料格式
var product = {
    //prd_number: `${$('.prd_number')[i].innerText}`,
    prd_name: `${$('#prd_name')[i].innerText}`, // <-> "varchar"
    prd_cost: $('#prd_cost')[i].innerText,
    prd_price: $('#prd_price')[i].innerText,
    prd_inStock: $('#prd_inStock')[i].innerText,
    prd_pic: `${$('#prd_pic')[i].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
    prd_condition: `${$('#prd_condition')[i].innerText}`,
    prd_topImage: [`${$('.prd_topImage')[i].getAttribute("src")}`], // (網址) ["./img/producds/${品號}_top01"] max=4
    prd_intro: [{scr:`${$('.pd_intro_pic')[i].getAttribute("src")}`,text:`${$('.prd_introduce_input')[i].innerText}`}], //商品介紹,"varchar" [{"src","text"}]  (網址)[{"./img/producds/${品號}_01"},{}] max=5
    
    //讀出
    // var prd_intro = 
    //         `<div class="pd_intro">
    //             <div class="pd_intro_pic"><img src="`${$('.pd_intro_pic')[i].getAttribute("src")}`" alt="">
    //             </div>
    //             <p>${$('.prd_introduce_input')[i].innerText}</p>
    //         </div>`;
    
    prd_kind: `${$('#prd_kind').val()}`, //和資料庫關聯
    prd_slog: [`${$('#prd_slog1').val()}`, `${$('#prd_slog2').val()}`], //促銷標語 max=2
    prd_ingredient: `${$('#prd_ingredient').val()}`, //innerHtml 商品規格
}
*/

// 檢查必填欄位、取消按鍵
$('#submit').on('click',(e)=>{
    e.preventDefault;
    check_price();
    check_cost();
    check_inStock();
    check_name();
    check_kind()
    if($('#prd_name').val() == "" || $('#prd_cost').val() == "" || $('#prd_price').val() == "" || $('#prd_inStock').val() == "" || $('#prd_kind').val() == "n"){
        // window.location.hash = "#prd_name";
        // console.log($("#prd_name")[0].offsetTop);
        window.scrollTo(0,$("#prd_name")[0].offsetTop-100);
        alert('有欄位沒寫');
        }else{ //有資料庫時要改寫存入地點


            $('.prd_introduce').forEach(i => {
                console.log(i);
                
                var product = {
                //prd_number: `${$('.prd_number')[i].innerText}`,
                prd_name: $('#prd_name').val(), // <-> "varchar"
                prd_cost: $('#prd_cost').val(),
                prd_price: $('#prd_price').val(),
                prd_inStock: $('#prd_inStock').val(),
                prd_pic: `${$('.select_topImage1')[0].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                prd_condition: `${$('#prd_condition').val()}`,
                prd_topImage: [`${$('.select_topImage1')[0].getAttribute("src")}`], // (網址) ["./img/producds/${品號}_top01"] max=4
                prd_intro: [{scr:`${$('.pd_intro_pic')[i].closest('img').getAttribute("src")}`,text:`${$('.prd_introduce_input')[i].innerText}`}], //商品介紹,"varchar" [{"src","text"}]  (網址)[{"./img/producds/${品號}_01"},{}] max=5
                prd_kind: `${$('#prd_kind').val()}`, //和資料庫關聯
                prd_slog: [`${$('#prd_slog1').val()}`, `${$('#prd_slog2').val()}`], //促銷標語 max=2
                prd_ingredient: `${$('#prd_ingredient').val()}`, //innerHtml 商品規格
            }

            console.log(product);

            });


        }

})

// 取消
$('#cancel').on('click',(e)=>{
    e.preventDefault;
    if (confirm("確定要取消嗎？資料還沒存檔唷！")){
        location.href = "./back_products.html";
    }
})

// =================================================












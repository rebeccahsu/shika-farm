// 進入頁面是否讀資料
var editRule = /[prd_number=]\d{8}$/
document.addEventListener("DOMContentLoaded", function (e) {
    if (editRule.test(location.search)) {
        let task = JSON.parse(localStorage.getItem("prd_list"));
        let number0 = location.search.slice(12, 20);
        // console.log(number);
        // console.log(task);
        task.forEach(function (value, i) {
            if (task[i].prd_number == number0) {
                console.log(task[i]);
                let pdata = task[i];
                // 帶入資料
                showData(pdata);
                $('.back_title').find('h4').text('修改商品');
                $('.select_images').after(`<spap style="float:right">品號：${task[i].prd_number}</spap>`)
            }
        })
    }
});

function showData(pdata) {
    console.log(pdata);
    // console.log(pdata.prd_slog[0]);
    $('#prd_slog1').val(pdata.prd_slog[0]);
    $('#prd_slog2').val(pdata.prd_slog[1]);
    $('#prd_inStock').val(pdata.prd_inStock);
    $("#prd_price").val(pdata.prd_price);
    $("#prd_cost").val(pdata.prd_cost);
    $("#prd_name").val(pdata.prd_name);
    $("#prd_ingredient").val(pdata.prd_ingredient);
    putin_intro(pdata.prd_intro);
    putin_topimg(pdata.prd_topImage)
}

function putin_topimg(d) {
    console.log(d);
    let el;
    for (var i = 0; i < 4; i++) {
        console.log(i + "資料" + d[i]);
        let img_src = d[i];
        if (d[i] != undefined) {
            console.log(img_src);
            switch (i) {
                case 0:
                    el = document.querySelector('.select_topImage1');
                    el.innerHTML = `<img src="${d[0]}"/>`;
                    break;
                case 1:
                    el = document.querySelector('.select_topImage1');
                    el.innerHTML = `<img src="${d[1]}"/>`;
                    break;
                case 2:
                    el = document.querySelector('.select_topImage1');
                    el.innerHTML = `<img src="${d[2]}"/>`;
                    break;
                case 3:
                    el = document.querySelector('.select_topImage1');
                    el.innerHTML = `<img src="${d[3]}"/>`;
                    break;
                default:
                    console.log("default-topImg");
            }
        }
    }
}


function putin_intro(d) {
    console.log(d);
    let el;
    let el_img;
    let el_text;
    for (i = 0; i < 5; i++) {
        if (d[i] != null) {
            if(i>1){
                let ul_el = document.querySelector('#introduce_area');
                let li_html = `<li class="prd_introduce">
                <input type="file" name="" class="select_introPic">
                <div class="select_image"><img src"" class="preview_img"/><span>上傳圖片</span></div>
                <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
                <i class="bi bi-x"></i>
            </li>`
                ul_el.insertAdjacentHTML("beforeend",li_html);
            }
            switch (i) {
                case 0:
                    // console.log('bb');
                    el = document.querySelectorAll('.prd_introduce')[0];
                    el_img = el.querySelector(".select_image");
                    el_text = el.querySelector("textarea");
                    // console.log(el_img);
                    // console.log(el_text);
                    // console.log(d[0].text);
                    el_img.innerHTML = `<img src="${d[0].src}" class="intro_img"/><span>更換圖片</span>`;
                    el_text.innerText = d[0].text;
                    break;
                case 1:
                    el = document.querySelectorAll('.prd_introduce')[1];
                    el_img = el.querySelector(".select_image");
                    el_text = el.querySelector("textarea");
                    el_img.innerHTML = `<img src="${d[1].src}" class="intro_img"/><span>更換圖片</span>`;
                    el_text.innerText = d[1].text;
                    break;

                case 2:
                    el = document.querySelectorAll('.prd_introduce')[2];
                    el_img = el.querySelector(".select_image");
                    el_text = el.querySelector("textarea");
                    el_img.innerHTML = `<img src="${d[2].src}" class="intro_img"/><span>更換圖片</span>`;
                    el_text.innerText = d[2].text;
                    break;

                case 3:
                    el = document.querySelectorAll('.prd_introduce')[3];
                    el_img = el.querySelector(".select_image");
                    el_text = el.querySelector("textarea");
                    el_img.innerHTML = `<img src="${d[3].src}" class="intro_img"/><span>更換圖片</span>`;
                    el_text.innerText = d[3].text;
                    break;
                case 4:
                    el = document.querySelectorAll('.prd_introduce')[4];
                    el_img = el.querySelector(".select_image");
                    el_text = el.querySelector("textarea");
                    el_img.innerHTML = `<img src="${d[4].src}" class="intro_img"/><span>更換圖片</span>`;
                    el_text.innerText = d[4].text;
                    break;
                default:
                    console.log('default');

            }
        }
    }
}

// ========================================
// 提示價錢未寫、成本比售價高

$('#prd_price').on('blur', check_price);
$('#prd_cost').on('blur', check_cost);


function check_price() {
    if ($('#prd_price').val() == "") {
        $('#prd_price').addClass('warn');
        $('p[for="prd_price"]').html('售價<span>*請輸入售價</span>');
    } else if (parseInt($('#prd_price').val()) < parseInt($('#prd_cost').val())) {
        $('#prd_price').addClass('warn');
        $('p[for="prd_price"]').html('售價<span>*售價比成本低</span>');
    } else {
        $('#prd_price').removeClass('warn');
        $('p[for="prd_price"]').html('售價');
    }
}

function check_cost() {
    if ($('#prd_cost').val() == "") {
        $('#prd_cost').addClass('warn');
        $('p[for="prd_cost"]').html('成本<span>*請輸入成本</span>');
    } else if (parseInt($('#prd_price').val()) < parseInt($('#prd_cost').val())) {
        $('#prd_price').addClass('warn');
        $('p[for="prd_price"]').html('售價<span>*售價比成本低</span>');
    } else {
        $('#prd_cost').removeClass('warn');
        $('p[for="prd_cost"]').html('成本');
    }
}

// ========================================
// 庫存、商品名稱不可空白，種類檢查
$('#prd_name').on('blur', check_name);
$('#prd_inStock').on('blur', check_inStock);
$('#prd_kind').on('change', check_kind);


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

function check_kind() {
    if ($('#prd_kind')[0].options.selectedIndex == 0) {
        $('#prd_kind').addClass('warn');
        $('p[for="prd_kind"]').html('商品類別<span>*請選擇商品類別</span>');
    } else {
        // console.log('nn');
        $('#prd_kind').removeClass('warn');
        $('p[for="prd_kind"]').html('商品類別');

    }
}
// 庫存、商品名稱不可空白end
// ================================================
// 商品介紹intro區塊

//刪除區塊
$(document).on('click', (e) => {
    if ($(e.target).hasClass('bi-x')) {
        // console.log($(e.target).closest('li'));
        $(e.target).closest('li').remove();
    }
})

// 新增區塊
$('#add_prdIntroduce').on('click', (e) => {
    e.preventDefault;
    if ($('.prd_introduce').length == 2 || $('.prd_introduce').length < 5) {
        $('#introduce_area').append(`<li class="prd_introduce">
        <input type="file" name="" class="select_introPic">
        <div class="select_image"><span>上傳圖片</span></div>
        <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
        <i class="bi bi-x"></i>
    </li>`);
    } else {
        alert("商品介紹區塊最多只能5個");
    }
})

// 商品介紹intro區塊end
// =================================================

// 關閉按鈕和範圍==============

$('#back_bg').on('click', closebg)
$('.bi-x').on('click', closebg);
$('#pop_box').on('click', (e) => { e.stopPropagation(); })
$('.cancel').on('click', closebg)

function closebg(t) {
    // console.log(t);
    $('#back_bg').removeClass("-on");
}
// 關閉按鈕和範圍end==============

// 圖片上傳============================================
$('#topImages').on('click', (e) => {
    e.preventDefault;
    $('#back_bg').addClass("-on");
})

// 樣式變更
function add_shadow(el) {
    el.classList.add("y_shadow");
}
function remove_shadow(el) {
    el.classList.remove("y_shadow");
}

$('.select_topImage').on("dragover", (e) => {
    e.preventDefault;
    add_shadow(e.target);
})

$('.select_topImage').on("dragleave", (e) => {
    e.preventDefault;
    remove_shadow(e.target);
})


$('.select_topImage').on("drop", (e) => {
    e.preventDefault;
    add_shadow(e.target);
})



// 抓檔案
// 呼叫FileReader轉base64
var preview_el;
var preview_img = function (file) {

    var reader = new FileReader(); // 用來讀取檔案
    reader.readAsDataURL(file); // 讀取檔案
    reader.addEventListener("load", function () {
        //console.log(reader.result);
        let img_str = '<img src="' + reader.result + '" class="preview_img">';
        preview_el.innerHTML = img_str;
        //   console.log(img_str);
    });
};

// topImage 首圖區塊
$("#file1").on("change", (e) => {
    // console.log($("#file1")[0]);
    if ($("#file1")[0].files.length > 0) {
        preview_el = $(".select_topImage1")[0];
        preview_img($("#file1")[0].files[0]);
    } else {
        preview_el = $(".select_topImage1")[0];
        preview_el.innerHTML = '<span>請上傳圖片</span>';
    }
})

$("#file2").on("change", (e) => {
    // console.log($("#file2")[0]);
    if ($("#file2")[0].files.length > 0) {
        preview_el = $(".select_topImage2")[0];
        preview_img($("#file2")[0].files[0]);
    } else {
        preview_el = $(".select_topImage2")[0];
        preview_el.innerHTML = '<img src="./img/logo_16B1AA.svg" alt="">';
    }
})

$("#file3").on("change", (e) => {
    // console.log($("#file3")[0]);
    if ($("#file3")[0].files.length > 0) {
        preview_el = $(".select_topImage3")[0];
        preview_img($("#file3")[0].files[0]);
    } else {
        preview_el = $(".select_topImage3")[0];
        preview_el.innerHTML = '<img src="./img/logo_16B1AA.svg" alt="">';
    }
})

$("#file4").on("change", (e) => {
    // console.log($("#file4")[0]);
    if ($("#file4")[0].files.length > 0) {
        preview_el = $(".select_topImage4")[0];
        preview_img($("#file4")[0].files[0]);
    } else {
        preview_el = $(".select_topImage4")[0];
        preview_el.innerHTML = '<img src="./img/logo_16B1AA.svg" alt="">';
    }
})

$(".upload").on('click', (e) => {
    e.preventDefault();
    let img_base64 = [];
    for (let i = 0; i < $('.preview_img').length; i++) {
        let img = $('.preview_img')[i].getAttribute('src');
        if (img !== "./img/logo_16B1AA.svg" || img == null) {
            img_base64.push(img);
            //    console.log(img_base64);
            sessionStorage.setItem("top_img", JSON.stringify(img_base64));
        }
    }
    closebg();
})


// intro區塊 上傳圖片
var preview_intro = function (file) {
    var reader = new FileReader(); // 用來讀取檔案
    reader.readAsDataURL(file); // 讀取檔案
    reader.addEventListener("load", function () {
        // console.log(reader.result);
        // console.log(select_image);
        let img_str = '<img src="' + reader.result + '" class="preview_img"><span>更換圖片</span>';
        select_image.innerHTML = img_str;
    });
};

var select_image;
document.addEventListener("click", function (e) {
    if (e.target.closest(".prd_introduce")) {
        // console.log('sp1');
        let select_introPic = e.target.closest(".prd_introduce").firstElementChild;
        // console.log(select_introPic);
        let intro_img = e.target.closest(".prd_introduce").querySelector('img');
        // let intro_span = e.target.closest(".prd_introduce").querySelector('span');
        select_image = e.target.closest(".prd_introduce").querySelector('.select_image');

        // 利用泡泡機制點input
        if (e.target.classList.contains("select_image") || e.target == intro_img) {
            // console.log("img+span+div");
            select_introPic.click();
            select_introPic.addEventListener('change', () => {
                if (select_introPic.files.length > 0) {
                    preview_intro(select_introPic.files[0]);
                } else {
                    select_image.innerHTML = '<span>上傳圖片</span>';
                }
            })
        }
    }

})
// 圖片上傳end
// =================================================
/*
// 資料格式  //前台時用innerHTML
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
    
    prd_kind: `${$('#prd_kind').val()}`, //和資料庫關聯
    prd_slog: [`${$('#prd_slog1').val()}`, `${$('#prd_slog2').val()}`], //促銷標語 max=2
    prd_ingredient: `${$('#prd_ingredient').val()}`, //innerHtml 商品規格


    //前台讀出intro
    // var prd_intro = 
    //         `<div class="pd_intro">
    //             <div class="pd_intro_pic"><img src="`${$('.pd_intro_pic')[i].getAttribute("src")}`" alt="">
    //             </div>
    //             <p>${$('.prd_introduce_input')[i].innerText}</p>
    //         </div>`;
    

    // 後台讀出intro
var prd_introduce =
`<li class="prd_introduce">
        <input type="file" name="" class="select_introPic">
        <div class="select_image"><img src"" class="preview_img"/><span>選擇圖片</span></div>
        <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
        <i class="bi bi-x"></i>
    </li>`

}
*/

// 檢查必填欄位、取消按鍵
$('#submit').on('click', (e) => {
    e.preventDefault;
    check_cost();
    check_price();
    check_inStock();
    check_name();
    check_kind()
    if ($('#prd_name').val() == "" || $('#prd_cost').val() == "" || $('#prd_price').val() == "" || $('#prd_inStock').val() == "" || $('#prd_kind').val() == "n") {

        // console.log($("#prd_name")[0].offsetTop);

        window.scrollTo(0, $("#prd_name")[0].offsetTop - 100);
        alert('有欄位沒寫');
    } else { //有資料庫時要改寫存入地點
        console.log('還沒寫好');
/*
        let intro = $('.prd_introduce');
        $('.prd_introduce').each((i, v) => {
            console.log(i, v);

            var product = {
                //prd_number: `${$('.prd_number')[i].innerText}`,
                prd_name: $('#prd_name').val(), // <-> "varchar"
                prd_cost: $('#prd_cost').val(),
                prd_price: $('#prd_price').val(),
                prd_inStock: $('#prd_inStock').val(),
                prd_pic: `${$('.select_topImage1')[0].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                prd_condition: `未上架`, //新增=未上架,修改=抓值${$('#prd_condition').val()}
                prd_topImage: [`${$('.select_topImage1')[0].getAttribute("src")}`], // (網址) ["./img/producds/${品號}_top01"] max=4
                prd_intro: [{ scr: `${$('.prd_introduce')[i].querySelectorAll('img')[0].getAttribute("src")}`, text: `${$('.prd_introduce_input')[i].innerText}` }], //商品介紹,"varchar" [{"src","text"}]  (網址)[{"./img/producds/${品號}_01"},{}] max=5
                // 前台是pd_intro 後台是prd_introduce
                prd_kind: `${$('#prd_kind').val()}`, //和資料庫關聯
                prd_slog: [`${$('#prd_slog1').val()}`, `${$('#prd_slog2').val()}`], //促銷標語 max=2
                prd_ingredient: `${$('#prd_ingredient').val()}`, //innerHtml 商品規格
            }

            console.log(product);

            // location.href = "./back_products.html";
        });
        */
    }
})

// 存入前取資料



// 取消
$('#cancel').on('click', (e) => {
    e.preventDefault;
    if (confirm("確定要取消嗎？資料還沒存檔唷！")) {
        location.href = "./back_products.html";
    }
})

// =================================================











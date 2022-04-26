//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function (page) {
    if (page.innerHTML == "商品管理") {
        page.closest("a").classList.add("-on");
    }
});

// 進入頁面是否讀資料

document.addEventListener("DOMContentLoaded", function (e) {
    // console.log('aaaa');
    sessionStorage.removeItem("new_id");

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('prd_number');
    if (id != null) {
        $('.back_title').find('h4').text('修改商品');
        $("#submit").text('修改');

        fetch('./php/back_product_detail_select.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                ID: id,
            }),
        })
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp => resp.json())
            .then(body => {
                //body也不可以console
                const { successful, message, data, ID } = body;
                if (successful == true) {
                    console.log(successful + "訊息" + message + "資料" + ID + " / " + data);
                    showData(data[0]);
                    
                    $('.select_images').after(`<spap id="prd_number" style="float:right">品號：${ID}</spap>`)
                    
                } else {
                    console.log(successful + ' 訊息' + message);

                }
            })
    }else{
        check_ID();
    }
});
function showData(pdata) {

    $('#prd_slog1').val(JSON.parse(pdata.SLOGAN)[0]);
    $('#prd_slog2').val(JSON.parse(pdata.SLOGAN)[1]);
    $('#prd_inStock').val(pdata.STOCK);
    $("#prd_price").val(pdata.UNIT_PRICE);
    $("#prd_cost").val(pdata.COST);
    $("#prd_name").val(pdata.NAME);
    $("#prd_ingredient").val(pdata.DETAIL);
    $("#prd_kind").val((pdata.PRODUCT_CATEGORY_ID) == 1 ? 1 : 2);
    putin_intro(JSON.parse(pdata.DESCRIPTION));
    putin_topimg(JSON.parse(pdata.MAIN_PIC))
}

function putin_topimg(d) {
    // console.log(d);
    let el;
    for (var i = 0; i < 4; i++) {
        // console.log(i + "資料" + d[i]);
        let img_src = d[i];
        if (d[i] != undefined) {
            // console.log(img_src);
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
    // console.log(d);
    let el;
    let el_img;
    let el_text;
    for (let i = 0; i < 5; i++) {
        if (d[i] != null) {
            if (i > 1) {
                let ul_el = document.querySelector('#introduce_area');
                let li_html = `<li class="prd_introduce">
                <input type="file" name="" class="select_introPic">
                <div class="select_image"><img src"./img/products/product_default_images.jpg" class="preview_img"/><span>更換圖片</span></div>
                <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
                <i class="bi bi-x"></i>
            </li>`
                ul_el.insertAdjacentHTML("beforeend", li_html);
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
        <div class="select_image"><img src="./img/products/product_default_images.jpg" class="intro_img"/><span>上傳圖片</span></div>
        <textarea type="text" class="prd_introduce_input" row="1" cols="2" maxlength="30"></textarea>
        <i class="bi bi-x"></i>
    </li>`);
    } else {
        // alert("商品介紹區塊最多只能5個");
        sAlert("商品介紹區塊最多只能5個", "warning", "確定")
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
// function add_shadow(el) {
//     el.classList.add("y_shadow");
// }
// function remove_shadow(el) {
//     el.classList.remove("y_shadow");
// }

// $('.select_topImage').on("dragover", (e) => {
//     e.preventDefault;
//     add_shadow(e.target);
// })

// $('.select_topImage').on("dragleave", (e) => {
//     e.preventDefault;
//     remove_shadow(e.target);
// })


// $('.select_topImage').on("drop", (e) => {
//     e.preventDefault;
//     add_shadow(e.target);
// })



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
        preview_el.innerHTML = '<img src="./img/products/product_default_images.jpg" alt="">';
    }
})

$("#file2").on("change", (e) => {
    // console.log($("#file2")[0]);
    if ($("#file2")[0].files.length > 0) {
        preview_el = $(".select_topImage2")[0];
        preview_img($("#file2")[0].files[0]);
    } else {
        preview_el = $(".select_topImage2")[0];
        preview_el.innerHTML = '<img src="./img/products/product_default_images.jpg" alt="">';
    }
})

$("#file3").on("change", (e) => {
    // console.log($("#file3")[0]);
    if ($("#file3")[0].files.length > 0) {
        preview_el = $(".select_topImage3")[0];
        preview_img($("#file3")[0].files[0]);
    } else {
        preview_el = $(".select_topImage3")[0];
        preview_el.innerHTML = '<img src="./img/products/product_default_images.jpg" alt="">';
    }
})

$("#file4").on("change", (e) => {
    // console.log($("#file4")[0]);
    if ($("#file4")[0].files.length > 0) {
        preview_el = $(".select_topImage4")[0];
        preview_img($("#file4")[0].files[0]);
    } else {
        preview_el = $(".select_topImage4")[0];
        preview_el.innerHTML = '<img src="./img/products/product_default_images.jpg" alt="">';
    }
})

$("#top_upload").on('click', (e) => {
    e.preventDefault();
    if(!sessionStorage.getItem("new_id")){
        check_ID();
    }
    let topImg = document.querySelector("#pop_box");
        topImg = topImg.querySelectorAll("input");
    let pre_top = document.querySelectorAll(".select_topImage")
    let prd_number = document.querySelector("#prd_number");
    if(prd_number){
        upload_img(topImg, pre_top, 1);
    }else{
        new_upload_img(topImg, pre_top, 1);
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
                    upload_intro_img(select_introPic, select_image);


                } else {
                    select_image.innerHTML = '<img src="./img/products/product_default_images.jpg" class="preview_img"><span>上傳圖片</span>';
                }
            })
        }
    }

})
// 圖片上傳end
// =================================================


// 檢查必填欄位、取消按鍵
$('#submit').on('click', (e) => {
    e.preventDefault;
    check_cost();
    check_price();
    check_inStock();
    check_name();
    check_kind();
    if ($('#prd_name').val() == "" || $('#prd_cost').val() == "" || $('#prd_price').val() == "" || $('#prd_inStock').val() == "" || $('#prd_kind').val() == "n") {

        // console.log($("#prd_name")[0].offsetTop);

        window.scrollTo(0, $("#prd_name")[0].offsetTop - 100);
        // alert('有欄位沒寫');
        sAlert('有欄位沒寫', "warning", "確定")
        
    } else { //有資料庫時要改寫存入地點
        // 取ID
        let urlParams = new URLSearchParams(window.location.search);
        let prd_number = urlParams.get('prd_number');
        // 抓資料
        let topImg = document.querySelector("#pop_box");
        topImg = topImg.querySelectorAll("input");
        let pre_top = document.querySelectorAll(".select_topImage");

        let name = document.querySelector("#prd_name").value;
        let cost = document.querySelector("#prd_cost").value;
        let price = document.querySelector("#prd_price").value;
        let stock = document.querySelector("#prd_inStock").value;
        let kind = document.querySelector("#prd_kind").value == 1 ? 1 : 2;
        let slogan = `["${document.querySelector("#prd_slog1").value}", "${document.querySelector("#prd_slog2").value}"]`;
        let detail = document.querySelector("#prd_ingredient").value;
        let prd_introduce_el = document.querySelector("#introduce_area");
        let intro_input = prd_introduce_el.querySelectorAll("input");
        let pre_intro = prd_introduce_el.querySelectorAll(".select_image");

// 判斷ID是否存在   存在=>修改商品；不存在=>新增商品=========================
        if (prd_number != null) {
            
            upload_img(intro_input, pre_intro, 2);
            let topImg_src = [];
            for (let i = 0; i < 3; i++) {
                // 不是預設圖片時，存入網址
                if (pre_top[i].querySelector("img").getAttribute("src") != './img/products/product_default_images.jpg') {
                    topImg_src.push(pre_top[i].querySelector("img").getAttribute("src"))
                }
            }

            // intro區塊，此區塊不判斷預設圖片
            let intro_arr = [];
            let intro = document.querySelectorAll(".prd_introduce");
            for (let i = 0; i < intro.length; i++) {
                intro_arr.push({ "src": pre_intro[i].querySelector("img").getAttribute("src"), "text": intro[i].querySelector("textarea").value });
            }

            //轉換存入格式
            topImg_src = `["${topImg_src.join('","')}"]`;
            // console.log(topImg_src);
            // console.log(slogan);

            fetch('./php/back_product_detail_update.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                // 送出內容轉成JSON送出
                body: JSON.stringify({
                    ID: prd_number,
                    topImg: topImg_src,
                    NAME: name,
                    COST: cost,
                    PRICE: price,
                    STOCK: stock,
                    KIND: kind,
                    SLOGAN: slogan,
                    DETAIL: detail,
                    INTRO: intro_arr,
                }),

            })
                // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
                .then(resp => resp.json())
                .then(body => {
                    //body也不可以console
                    const { successful, message, ID } = body;
                    if (successful == true) {
                        // console.log(successful + ' / ' + message + ' / ' + ID);
                        // alert("修改成功！")
                        Swal.fire({
                            title: `<h5>修改成功！</h5>`,
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: '確定',
                            // cancelButtonText: '取消',
                            showCancelButton: false, // 取消按鈕
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn-green marginright_20',
                                cancelButton: 'btn-red'
                            },
                        }).then(function(res) {
                           if (res.value) {
        
                               // 使用者按確認之後要做的事寫在這裡
                               //可以搭配alert使用
                          
                           }else{
                                  // 使用者按取消之後要做的事寫在這裡
                           };
                        });

                        location.href = "./back_products.html";
                    } else {
                        console.log(successful + ' / ' + message);
                    }
                })
        } else {
// 新增商品===========================================================
            // new_upload_img(intro_input, pre_intro, 2);
            let topImg_src = [];
            for (let i = 0; i < 3; i++) {
                // 不是預設圖片時，存入網址
                if (pre_top[i].querySelector("img").getAttribute("src") != './img/products/product_default_images.jpg') {
                    topImg_src.push(pre_top[i].querySelector("img").getAttribute("src"))
                }
            }

            // intro區塊，此區塊不判斷預設圖片
            let intro_arr = [];
            let intro = document.querySelectorAll(".prd_introduce");
            for (let i = 0; i < intro.length; i++) {
                intro_arr.push({ "src": pre_intro[i].querySelector("img").getAttribute("src"), "text": intro[i].querySelector("textarea").value });
            }

            //轉換存入格式
            topImg_src = `["${topImg_src.join('","')}"]`;


            // 檢查格式
            let bb = {
                    topImg: topImg_src,
                    NAME: name,
                    COST: cost,
                    PRICE: price,
                    STOCK: stock,
                    KIND: kind,
                    SLOGAN: slogan,
                    DETAIL: detail,
                    INTRO: intro_arr,
            };
            console.log(bb);

            // ajax 
            fetch('./php/back_product_detail_insert.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    topImg: topImg_src,
                    NAME: name,
                    COST: cost,
                    PRICE: price,
                    STOCK: stock,
                    KIND: kind,
                    SLOGAN: slogan,
                    DETAIL: detail,
                    INTRO: intro_arr,
                }),
            })
                // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
                .then(resp => resp.json())
                .then(body => {
                    //body也不可以console
                    const { successful, message, ID } = body;
                    if (successful) {
                        console.log(successful + ' / ' + message + ' / ' + ID);
                        // alert("新增成功！")
                        Swal.fire({
                            title: `<h5>新增成功！</h5>`,
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: '確定',
                            // cancelButtonText: '取消',
                            showCancelButton: false, // 取消按鈕
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn-green marginright_20',
                                cancelButton: 'btn-red'
                            },
                        }).then(function() {
                               location.href = "./back_products.html";
                        });
                    } else {
                        console.log(successful + ' / ' + message);
                    }
                })
        }

    }
})

function upload_img(input_el, img_el, nb) {
    let urlParams = new URLSearchParams(window.location.search);
    let ID = urlParams.get('prd_number');
    // 將單一個input的檔案做成formData送出
    var formm = new FormData();
    for (let i = 0; i < input_el.length; i++) {
        if(input_el[i].files[0] != undefined){
            // console.log(input_el[i].files[0]);
            formm.append('file[]', input_el[i].files[0]);
        }
    }
    // console.log(formm);

    // 放入ID資料
        formm.append('ID', ID);
        // fetchAPI
        fetch('./php/back_product_detail_upload.php', {
            method: 'POST',
            body: formm,
        })
            .then(resp => resp.json())
            .then(body => {
        // console.log(nb);

        // 找出對應的pre_img區塊
        let change_img_arr = [];
        for (let i = 0; i < input_el.length; i++){
            if(input_el[i].files[0] != undefined){
                change_img_arr.push(img_el[i]);
            }
        }
                //nb：1是首圖區塊top_img；2是intro配圖的區塊 
                if (nb == 1) {
                    for (let j = 0; j < change_img_arr.length; j++) {
                        if(body[j] != undefined){
                            // console.log(body[j]);
                            change_img_arr[j].innerHTML = `<img src="${body[j]}">`;

                        }
                    }

                } else if (nb == 2) {
                    for (let j = 0; j < change_img_arr.length; j++) {
                        if(body[j] != undefined){
                        // console.log(body[j]);
                        change_img_arr[j].innerHTML = `<img src="${body[j]}"><span>更換圖片</span>`;
                        }
                    }
                }
        })
    
}

function new_upload_img(input_el, img_el, nb) {
    
    // 取出新品號
    let newID = JSON.parse(sessionStorage.getItem("new_id"));
    var formm = new FormData();
    for (let i = 0; i < input_el.length; i++) {
        formm.append('file[]', input_el[i].files[0]);
    }
    formm.append('ID', newID);
    // fetchAPI
    fetch('./php/back_product_detail_upload.php', {
        method: 'POST',
        body: formm,
    })
        .then(resp => resp.json())
        .then(body => {
    // console.log(nb);

    // 找出對應區塊
    let change_img_arr = [];
    for (let i = 0; i < input_el.length; i++){
        if(input_el[i].files[0] != undefined){
            change_img_arr.push(img_el[i]);
        }
    }
    //nb：1是首圖區塊top_img；2是intro配圖的區塊
            if (nb == 1) {
                for (let j = 0; j < change_img_arr.length; j++) {
                    if(body[j] != undefined){
                        console.log(1+" / "+body[j]);
                        change_img_arr[j].innerHTML = `<img src="${body[j]}">`;
                    }
                }

            } else if (nb == 2) {
                for (let j = 0; j < change_img_arr.length; j++) {
                    if(body[j] != undefined){
                    console.log(2+" / "+body[j]);
                    change_img_arr[j].innerHTML = `<img src="${body[j]}"><span>更換圖片</span>`;
                    }
                }
            }
    })
}

// 檢查品號
function check_ID() {
    // fetchAPI
    fetch('./php/back_product_detail_new.php', {
        method: 'POST',
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful, ID } = body;
            // console.log(successful + ' / ' + ID);
            sessionStorage.setItem("new_id", ID);
        })
}

function upload_intro_img(input_el, pre_img) {
    let urlParams = new URLSearchParams(window.location.search);
    let ID = urlParams.get('prd_number');
    if (!ID) {
        // 取出新品號
        ID = JSON.parse(sessionStorage.getItem("new_id"));
    }
    var formm = new FormData();
    formm.append('file', input_el.files[0]);
    formm.append('ID', ID);
    // fetchAPI
    fetch('./php/back_product_detail_introImg_upload.php', {
        method: 'POST',
        body: formm,
    })
        .then(resp => resp.json())
        .then(body => {
            const { succ, img_url } = body;
            // console.log(succ+" / "+img_url);
            pre_img.innerHTML=`<img src="${img_url}" class="preview_img"><span>上傳圖片</span>`;
            // console.log(pre_img);

        })
}
    

// 取消
$('#cancel').on('click', (e) => {
    e.preventDefault;
    if (confirm("確定要取消嗎？資料還沒存檔唷！")) {
        location.href = "./back_products.html";
    }
})

// =================================================

// sweetAlert 套件
function sAlert(msg, icon, btn) {
    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: true, // 確認按鈕（預設會顯示不用設定)
        confirmButtonText: btn, //　按鈕顯示文字
        confirmButtonAriaLabel: btn, // 網頁無障礙用
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕
        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
        customClass: {
            confirmButton: 'btn-green margintop_15 marginleft_2 marginright_2',
            cancelButton: 'btn-red margintop_15 marginleft_2 marginright_2'
        },
    })
}

// ===================================================









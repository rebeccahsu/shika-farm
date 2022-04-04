// 取得資料
/* //資料格式
var product = {
    prd_number:number,
    prd_name:"string", // <-> "varchar"
    prd_cost:number,
    prd_price:number,
    prd_inStock:number,
    prd_pic:"string", //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
    prd_condition:"string", //商品狀態 上架中、下架中
    
    // 詳細頁使用-----------------------
    prd_topImage:[array "string"], // (網址) ["./img/producds/${品號}_top01"] max=4
    prd_intro:[array {object}], //商品介紹,"varchar" [{"src","text"}]  (網址)[{"./img/producds/${品號}_01"},{}] max=5
    prd_kind:"number?", //和資料庫關聯
    prd_slog:["string","string"], //促銷標語 max=2
    prd_ingredient:"string", //innerHtml
}
*/
// 還沒有DB，先用LS

// 沒有DB，檢查LC資料
$(function () {
    // console.log('object');
    if (localStorage.prd_list == undefined) {
        let task = [];
        // localStorage.prd_list = '[]';
        for (let i = 0; i < $('.list_item').length; i++) {
            var product = {
                prd_number: `${$('.prd_number')[i].innerText}`,
                prd_name: `${$('.prd_name')[i].innerText}`, // <-> "varchar"
                prd_cost: $('.prd_cost')[i].innerText,
                prd_price: $('.prd_price')[i].innerText,
                prd_inStock: $('.prd_inStock')[i].innerText,
                prd_pic: `${$('.prd_pic')[i].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                prd_condition: `${$('.prd_condition')[i].innerText}`,
            }

            // console.log(product);

            task.push(product);
            $('li[class$="-off"]').fadeOut()
        }
        localStorage.setItem('prd_list', JSON.stringify(task));
    } else {

        // 印出資料，之後串聯DB要從這改寫
        $('.list_item').remove();
        var prd_list = JSON.parse(localStorage.getItem("prd_list"));

        for (let i = 0; i < prd_list.length; i++) {

            // 判斷狀態，寫入class
            var condition = "";
            var inner_style = ""

            if (prd_list[i].prd_condition == '上架中') {
                condition = "on";
                inner_style = '';
                // console.log('list on');
            } else {
                condition = "off";
                inner_style = 'style="display:none;opacity:1;"'
                // console.log('list off');

            };
            var list_html = `<li data-prd_number="${prd_list[i].prd_number}" data-prd_name="${prd_list[i].prd_name}" data-prd_condition="${condition}" class="list_item -${condition}" ${inner_style}>
            <label class="check_container">
            <input type="checkbox"  class="select_item">
            <span class="checkmark"></span>
            </label>
            <img src="${prd_list[i].prd_pic}" alt="" class="prd_pic">
            <p class="prd_number">${prd_list[i].prd_number}</p>
            <p class="prd_name">${prd_list[i].prd_name}</p>
            <p class="prd_cost">${prd_list[i].prd_cost}</p>
            <p class="prd_price">${prd_list[i].prd_price}</p>
            <p class="prd_inStock">${prd_list[i].prd_inStock}</p>
            <p class="prd_condition">${prd_list[i].prd_condition}</p>
            <button type="button" class="btn-green prd_edit">修改</button>
            </li>`;

            $("#pds_list").append(list_html);
            $('li[class$="-off"]').fadeOut();
        }

    }
});


// 顯示未上架==========================================
$('#show_off').on('click', (e) => {
    for (let i = 0; i < $('.list_item').length; i++) {
        if (e.target.checked == false) {
            // 隱藏未上架
            if ($('.list_item')[i].getAttribute("data-prd_condition") == 'off') {
                $('.list_item')[i].setAttribute("style", "display:none;");
                // console.log(e.target.checked);
            }
        } else {
            // 顯示未上架
            if ($('.list_item')[i].getAttribute("data-prd_condition") == 'off') {
                $('.list_item')[i].removeAttribute("style");
                // console.log(e.target.checked);
                // console.log($('.list_item'));
            }
        }
    }
})

// 顯示未上架end==========================================
// 刪除按鈕===============================

$(function () {
    $('#del_pd').on('click', () => {
        // console.log($(".list_item"));
        if (confirm("確定要刪除資料嗎？")) {
            for (var i = 0; i < $('.select_item').length; i++) {
                if ($(".select_item")[i].checked == true) {
                    switch ($('.list_item')[i].getAttribute("data-prd_condition")) {
                        case "on":
                            alert("上架中的商品不能刪除");
                            break;

                        case "off":
                            console.log($(".select_item")[i].checked);
                            $('.list_item')[i].remove();
                            break;
                        default:
                            console.log("default");
                    }
                }
            }

        } else {
            console.log('取消刪除');
        }


    })
})

// 刪除按鈕 end===============================
// 修改上下架=========================

$("#on_pd").on('click', () => {

    for (var i = 0; i < $('.select_item').length; i++) {
        if ($(".select_item")[i].checked == true) {
            // console.log($('.select_item')[i]);
            $('.list_item')[i].setAttribute('data-prd_condition', 'on');
            $('.list_item')[i].setAttribute('class', 'list_item -on');
            $('.prd_condition')[i].innerText = '上架中';
            let item_nub = $('.list_item')[i].getAttribute("data-prd_number");
            // console.log(item_nub);
            let task = JSON.parse(localStorage.getItem('prd_list'))
            console.log(task);
            // 對筆資料，並更新值
            task.forEach(function (value, a) {
                if (item_nub == task[a].prd_number) {
                    console.log(task[a].prd_number);
                    task[a].prd_condition = "上架中";
                }
            })
            localStorage.setItem("prd_list", JSON.stringify(task));

        }

    }
})


$("#off_pd").on('click', () => {
    if (confirm("確定要下架商品嗎？")) {
        for (var i = 0; i < $('.select_item').length; i++) {
            if ($(".select_item")[i].checked == true) {
                // console.log($('.select_item')[i]);
                $('.list_item')[i].setAttribute('data-prd_condition', 'off');
                $('.list_item')[i].setAttribute('class', 'list_item -off');
                $('.prd_condition')[i].innerText = '未上架';
                let item_nub = $('.list_item')[i].getAttribute("data-prd_number");
                // console.log(item_nub);
                let task = JSON.parse(localStorage.getItem('prd_list'))
                console.log(task);
                // 對筆資料，並更新值
                task.forEach(function (value, a) {
                    if (item_nub == task[a].prd_number) {
                        console.log(task[a].prd_number);
                        task[a].prd_condition = "未上架";
                    }
                })
                localStorage.setItem("prd_list", JSON.stringify(task));

            }

        }
        alert('商品已完成下架');
    }
})


// 修改上下架end
// ==================================
// 商品搜尋

$('#search_pd').on('click',()=>{
    let search_target = $('#search').val();
    console.log(search_target);
    let list_item_el = $('.list_item');
    $('.list_item').each((index,value)=>{
        console.log('33333');
        if(value.getAttribute('data-prd_number').search(search_target) == -1 & value.getAttribute('data-prd_name').search(search_target) == -1){
            console.log(value);
            value.setAttribute("style", "display:none;");
        }else if (search_target ==""){
            if($('#show_off').has('checked') && value.getAttribute('data-prd_condition').search('on') >0){
                console.log('X');
                value.removeAttribute("style");
            }else if($('#show_off').has('checked') ){
                    console.log('v');
                    value.removeAttribute("style");
            }
        }

    })

})

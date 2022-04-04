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
    prd_intro:[array {object}], //商品介紹,"varchar" [{"src","text"}]
    prd_kind:"number?", //和資料庫關聯
    prd_slog1:"string", //促銷標語
    prd_slog2:"string",
    prd_ingredient:"string", //innerHtml
}
*/
// 還沒有DB，先用LS

// 沒有DB，檢查LC資料
$(function () {
    console.log('object');
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

            console.log(product);

            task.push(product);
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
                inner_style = "";
                // console.log('list on');
            } else {
                condition = "off";
                inner_style = 'style="display:none;"'
                // console.log('list off');

            };
            var list_html = `<li data-prd_number="${prd_list[i].prd_number}" data-prd_name="${prd_list[i].prd_name}" data-prd_condition="${condition}" class="list_item -${condition}" ${inner_style}>
            <label class="check_container">
            <input type="checkbox">
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
        }

    }
});


// 顯示未上架
$('#show_off').on('click', (e) => {
    for (let i = 0; i < $('.list_item').length; i++) {
        if (e.target.checked == false) {
            // 隱藏未上架
            if ($('.list_item')[i].getAttribute("data-prd_condition") == 'off') {
                $('.list_item')[i].setAttribute("style", "display:none;");
                console.log(e.target.checked);
            }
        } else {
            // 顯示未上架
            if ($('.list_item')[i].getAttribute("data-prd_condition") == 'off') {
                $('.list_item')[i].removeAttribute("style");
                console.log(e.target.checked);
                console.log($('.list_item'));
            }
        }
    }
})


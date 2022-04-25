$(function () {
    //目前頁面
    let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
    pages.forEach(function(page){
        if ( page.innerHTML == "最新消息管理"){
            page.closest("a").classList.add("-on");
        }
    });
})

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
                        confirmButton: 'btn-yellow margintop_15 marginleft_2 marginright_2',
                        cancelButton: 'btn-red margintop_15 marginleft_2 marginright_2'
                    },
    })
}

// 刪除按鈕

// $(function () {
//     $('#remove_news').on('click', (e) => {
//         e.preventDefault;
//         // console.log($(".list_item"));
//         if (confirm("確定要刪除資料嗎？")) {

//             for (let i = 0; i < $('input[type="checkbox"]').length; i++) {
//                 // console.log($('input[type="checkbox"]')[i].checked);
//                 if ($('input[type="checkbox"]')[i].checked) {
//                     let li_el = $('input[type="checkbox"]')[i].closest(".list_in");
//                     li_el.remove();
//                 }
//             }
//             // 更新SS
//             let news_list = $('.list_in');
//             let task = [];
//             $(news_list).each((i, v) => {
//                 // console.log(i);
//                 // console.log(v);
//                 var news_artc = {
//                     news_number: `${i + 1}`,
//                     news_title: `${$('.list_in')[i].querySelectorAll('p')[0].innerText}`, // <-> "varchar"
//                     news_img: `${$('.list_in')[i].querySelectorAll('img')[0].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
//                     news_time: `${$('.list_in')[i].querySelectorAll('p')[1].innerText}`,
//                     news_text: "糖、香料、美好的事物和小女孩",
//                 }

//                 task.push(news_artc);
//             })
//             sessionStorage.setItem('news_list', JSON.stringify(task));

//         } else {
//             console.log('取消刪除');
//         }
//     })
// })


// 排序
$('.select_right').on('change', function (e) {
    let task = JSON.parse(sessionStorage.getItem('news_list'));
    let ul_el = document.querySelector('.list');
    let li_el = document.querySelectorAll('.list_in');
    switch ($('.select_right')[0].value) {
        case '最新消息':
            task.sort(function (a, b) {
                return -(a.news_number - b.news_number);
            })
            li_el.forEach((v, i) => { v.remove() });
            task.forEach((v, i) => {
                let li_html =
                    `<li class="list_in" data-news_number="${task[i].news_number}">
                    <label class="check_container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    </label>
                <img src="${task[i].news_img}" alt="">
                <p>${task[i].news_title}</p>
                <p>${task[i].news_time}</p>
                <button>編輯</button>
                </li>`
                // console.log(v);
                // console.log(i);
                ul_el.insertAdjacentHTML("beforeend", li_html);
            })
            break;
        case '活動消息':
            task.sort(function (a, b) {
                return (a.news_number - b.news_number);
            })
            li_el.forEach((v, i) => { v.remove() });
            task.forEach((v, i) => {
                let li_html =
                    `<li class="list_in" data-news_number="${task[i].news_number}">
                    <label class="check_container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    </label>
                <img src="${task[i].news_img}" alt="">
                <p>${task[i].news_title}</p>
                <p>${task[i].news_time}</p>
                <button>編輯</button>
                </li>`
                // console.log(v);
                // console.log(i);
                ul_el.insertAdjacentHTML("beforeend", li_html);
            })
            break;
        default:
            console.log('沒有資料庫');
    }

})


// 搜尋

$('.select_left').on('keydown', (e) => {
    if(e.which == 13){
        console.log(13);
    
    let search_target = $('.select_left').val();
    console.log(search_target);
    let list_item_el = $('.list_in');
    $('.list_in').each((index, value) => {
        console.log(value);
        if (value.querySelectorAll('p')[0].innerText.search(search_target) == -1) {
            console.log(value);
            value.setAttribute("style", "display:none;");
        }
        else if (search_target == "") {
            value.removeAttribute("style");
            
        }if (value.querySelectorAll('p')[0].innerText.search(search_target) > 0) {
                console.log('X');
                value.removeAttribute("style");
            }
    })
}
})


// 搜尋end

new Vue({
    el: '#back-news',
    data: {
        list: [],
    },
    created() {
        fetch('./php/back_news_select.php')
        .then(res => res.json())
        .then(res => this.list = res)
    },
    methods: {
        edit(e){
            let target_id = $(e.target).closest('li').data('id');
            location.href = `./back_news_detail.html?news_id=${target_id}`;
        },

        deleteNews(){
            let checkbox = document.querySelectorAll(".check-news");
            let checked_arr  = [];
            checkbox.forEach(function(box){
                if (box.checked){
                    let del_li = box.closest(".list_in");
                    checked_arr.push(del_li);
                }
            });

            // 判斷是否有勾選的項目
            if ( checked_arr.length > 0 ){
                    Swal.fire({
                        title: `<h5>您確定要刪除這 ${checked_arr.length} 個最新消息嗎？</h5>`,
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: '送出',
                        cancelButtonText: '取消',
                        customClass: {
                            confirmButton: 'btn-green marginright_20',
                            cancelButton: 'btn-red'
                        },      
                    })
                    .then((result) => {
                        if (result.value) {
                            checked_arr.forEach(function(li){
                                let id = $(li).data('id');
                                fetch('./php/back_news_delete.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        ID: id,
                                    }),
                                })
                                .then(res =>  res.json())   
                                .then(res => {
                                    if (res.successful) {
                                        $(li).addClass("fade_out");
                                        setTimeout(function(){
                                            li.remove();
                                        }, 1000);
                                        console.log(res);
                                        sAlert(`<h5>已成功刪除 ${checked_arr.length} 個最新消息！</h5>`, 'success', 'OK');
                                        $(li).find('.check-news').checked = false;
                                    } else {
                                        sAlert(`<h5>刪除失敗，請稍後再試</h5>`, 'error', 'OK');
                                    }
                                });
                            });
                        }
                    });
            }else{
                sAlert(`<h5>您尚未勾選任何最新消息</h5>`, 'warning', 'OK');
            }
        },

        searchNews(e) {
            let target = $(e.target).val();
            // console.log(target);
            $(".news-li").each(function() {
                // console.log(this);
                $(this).toggle($(this).text().indexOf(target) > -1);
            });
        },
    },
})
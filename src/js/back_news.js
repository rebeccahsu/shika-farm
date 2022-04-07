// 讀入資料
// 沒有DB，檢查LC資料

$(function () {
    // console.log('object');
    if (sessionStorage.news_list == undefined) {
        let task = [];
        // localStorage.prd_list = '[]';
        for (let i = 0; i < $('.list_in').length; i++) {
            var news_artc = {
                news_number: `${i + 1}`,
                news_title: `${$('.list_in')[i].querySelectorAll('p')[0].innerText}`, // <-> "varchar"
                news_img: `${$('.list_in')[i].querySelectorAll('img')[0].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                news_time: `${$('.list_in')[i].querySelectorAll('p')[1].innerText}`,
                news_text: "糖、香料、美好的事物和小女孩",
            }
            // console.log(news_artc);
            task.push(news_artc);
        }
        sessionStorage.setItem('news_list', JSON.stringify(task));
    }
    else {
        let task = JSON.parse(sessionStorage.getItem('news_list'));
        let ul_el = document.querySelector('.list');
        let li_el = document.querySelectorAll('.list_in');

            // 箭頭函式 = function(){}
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
            <button><a href="./back_additem.html">編輯</a></button>
            </li>`
            // console.log(v);
            // console.log(i);
            ul_el.insertAdjacentHTML("beforeend",li_html);
        })
        // console.log(task);
    }
})



// 刪除按鈕

$(function () {
    $('#remove_news').on('click', (e) => {
        e.preventDefault;
        // console.log($(".list_item"));
        if (confirm("確定要刪除資料嗎？")) {

            for (let i = 0; i < $('input[type="checkbox"]').length; i++) {
                // console.log($('input[type="checkbox"]')[i].checked);
                if ($('input[type="checkbox"]')[i].checked) {
                    let li_el = $('input[type="checkbox"]')[i].closest(".list_in");
                    li_el.remove();
                }
            }
            // 更新SS
            let news_list = $('.list_in');
            let task = [];
            $(news_list).each((i, v) => {
                console.log(i);
                console.log(v);
                var news_artc = {
                    news_number: `${i + 1}`,
                    news_title: `${$('.list_in')[i].querySelectorAll('p')[0].innerText}`, // <-> "varchar"
                    news_img: `${$('.list_in')[i].querySelectorAll('img')[0].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                    news_time: `${$('.list_in')[i].querySelectorAll('p')[1].innerText}`,
                    news_text: "糖、香料、美好的事物和小女孩",
                }

                task.push(news_artc);
            })
            sessionStorage.setItem('news_list', JSON.stringify(task));

        } else {
            console.log('取消刪除');
        }
    })
})


// 編輯按鈕
 $('.list_in').find('button').on('click',(e)=>{
    e.preventDefault;
    
    let target_li = $(e.target).closest('li').data('news_number');
    console.log(target_li);
    // location.href = `./back_product_detail.html?news_number=${target_prd}`;
})
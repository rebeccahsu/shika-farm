// 讀入資料
// 沒有DB，檢查LC資料

$(function () {
    // console.log('object');
    if (sessionStorage.news_list == undefined) {
        let task = [];
        // localStorage.prd_list = '[]';
        for (let i = 0; i < $('.list_in').length; i++) {
            var news_artc = {
                news_number: `${i}`,
                news_title: `${$('.list_in')[i].querySelectorAll('p')[0].innerText}`, // <-> "varchar"
                // news_cost: $('.news_cost')[i].innerText,
                // news_price: $('.news_price')[i].innerText,
                // news_inStock: $('.news_inStock')[i].innerText,
                // news_pic: `${$('.news_pic')[i].getAttribute("src")}`, //(主圖網址) "./img/producds/${品號}_top01"  <-> "varchar"
                // news_ingredient: "糖、香料、美好的事物和小女孩", //innerHtml 商品規格
            }

            console.log(news_artc);

            task.push(news_artc);
            
        }
        // localStorage.setItem('prd_list', JSON.stringify(task));
     }
    // else{
    //     let task = JSON.parse(sessionStorage.getItem('news_list'));
    //     console.log(task);
    })



// 刪除按鈕

$(function () {
    $('#remove_news').on('click', (e) => {
        e.preventDefault;
        // console.log($(".list_item"));
        if (confirm("確定要刪除資料嗎？")) {

            for(let i=0; i<$('input[type="checkbox"]').length;i++){
                // console.log($('input[type="checkbox"]')[i].checked);
                if($('input[type="checkbox"]')[i].checked){
                    let li_el = $('input[type="checkbox"]')[i].closest(".list_in");
                    li_el.remove();
                }
            }
 }else{
                console.log('取消刪除');

        }
    })
})
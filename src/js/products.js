// 頁面讀入=======================================================
var main_down = document.querySelector(".main_down");

document.addEventListener("DOMContentLoaded",function(){
    // AJAX
	fetch('./php/productsList_load.php', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		// 送出內容轉成JSON送出
		// body: JSON.stringify({
		// 	ID: id,
		// }),
	})
		// 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
		.then(resp => resp.json())
		.then(body => {
			//body也不可以console
			const { successful, message, data } = body;
			if (successful) {
                
                for(let i=0; i<data.length; i++){
                    let t_name=data[i].NAME;
                    if((data[i].NAME.length) > 7){
                         t_name = t_name.slice(0,7)+"…";
                    }
                    let main_pic = JSON.parse(data[i].MAIN_PIC);
                    let prd_card = `
                    <a data-id="${data[i].ID}" data-price="${data[i].UNIT_PRICE}" href="./product_detail.html?prd_number=${data[i].ID}" title="${data[i].NAME}">
                    <div class="down-in">
                        <img src="${main_pic[0]}" alt="">
                        <h5>${t_name}</h5>
                        <h5 class="price">${data[i].UNIT_PRICE}</h5>
                    </div>
                    </a>`;
                    
                    main_down.insertAdjacentHTML("beforeend",prd_card);

                }
            }else{
                main_down.innerHTML=`<h3 style="height:200px;text-align: center;display: flex;align-items: center;flex-direction:column-reverse;">sorry！好像有點怪怪的！</h3>`;
            }
        })
})


// 點選分類=========================================================
var list_tag = document.querySelector(".main_top");
var list_all = list_tag.querySelectorAll("a")[0];
var list_cold = list_tag.querySelectorAll("a")[1];
var list_normal = list_tag.querySelectorAll("a")[2];


list_all.addEventListener("click",function(e){
    e.preventDefault();
    tag_for_kind('%');
    list_cold.classList.remove("here");
    list_normal.classList.remove("here");
    list_all.classList.add("here");
});

list_cold.addEventListener("click",function(e){
    e.preventDefault();
    tag_for_kind(1);
    list_all.classList.remove("here");
    list_normal.classList.remove("here");
    list_cold.classList.add("here");
});

list_normal.addEventListener("click",function(e){
    e.preventDefault();
    tag_for_kind(2);
    list_all.classList.remove("here");
    list_cold.classList.remove("here");
    list_normal.classList.add("here");
});


// 照排序印出商品
function tag_for_kind(kind_id){

    let price_sort = document.querySelector(".price_sort").value;

    if(price_sort == "high"){  price_sort = "DESC";
    }else if(price_sort == "low"){  price_sort = "ASC";  }

    // AJAX
	fetch('./php/products_sort.php', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		// 送出內容轉成JSON送出
		body: JSON.stringify({
			KIND: kind_id,
            order:price_sort,
		}),
	})
		// 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
		.then(resp => resp.json())
		.then(body => {
			//body也不可以console
			const { successful, message, data } = body;
			if (successful) {
                main_down.innerHTML="";

                for(let i=0; i<data.length; i++){
                    let t_name=data[i].NAME;
                    if((data[i].NAME.length) > 7){
                         t_name = t_name.slice(0,7)+"…";
                    }
                    let main_pic = JSON.parse(data[i].MAIN_PIC);
                    let prd_card = `
                    <a data-id="${data[i].ID}" data-price="${data[i].UNIT_PRICE}" href="./product_detail.html?prd_number=${data[i].ID}" title="${data[i].NAME}">
                    <div class="down-in">
                        <img src="${main_pic[0]}" alt="">
                        <h5>${t_name}</h5>
                        <h5 class="price">${data[i].UNIT_PRICE}</h5>
                    </div>
                    </a>`;
                    
                    main_down.insertAdjacentHTML("beforeend",prd_card);

                }
            }else{
                main_down.innerHTML=`<h3 style="height:200px;text-align: center;display: flex;align-items: center;flex-direction:column-reverse;">sorry！好像有點怪怪的！</h3>`;
            }
    })
}

// 排序變更=========================================================

var price_sort_el = document.querySelector(".price_sort");

price_sort_el.addEventListener("change", function(){
    // console.log('object');
    let prd_card = main_down.querySelectorAll("a");
    let task = [];

    for(let i=0; i<prd_card.length; i++){
        let img_src = prd_card[i].querySelector("img").getAttribute("src");
        let prd_name = prd_card[i].querySelector("h5").innerText;
        let obj={
            link:prd_card[i].getAttribute("href"),
            id:prd_card[i].getAttribute("data-id"),
            price:prd_card[i].getAttribute("data-price"),
            name:prd_name,
            img:img_src,
            title:prd_card[i].getAttribute("title"),
        }
        task.push(obj);
    }

    if(price_sort_el.value ==""){
        task.sort((a,b)=>{
            return -(a.id - b.id);
        })

    }else if(price_sort_el.value =="high"){
        task.sort((a,b)=>{
            return -(a.price - b.price);
        })

    }else if(price_sort_el.value =="low"){
        task.sort((a,b)=>{
            return (a.price - b.price);
        })

    }
    
    // console.log(task);
    main_down.innerHTML=``;
    for(let i=0; i<task.length; i++){
        let card_html = `
        <a data-id="${task[i].id}" data-price="${task[i].price}" href="./product_detail.html?prd_number=${task[i].id}" title="${task[i].title}">
        <div class="down-in">
            <img src="${task[i].img}" alt="">
            <h5>${task[i].name}</h5>
            <h5 class="price">${task[i].price}</h5>
        </div>
        </a>`
        main_down.insertAdjacentHTML("beforeend",card_html);
    }
})

// 排序變更 end======================================================
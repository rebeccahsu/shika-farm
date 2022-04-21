// 套件================================
// import Splide from './vendors/splide.min.js';

document.addEventListener("DOMContentLoaded", function () {
	// 讀取資料==========================================
	// const editRule = /[prd_number=]\d{8}$/
	let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("prd_number");
	// console.log(id);
	// AJAX
	fetch("./php/product_load.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		// 送出內容轉成JSON送出
		body: JSON.stringify({
			ID: id,
		}),
	})
		// 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
		.then((resp) => resp.json())
		.then((body) => {
			//body也不可以console
			const { successful, message, data } = body;
			if (successful == true) {
				console.log(successful + "訊息" + message + "資料" + data);
				let bread = document.querySelector(".pd_bread");
				let kind = (data[0].PRODUCT_CATEGORY_ID = 1 ? "冷凍冷藏" : "日常用品");
				bread.innerText = `首頁 | ${kind} | ${data[0].NAME}`;
				putin_top_pic(data[0].MAIN_PIC);
				data_load(data);
				check_inStock();
			} else {
				console.log(successful + " 訊息" + message);
				let main = document.querySelector(".pd_main");
				main.innerHTML = `<div style="height:200px;text-align: center;display: flex;align-items: center;flex-direction:column-reverse;"><h3>sorry！找不到此商品！</h3></div>`;
			}
		});

	function data_load(data) {
		let pd_name = document.querySelector("#pd_info_name");
		pd_name.innerText = data[0].NAME;
		let slogn = document.querySelectorAll(".pd_info_slog");
		let slogan_text = JSON.parse(data[0].SLOGAN);
		slogn[0].innerText = slogan_text[0];
		slogn[1].innerText = slogan_text[1];
		// 商品規格
		let detail = document.querySelector("#pd_info_ingredient");
		detail.innerText = data[0].DETAIL;
		// 商品價錢
		let price = document.querySelector("#pd_info_pricr");
		price.innerText = data[0].UNIT_PRICE;
		// 商品庫存
		let stock = document.querySelector("#pd_inStock");
		stock.innerText = data[0].STOCK;
		// 商品介紹
		let intro = document.querySelector(".intro_area");
		let intro_text = JSON.parse(data[0].DESCRIPTION);
		// console.log(intro_text);
		for (let i = 0; i < intro_text.length; i++) {
			console.log(intro_text[i].src + " / " + intro_text[i].text);
			let intro_html = `<div class="pd_intro">
			<div class=" pd_intro_pic"><img src="${intro_text[i].src}" alt="">
			</div><p>${intro_text[i].text}</p></div>`;
			intro.insertAdjacentHTML("beforeend", intro_html);
		}
	}

	// 讀取資料end========================================

	let sp1 = $("#splide01").find(".splide__list");
	new Splide(".splide01").mount();
	sp1.on("change", function () {
		// 掛載套件=========
		var main_1 = new Splide(".splide01", {
			type: "splide",
			rewind: true,
			pagination: false,
			// arrows: false,
			// fixedHeight: 500,
			padding: { bottom: 10 },
			// マウスホイールによるスライダーの移動を有効
			wheel: true,
			releaseWheel: true,
		});

		var thumbnails_1 = new Splide("#thumbnail-slider1", {
			fixedWidth: 183,
			fixedHeight: 183,
			gap: 10,
			rewind: true,
			pagination: false,
			cover: true,
			isNavigation: false,
			arrows: false,
			padding: { top: 10, left: 0, right: 0 },
			breakpoints: {
				1200: {
					fixedWidth: 163,
					fixedHeight: 163,
				},
				992: {
					fixedWidth: 130,
					fixedHeight: 130,
					gap: 10,
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

	var main_2 = new Splide("#splide02", {
		fixedWidth: "90",
		autoHeight: true,
		type: "splide",
		rewind: true,
		pagination: true,
		arrows: true,
		gap: 20,
		padding: { bottom: 10 },
		mediaQuery: "min", //mediaQuery:'min'or'max'配合breakpoints: 尺寸
		// destroy: false,  //廢棄會將此段套件區塊會display:none
		breakpoints: {
			992: {
				drag: false,
			},
		},
	}).mount();

	if (window.innerWidth > 992) {
		removeSplide();
	}
});

// for resize
function addSplide() {
	$(".pd_recommend").children("div").attr("id", "splide02");
	$(".pd_recommend_list").parent("div").addClass("splide__track");
	$(".pd_recommend_list").addClass("splide__list");
	$(".pd_recommend_list").find("li").addClass("splide__slide");
}

function removeSplide() {
	$(".pd_recommend").children("div").removeAttr("id", "splide02");
	$(".pd_recommend_list").parent("div").removeClass("splide__track");
	$(".pd_recommend_list").removeClass("splide__list");
	$(".pd_recommend_list").find("li").removeClass("splide__slide");
}

$(window).on("resize", function () {
	// console.log(innerWidth);
	if (window.innerWidth > 992.98) {
		if ($(".pd_recommend").has("#splide02")) {
			removeSplide();
			// console.log("object");
		}
	} else {
		addSplide();
	}
});
// for resize end========================
function putin_top_pic(top_pic) {
	top_pic = JSON.parse(top_pic);
	console.log(top_pic);
	let sp1 = $("#splide01").find(".splide__list");
	top_pic.forEach((v) => {
		sp1.append(`<li class="splide__slide"><img src="${v}" alt=""></li>`);
	});

	let sp1_under = $("#thumbnail-slider1").find(".splide__list");
	$.each(top_pic, (i, v) => {
		sp1_under.append(`<li class="splide__slide"><img src="${v}" alt=""></li>`);
	});
}
// 套件與讀取資料end=========================================================

// 數量調整按鍵
var stockCount = document.querySelector("#pd_stockCount_input");
var inStock = document.querySelector("#pd_inStock");

$("#pd_stockCount_minus").on("click", (e) => {
	stockChack(-1);
});
$("#pd_stockCount_plus").on("click", (e) => {
	stockChack(+1);
});
$("#pd_stockCount_input").on("keyup", (e) => {
	// 濾除其他字
	var str = e.target.value.replace(/\D/g, "");
	console.log("keyin");
	if (str <= parseInt(inStock.innerText)) {
		stockCount.value = str;
	} else {
		stockCount.value = 1;
		alert("sorry! 超過在庫數量");
	}
});

function stockChack(el) {
	// -+按鈕
	// 當el= -1 檢查是否大於2
	switch (el) {
		case -1:
			// console.log("--");
			if (parseInt(stockCount.value) > 1) {
				stockCount.value = parseInt(stockCount.value) - 1;
			}
			break;
		// 當el = +1 檢查是否<庫存
		default:
			// console.log("++");
			if (parseInt(stockCount.value) < parseInt(inStock.innerText)) {
				stockCount.value = parseInt(stockCount.value) + 1;
			}
			break;
	}
}
// 數量調整按鍵end
// ==========================================

$("#pd_info_cart").on("click", (e) => {
	e.preventDefault();

	// 取得session已經存在的資料，判斷如果不存在就給個陣列
	let cart_data = JSON.parse(sessionStorage.getItem("products")) ?? [];
	// 取得頁面上商品詳細資訊
	let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("prd_number");
	let img = document.querySelector(".splide__list li img").getAttribute("src");
	let name = document.querySelector("#pd_info_name").innerText;
	let price = document.querySelector("#pd_info_pricr").innerText;
	let count = document.querySelector("#pd_stockCount_input").value;
	let product = {
		id: id,
		img: img,
		name: name,
		price: price,
		count: count,
	};

	console.log(product.id);
	// 預設商品不存在
	let isExist = false;
	// 檢查session裡是否已經存在該商品
	if (cart_data.length > 0) {
		for (let i = 0; i < cart_data.length; i++) {
			// 檢查商品id有沒有存在
			if (cart_data[i].id == product.id) {
				isExist = true;
				cart_data[i].count = Number(cart_data[i].count) + Number(product.count);
				break;
			}
		}
	}
	if(!isExist){
		// 假如不存在就把product丟進去
		cart_data.push(product);
	}
	sessionStorage.setItem("products", JSON.stringify(cart_data));
});

$("#pd_info_buy").on("click", (e) => {
	e.preventDefault();
	console.log("buy");
});

// 放入購物車、直接購買end
// ==========================================
// 庫存0時，停用按鈕、加入購物車和購買
// 沒有庫存時
function check_inStock() {
	if ($("#pd_inStock").text() == 0) {
		$("#pd_info_cart").attr(
			"style",
			"background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;"
		);
		$("#pd_info_buy").attr(
			"style",
			"background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;"
		);
		$(".pd_stockCount_btn").attr("disabled");
		$(".pd_stockCount_btn").attr(
			"style",
			"background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;"
		);
		$("#pd_stockCount_input").attr(
			"style",
			"background-color: #fff;  color: #ccc;  border: 1px dotted #ccc;"
		);
	}
}
//

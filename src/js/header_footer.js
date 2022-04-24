AOS.init();

// ==== 漢堡選單 ====

$(".ham_btn").on("click", function () {
	if ($(".hamSel").hasClass("-on")) {
		$(".ham_line").removeClass("-on");
		$(".hamSel").removeClass("-on");
		$(".hamMask").animate({ opacity: "0" }, { duration: "300" });

		setTimeout(function () {
			$(".hamMask").css({ display: "none" });
		}, 300);
		$(".hamMask").removeClass("-on");
	} else {
		// console.log(0);
		$(".ham_line").addClass("-on");
		$(".hamSel").addClass("-on");
		$(".hamMask").addClass("-on");
		// $(".hamMask").css({ display: "block" });

		$(".hamMask").animate({ opacity: "1" }, { duration: "300" });
		$(".hamMask").css({ display: "block" });
	}
});

$(".hamMask").on("click", function () {
	$(".ham_line").removeClass("-on");
	$(".hamSel").removeClass("-on");
	$(".hamMask").animate({ opacity: "0" }, { duration: "300" });

	setTimeout(function () {
		$(".hamMask").css({ display: "none" });
	}, 300);
	$(".hamMask").removeClass("-on");
});

new Vue({
	el: "#appMenu",
	data: {
		menus: [
			{
				title: "Sìkha動物",
				link: "./animal.html",
				icon: "./img/icon/animal_icon.png",
			},
			{
				title: "園區資訊",
				link: "./info.html",
				icon: "./img/icon/info_icon.png",
			},
			{
				title: "最新消息",
				link: "./news.html",
				icon: "./img/icon/news_icon.png",
			},
			{
				title: "牧場節目",
				link: "./activity.html",
				icon: "./img/icon/activity_icon.png",
			},
			{
				title: "周邊商品",
				link: "./products.html",
				icon: "./img/icon/products_icon.png",
			},
		],
	},
});

// ==== 漢堡選單結束 ====

// ==== footer 插圖動畫 ====
gsap.to([".tree1", ".tree2"], {
	repeat: -1,
	keyframes: [
		{ duration: 2, rotation: 3 },
		{ duration: 1, rotation: -3 },
		{ duration: 1, rotation: -10 },
	],
});

gsap.to([".cow1", ".cow2"], {
	repeat: -1,
	keyframes: [
		{ duration: 2, rotation: 3 },
		{ duration: 1, rotation: -3 },
		{ duration: 1, rotation: 10 },
	],
});
// ==== footer 插圖動畫結束 ====

// ==== 購物車 ====
// black_bg.created()
const black_bg = new Vue({
	el: ".blackBg",
	data: {
		products: [],
	},
	methods: {
		// 執行add這個function, index->陣列裡的第幾個物件 n->加1減1的值
		add(index, n) {
			// 如果按下加減後等於0
			if (this.products[index].count + n == 0) {
				return; // 就結束顯示預設數字 1
			}
			this.products[index].count += n; // 不然就可以做加減
			sessionStorage.setItem("products", JSON.stringify(this.products));
		},
		//點擊垃圾桶 刪除
		del(index) {
			this.products.splice(index, 1);
			sessionStorage.setItem("products", JSON.stringify(this.products));
			let cart_data = JSON.parse(sessionStorage.getItem("products"));
			
			// $(".cartCount").text(cart_data.length);
			if (cart_data != null){
				$(".cartCount").text(cart_data.length);
			}else{
				$(".cartCount").text(0);
			}
		},
		start_cart() {
			// 1.取出sessionStorage的資料, 字串轉成物件 // ??判斷是否為null如果是就用空陣列
			let cart = JSON.parse(sessionStorage.getItem("products")) ?? [];
			// 2.把資料放入data裡的products
			this.products = cart;
		},
		end_cart() {
			sessionStorage.setItem("products", JSON.stringify(this.products));
		},
		cartCount(){
			let cart_data = JSON.parse(sessionStorage.getItem("products"));
			if (cart_data != null){
				$(".cartCount").text(cart_data.length);
			}else{
				$(".cartCount").text(0);
			}
		},
	},

	//因為created()在網頁渲染完成後只會執行一次，所以1.2步驟拉出來放在一個函式裡，後續才可再使用
	created() {
		this.start_cart(); //執行這個vue裡的start_cart()函式
		this.cartCount();
	},
	computed: {
		// 總計 執行function
		sumTotal: function () {
			//預設 total=0
			let total = 0;
			// vue的products陣列執行foreach迴圈
			this.products.forEach((el) => {
				//陣列裡的物件執行這個涵式
				// 總計 = 物件的價格 * 物件的數量
				total += el.price * el.count;
			});
			//把值傳回sumTotal這個變數
			return total;
		},
		sumCount: function () {
			let count = 0;
			this.products.forEach((el) => {
				count = count + el.count;
			});
			return count;
		},
	},
});

// 購物車彈窗
let cart = document.getElementById("cart"); // 購物車按鈕
let spcart = document.getElementById("blackBg"); // 彈窗黑色遮罩
let gosp = document.getElementById("gosp"); // 繼續購物按鈕
let co = document.getElementsByClassName("Co")[0]; //結帳按鈕

// 點擊購物車icon讓購物車彈出
cart.addEventListener("click", function (e) {
	e.preventDefault(); //停止a連結預設行為
	if(location.href!="http://localhost/tfd105_g6/dist/checkout.html"){
		spcart.classList.toggle("active");
		black_bg.start_cart(); //在點擊後，在強制執行一次這個vue裡面的start_cart()函式
	}
});

// 點擊黑色遮罩讓購物車隱藏
spcart.addEventListener("click", function (e) {
	if (e.target == spcart) {
		//如果點擊到的是黑色遮罩
		spcart.classList.toggle("active"); //就讓購物車隱藏
	}
});

// 點擊繼續購物按鈕讓購物車隱藏
gosp.addEventListener("click", function (e) {
	spcart.classList.toggle("active");
	location.href="http://localhost/tfd105_g6/dist/products.html";
});

//點擊結帳按鈕執行end_cart()讓購物車裡的資料放入sessionStorage裡，讓結帳流程能抓到最新資料
co.addEventListener("click", function () {
	if(sessionStorage.getItem("login")){
		spcart.classList.toggle("active");
    	$("#login_box").removeClass("-off");
		$("#back_bg").removeClass("-off");
		location.href = 'checkout.html';
	}else{
		black_bg.end_cart();
		alert("購物車無商品");
	}
	
});

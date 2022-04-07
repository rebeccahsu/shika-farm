AOS.init();

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
        console.log(0);
        $(".ham_line").addClass("-on");
        $(".hamSel").addClass("-on");
        $(".hamMask").addClass("-on");
        // $(".hamMask").css({ display: "block" });

        $(".hamMask").animate({ opacity: "1" }, { duration: "300" });
        $(".hamMask").css({ display: "block" });

    };

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
    el: '#appMenu',
    data: {
        menus: [
            { title: 'Sìkha動物', link: './animal.html', icon: './img/icon/animal_icon.png' },
            { title: '園區資訊', link: './info.html', icon: './img/icon/info_icon.png' },
            { title: '最新消息', link: './news.html', icon: './img/icon/news_icon.png' },
            { title: '牧場節目', link: './activity.html', icon: './img/icon/activity_icon.png' },
            { title: '周邊商品', link: './products.html', icon: './img/icon/products_icon.png' },

        ],
    },
});

gsap.to(['.tree1', '.tree2'], {
    repeat: -1,
    keyframes: [
        { duration: 2, rotation: 3},
        { duration: 1, rotation: -3},
        { duration: 1, rotation: -10},
    ]
});

gsap.to(['.cow1', '.cow2'], {
    repeat: -1,
    keyframes: [
        { duration: 2, rotation: 3},
        { duration: 1, rotation: -3},
        { duration: 1, rotation: 10},
    ]
});


new Vue({
    el: '.blackBg',
    data:{
        products:[],
    },
    methods: {
		// 執行add這個function, index->陣列裡的第幾個物件 n->加1減1的值
		add(index, n) {
			// 如果按下加減後等於0
			if (this.products[index].quantity + n == 0) {
				return; // 就結束顯示預設數字 1
			}
			this.products[index].quantity += n; // 不然就可以做加減
		},
		//點擊垃圾桶 刪除
		del(index) {
			this.products.splice(index, 1);
			localStorage.setItem('products', JSON.stringify(this.products));
		},
    },
    created() {
		//  先假裝購物車有資料
		// let products = [
		// 	{
		// 		id: 0001,
		// 		img: "../img/porducts/blanket_g.jpg",
		// 		info: "羊毛毯(綠)",
		// 		price: 499,
		// 		quantity: 1,
		// 	},
		// 	{
		// 		id: 0002,
		// 		img: "./img/porducts/animal_cookies.jpg",
		// 		info: "動物餅乾",
		// 		price: 200,
		// 		quantity: 1,
		// 	},
		// ];

		// localStorage.setItem("products", JSON.stringify(products));
		

		// 1.取出localStorage的資料, 字串轉成物件 // ??判斷是否為null如果是就用空陣列
		let cart = JSON.parse(localStorage.getItem("products")) ?? [];
		// 2.把資料放入data裡的products
		this.products = cart;
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
				total += el.price * el.quantity;
			});
			//把值傳回sumTotal這個變數
			return total;
		},
        sumCount: function () {
			let count = 0;
			this.products.forEach((el) => {
				count = count + el.quantity;
			});
			return count;
		},
	},
});


//點擊購物車 icon 彈出
let cart = document.getElementById('cart');
let spcart = document.getElementById('blackBg');
let gosp = document.getElementById('gosp');
cart.addEventListener('click',function(e){
    e.preventDefault();
    spcart.classList.toggle('active');
});

spcart.addEventListener('click',function(e){
    if(e.target == spcart){
        spcart.classList.toggle('active');
    }
});

gosp.addEventListener('click',function(e){
    spcart.classList.toggle('active');
});



// this.isShow = !this.isShow;
// console.log(this.isShow);

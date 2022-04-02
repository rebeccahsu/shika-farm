new Vue({
	el: ".stepA",
	data: {
		products: [
			{
				id: 0001,
				img: "../img/porducts/blanket_g.jpg",
				info: "羊毛毯(綠)",
				price: 499,
				quantity: 1,
			},
			{
                id: 0002,
				img: "./img/porducts/animal_cookies.jpg",
				info: "動物餅乾",
				price: 200,
				quantity: 1,
			},
		],
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
        del(index){
            this.products.splice(index,1);
        },
	},
    computed:{
        // 總計 執行function
        sumTotal:function(){
            //預設 total=0
            let total = 0;
            // vue的products陣列執行foreach迴圈
            this.products.forEach(el => {
                //陣列裡的物件執行這個涵式
                // 總計 = 物件的價格 * 物件的數量
                total += el.price * el.quantity;
            });
            //把值傳回sumTotal這個變數
            return total;
        }
    }
});

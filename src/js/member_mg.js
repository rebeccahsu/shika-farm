//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function(page){
    if ( page.innerHTML == "會員查詢"){
        page.closest("a").classList.add("-on");
    }
});

new Vue({
	el: "#mb_table",
	data: {

		customers: [
	// 		{
	// 			id: 19832,
	// 			name: "王大明",
	// 			email: "wang_mien@gmail.com",
	// 			phone: "0910993300",
	// 			address: "台中市北屯區祥順十街25號",
	// 		},
	// 		{
	// 			id: 18752,
	// 			name: "蔡大頭",
	// 			email: "da_tou@gmail.com",
	// 			phone: "0988991457",
	// 			address: "臺北市南港區永吉路23號",
	// 		},
	// 		{
	// 			id: 23366,
	// 			name: "黃綠紅",
	// 			email: "yellow@gmail.com",
	// 			phone: "0953677159",
	// 			address: "臺南市中西區健康路34號",
	// 		},
	// 		{
	// 			id: 18745,
	// 			name: "謝蟹倪",
	// 			email: "3quuuu@gmail.com",
	// 			phone: "0988173664",
	// 			address: "桃園市中壢區嘉善街35號",
	// 		},
	// 		{
	// 			id: 32887,
	// 			name: "陳阿白",
	// 			email: "white111@gmail.com",
	// 			phone: "0931122566",
	// 			address: "宜蘭縣羅東鎮羅莊街5號",
	// 		},
	// 		{
	// 			id: 16732,
	// 			name: "林阿花",
	// 			email: "flower666@gmail.com",
	// 			phone: "0927554880",
	// 			address: "雲林縣東勢鄉嘉芳南路30號",
	// 		},
	// 		{
	// 			id: 29886,
	// 			name: "蕭西西",
	// 			email: "cc1122356@gmail.com",
	// 			phone: "0976559478",
	// 			address: "苗栗縣後龍鎮豐富七街25號",
	// 		},
	// 		{
	// 			id: 10023,
	// 			name: "沈戚戚",
	// 			email: "angry777@gmail.com",
	// 			phone: "0987487487",
	// 			address: "基隆市七堵區綠葉街33號",
	// 		},
	// 		{
	// 			id: 15948,
	// 			name: "高波羅",
	// 			email: "good007@gmail.com",
	// 			phone: "0954874874",
	// 			address: "高雄市路竹區延平路28號",
	// 		},
		],
	},
	created() {
		
	},
	mounted() {
		fetch("./php/member_mg.php")//連到 member_mg.php
		.then(res => res.json()) //fetch API中內建的json method來將json data轉換成javascript object，這個函式也是一個非同步的工作，會回傳一個promise object
		.then(res => this.customers = res) // 後端傳回來 經過你用json處理的資料 放進vue的customers裡
		// $.ajax({
		// 	type:'POST',
		// 	url:'../php/member_mg.php',
		// 	dataType:'json',
		// 	success: function(res){
		// 		console.log(res)
		// 	},
		// 	error: function(res) {
		// 		console.log(res)
		// 	},
		// });
	},
});

// ==== 會員搜尋 ====
$("#member_search").on("keyup", function() {
	let target = $(this).val();
	$(".mb_content").filter(function() {
	  $(this).toggle($(this).find('p').text().indexOf(target) > -1)
	});
});

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

		customers: [],
	},
	created() {
		
	},
	mounted() {
		fetch("./php/member_mg.php")//連到 member_mg.php
		.then(res => res.json()) //fetch API中內建的json method來將json data轉換成javascript object，這個函式也是一個非同步的工作，會回傳一個promise object
		.then(res => this.customers = res) // 後端傳回來 經過你用json處理的資料 放進vue的customers裡
	},
});

// ==== 會員搜尋 ====
$("#member_search").on("keyup", function() {
	let target = $(this).val();
	$(".mb_content").filter(function() {
	  $(this).toggle($(this).find('p').text().indexOf(target) > -1)
	});
});

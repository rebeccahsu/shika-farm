
//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function (page) {
    if (page.innerHTML == "訂單管理") {
        page.closest("a").classList.add("-on");
    }
});

new Vue({
    el: '#app',
    data: {
        // orders: [
        //     {
        //         ID: '1',
        //         ORDER_DATE: '1/13',
        //         MEMBER_ID: '13',
        //         TOTAL: '1000',
        //         LOGISTICS_STATE: '已送達',
        //     },

        // ],
        orders: [],
    },
    mounted() {
        fetch('./php/back_order.php')
            .then(res => res.json())
            .then(res => this.orders = res)
    },
    methods: {
        //===== 新刪修 =========
        returnOrder() {
            let checkbox = document.querySelectorAll(".check-order");
            let checked_arr = [];
            checkbox.forEach(box => {
                if (box.checked) {
                    let return_li = box.closest("li");
                    checked_arr.push(return_li);
                    //TODO: 確認付款狀態 分為退貨中及已取消
                    $(return_li).find(".order_condition").html("退貨中");
                    box.checked = false;
                }
            });
            // console.log(checked_arr[0]);
            if (confirm("確定退回 " + checked_arr.length + " 個訂單嗎？")) {
                alert("已退回 " + checked_arr.length + " 個訂單！");
            }
        },

        //出貨按鈕
        shipOrder() {
            let checkbox = document.querySelectorAll(".check-order");
            let checked_arr = [];
            checkbox.forEach(box => {
                if (box.checked) {
                    let return_li = box.closest("li");
                    checked_arr.push(return_li);
                    $(return_li).find(".order_condition").html("出貨中");
                    box.checked = false;
                }
            });
            // console.log(checked_arr[0]);
            if (confirm("確定出貨 " + checked_arr.length + " 個訂單嗎？")) {
                alert("已出貨 " + checked_arr.length + " 個訂單！");
            }
        },

        // ==== 訂單搜尋 ====
        searchOrder() {
            let target = $(this).val();
            $(".order-li").filter(() => {
                $(this).toggle($(this).text().indexOf(target) > -1)
            });
        },

        // ===== 詳情按鈕 ====
        orderInfo() {
            window.location.href = "./back_order_detail.html";
        },
    },
});

// $(function () {
//     //目前頁面亮燈
//     let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
//     pages.forEach(function (page) {
//         if (page.innerHTML == "訂單管理") {
//             page.closest("a").classList.add("-on");
//         }
//     });

//     //===== 新刪修 =========
//     let checkbox = document.querySelectorAll(".check-order");
//     function returnOrder() {
//         let checked_arr = [];
//         checkbox.forEach(function (box) {
//             if (box.checked) {
//                 let return_li = box.closest("li");
//                 checked_arr.push(return_li);
//                 //TODO: 確認付款狀態 分為退貨中及已取消
//                 $(return_li).find(".order_condition").html("退貨中");
//                 box.checked = false;
//             }
//         });
//         // console.log(checked_arr[0]);
//         if (confirm("確定退回 " + checked_arr.length + " 個訂單嗎？")) {
//             alert("已退回 " + checked_arr.length + " 個訂單！");
//         }

//     };

//     //退回按鈕
//     $("#return_order").on("click", function (e) {
//         returnOrder();
//     });

//     //出貨按鈕
//     $("#ship_order").on("click", function (e) {
//         let checked_arr = [];
//         checkbox.forEach(function (box) {
//             if (box.checked) {
//                 let return_li = box.closest("li");
//                 checked_arr.push(return_li);
//                 $(return_li).find(".order_condition").html("出貨中");
//                 box.checked = false;
//             }
//         });
//         // console.log(checked_arr[0]);
//         if (confirm("確定出貨 " + checked_arr.length + " 個訂單嗎？")) {
//             alert("已出貨 " + checked_arr.length + " 個訂單！");
//         }
//     });


//     // ==== 訂單搜尋 ====
//     $("#search_order").on("keyup", function () {
//         let target = $(this).val();
//         $(".order-li").filter(function () {
//             $(this).toggle($(this).text().indexOf(target) > -1)
//         });
//     });

//     // ===== 詳情按鈕 ====
//     $('#order-list').on("click", ".order_info", function () {
//         window.location.href = "./back_order_detail.html";
//     });


// });


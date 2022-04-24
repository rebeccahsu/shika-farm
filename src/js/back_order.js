
//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function (page) {
    if (page.innerHTML == "訂單管理") {
        page.closest("a").classList.add("-on");
    }
});

// sweetalert
function sAlert(msg, icon, btn) {
    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: true, // 確認按鈕（預設會顯示不用設定)
        confirmButtonText: btn, //　按鈕顯示文字
        confirmButtonAriaLabel: btn, // 網頁無障礙用
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕
        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
        customClass: {
            confirmButton: 'btn-yellow margintop_15 marginleft_2 marginright_2',
            cancelButton: 'btn-red margintop_15 marginleft_2 marginright_2'
        },
    })
}

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
        //退回按鈕
        returnOrder() {
            let checkbox = document.querySelectorAll(".check-order");
            console.log(checkbox);
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

            // 判斷是否有勾選的項目
            if (checked_arr.length > 0) {
                Swal.fire({
                    title: `<h5>您確定要退回 ${checked_arr.length} 筆訂單嗎？</h5>`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-green marginright_20',
                        cancelButton: 'btn-red'
                    },
                })
                    .then(function (res) {
                        if (res.value) {
                            checked_arr.forEach(function (li) {
                                let id = $(li).data('id');
                                fetch('./php/back_order_update_status.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: id,
                                        LOGISTICS_STATE: '退貨中',
                                    }),
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.successful) {
                                            $(act).addClass("-off");
                                            $(act).find(".state-text").html("未上架");
                                            sAlert(`<h5>已成功退回 ${checked_arr.length} 筆訂單！</h5>`, 'success', 'OK');
                                            checkbox.forEach(function (box) {
                                                if (box.checked) {
                                                    box.checked = false;
                                                }
                                            });
                                        } else {
                                            sAlert(`<h5>您所選的訂單皆已是退回狀態</h5>`, 'warning', 'OK');
                                        }
                                    });
                            });
                        };
                    });
            } else {
                sAlert(`<h5>您尚未勾選任何活動</h5>`, 'warning', 'OK');
            };

            // // console.log(checked_arr[0]);
            // if (confirm("確定退回 " + checked_arr.length + " 個訂單嗎？")) {
            //     alert("已退回 " + checked_arr.length + " 個訂單！");
            // }
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

            // 判斷是否有勾選的項目
            if (checked_arr.length > 0) {
                Swal.fire({
                    title: `<h5>您確定要出貨這 ${checked_arr.length} 筆訂單嗎？</h5>`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-green marginright_20',
                        cancelButton: 'btn-red'
                    },
                })
                    .then(function (res) {
                        if (res.value) {
                            checked_arr.forEach(function (li) {
                                let id = $(li).data('id');
                                fetch('./php/back_order_update_status.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: id,
                                        LOGISTICS_STATE: '出貨中',
                                    }),
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.successful) {
                                            $(act).removeClass("-off");
                                            $(act).find(".state-text").html("上架中");
                                            sAlert(`<h5>已成功出貨 ${checked_arr.length} 筆訂單！</h5>`, 'success', 'OK');
                                            checkbox.forEach(function (box) {
                                                if (box.checked) {
                                                    box.checked = false;
                                                }
                                            });
                                        } else {
                                            sAlert(`<h5>您所選的活動皆已是出貨狀態</h5>`, 'warning', 'OK');
                                        }
                                    });
                            });
                        };
                    });
            } else {
                sAlert(`<h5>您尚未勾選任何訂單</h5>`, 'warning', 'OK');
            };

            // // console.log(checked_arr[0]);
            // if (confirm("確定出貨 " + checked_arr.length + " 個訂單嗎？")) {
            //     alert("已出貨 " + checked_arr.length + " 個訂單！");
            // }
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


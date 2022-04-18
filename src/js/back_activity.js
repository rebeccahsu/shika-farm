//目前頁面
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function(page){
    if ( page.innerHTML == "活動管理"){
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
                        confirmButton: 'btn-yellow margintop_15',
                        cancelButton: 'btn-red margintop_15'
                    },
    })
}

// function onoffConfirm(title, text, result) {
//     Swal.fire({
//         title: title,
//         text: text,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: '確定',
//         cancelButtonText: '取消',
//         buttonsStyling: false,
//         customClass: {
//             confirmButton: 'btn-green',
//             cancelButton: 'btn-red'
//         },
//     }).then(function(res) {
//        if (res.value) {
//             // sAlert(`<h5>您已成功${result}個活動！</h5>`, 'success', 'OK');
//             result
//        }
//        else {
           
//        }
//     });
// }

new Vue({
    el: '#back_activity',
    // data: {
    //     activities: [
    //         { IMG: './img/activity/riding.jpg', NAME:'我要當牛仔', S1_START: '09:30', S1_END: '11:00', S2_START: '13:00~14:30', S3_START: '16:30~18:00', STATE: '上架中'},
    //         { IMG: './img/activity/pigrun.jpg', NAME:'小豬賽跑', S1_START: '10:00~10:30', S2_START: '13:00~13:30', S3_START: '15:00~15:30', STATE: '上架中' },
    //         { IMG: './img/activity/fur.jpg', NAME:'剃羊毛秀', S1_START: '09:30~10:30', S2_START: '14:00~15:00', S3_START: '17:00~18:00', STATE: '上架中' },
    //         { IMG: './img/activity/horseshow.jpg', NAME:'馬術秀', S1_START: '11:00~12:00', S2_START: '13:00~14:00', S3_START: '16:00~17:00', STATE: '未上架'},
    //         { IMG: './img/activity/alpacawalk.jpg', NAME:'草泥馬散步秀', S1_START: '10:30~11:30', S2_START: '13:30~14:30', S3_START: '15:30~16:30', STATE: '上架中' },
    //     ],
    // },
    data: {
        activities: [],
    },
    created() {
        fetch('./php/back_activity.php')
        .then(res => res.json())
        .then(res => this.activities = res)
        .then(res => {
            let on_arr = [];
            res.forEach(function(act){
                if (act.STATE == "未上架"){
                    let i = res.indexOf(act);
                    // console.log(i);
                    let offAct = document.querySelectorAll('.actList');
                    offAct[i].classList.add("-off");
                }else{
                    on_arr.push(act);
                }
            })
            let on_activity_count = document.querySelector(".actAvailable");
            on_activity_count.innerHTML = on_arr.length;

        })
    },
    methods: {
        // ==== 上架按鈕 ====
        onAct(){
            let checkbox = document.querySelectorAll(".check-act");
            let checked_arr  = [];
            checkbox.forEach(function(box){
                if (box.checked){
                    let on_li = box.closest(".actList");
                    checked_arr.push(on_li);
                    $(on_li).removeClass("-off");
                    $(on_li).find(".state-text").html("上架中");
                    box.checked = false;
                }
            });
            // console.log(checked_arr[0]);
            sAlert(`<h5>已成功上架 ${checked_arr.length} 個活動！</h5>`, 'success', 'OK');
            function checkAvailability (){
                let activity_li = document.querySelectorAll(".actList");
                let on_activity = [];
                activity_li.forEach(function(li){
                    if ( ! li.classList.contains("-off")){
                        on_activity.push(li);
                    }
                })
                // console.log(on_activity.length);
                let on_activity_count = document.querySelector(".actAvailable");
                on_activity_count.innerHTML = on_activity.length;
            }
            checkAvailability();
        },
        // ==== 下架按鈕 ====
        offAct(){
            let checkbox = document.querySelectorAll(".check-act");
            let checked_arr  = [];
            // checkbox.forEach(function(box){
            //     if (box.checked){
            //         let off_li = box.closest(".actList");
            //         checked_arr.push(off_li);
            //         $(off_li).addClass("-off");
            //         $(off_li).find(".state-text").html("未上架");
            //         box.checked = false;
            //     }
            // });
            // onoffConfirm(`<h5>您確定要下架 ${checked_arr.length} 個活動嗎？</h5>`, '', `下架 ${checked_arr.length} `);
            // sAlert(`<h5>已成功下架 ${checked_arr.length} 個活動！</h5>`, 'success', 'OK');
            function onoffConfirm() {
                Swal.fire({
                    title: `<h5>您確定要下架 ${checked_arr.length} 個活動嗎？</h5>`,
                    // text: text,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-green',
                        cancelButton: 'btn-red'
                    },
                }).then(function(res) {
                   if (res.value) {
                       checkbox.forEach(function(box){
                           if (box.checked){
                               let off_li = box.closest(".actList");
                               checked_arr.push(off_li);
                               $(off_li).addClass("-off");
                               $(off_li).find(".state-text").html("未上架");
                               box.checked = false;
                            }
                        });
                        sAlert(`<h5>您已成功下架${checked_arr.length}個活動！</h5>`, 'success', 'OK');
                        console.log(111);
                   }
                   else {
                       
                   }
                });
            };
            onoffConfirm();
            function checkAvailability (){
                let activity_li = document.querySelectorAll(".actList");
                let on_activity = [];
                activity_li.forEach(function(li){
                    if ( ! li.classList.contains("-off")){
                        on_activity.push(li);
                    }
                })
                // console.log(on_activity.length);
                let on_activity_count = document.querySelector(".actAvailable");
                on_activity_count.innerHTML = on_activity.length;
            }
            checkAvailability();
        },
        // ==== 刪除按鈕 ====
        deleteAct(){
            let checkbox = document.querySelectorAll(".check-act");
            checkbox.forEach(function(box){
                if (box.checked){
                    let del_li = box.closest(".actList");
                    $(del_li).addClass("fade_out");
    
                    setTimeout(function(){
                        del_li.remove();
                    }, 1000);
                }
            });
        },
        // ==== 顯示已上架按鈕 ====
        switchShow(){
            let activity_li = document.querySelectorAll(".actList");
            let switch_button = document.querySelector(".show-switch-btn");
            if ( switch_button.checked ){
                activity_li.forEach(function(li){
                    li.style.display = 'flex';
                })
            }else{
                activity_li.forEach(function(li){
                    if (li.classList.contains("-off")){
                        li.style.display = 'none';
                    }
                })
            }
        },
        // ==== 修改按鈕 ====
        modifyActivity(e){
            let targetId = $(e.target).closest('li').data('actid');
            location.href = `./back_activity_modify.html?activity_id=${targetId}`;
        },
        // ==== 已報名會員按鈕 ====
        signedMembers(){
            // const params = new URLSearchParams(location.search);
            // let id = params.get('activity_id');
            // console.log(id);
        },
            
    },
});

new Vue({
    el: '.act-member-overlay',
    data: {
        // activity: [
        //     { name:'我要當牛仔', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00'},  
        // ],
        dates: ["2022/05/01", "2022/05/02", "2022/05/03"],
        members: [
            {id: '20', people: '3', time: '2022/03/15 18:22'},
            {id: '3', people: '5', time: '2022/03/12 09:32'},
        ],
    },
    created(){
        fetch('./php/activity_signed_members.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {id: id}
            ),
        })
        .then(res => res.json())
        .then(res => this.activity = res)
        .then(() => {
            if(this.activity[0].STATE == "上架中"){
                this.stateCheck = true;
            }else{
                this.stateCheck = false;
            }
        })
    },
});


$(function() {
    // checkAvailability();  
    //overlay
    document.addEventListener("click", function(e){
        if( e.target.classList.contains("member_btn") ){
            let activity_li = e.target.closest(".act-content");
            let all_time = activity_li.querySelectorAll(".activity-time");
            let overlay_time = document.querySelectorAll(".o-time");
            
            for(i = 0; i < all_time.length; i++){
                overlay_time[i].innerHTML = all_time[i].innerHTML;
            };
        }
    });
    
    $('.x-btn').on("click", function(){
        $('.act-member-overlay').removeClass('-on');
        $('.act-mask').removeClass('-on');
    });

    $('.act-mask').on("click", function(){
        $('.act-member-overlay').removeClass('-on');
        $('.act-mask').removeClass('-on');
    });

    
    $("ul").on("click", ".member_btn", function(e){
        $('.act-member-overlay').addClass('-on');
        $('.act-mask').addClass('-on');
        let name = $(this).closest(".act-content").find(".name").html();
        let all_time = $(this).closest(".act-content").find(".activity-time");
        $("h5.o-activity-title").html(name);
    });

});




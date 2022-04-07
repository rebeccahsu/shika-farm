new Vue({
    el: '.actLists',
    data: {
        activities: [
            { img: './img/activity/riding.jpg', name:'我要當牛仔', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '上架中', stateClass: ''},
            { img: './img/activity/pigrun.jpg', name:'小豬賽跑', timeI: '10:00~10:30', timeII: '13:00~13:30', timeIII: '15:00~15:30', state: '上架中' },
            { img: './img/activity/fur.jpg', name:'剃羊毛秀', timeI: '09:30~10:30', timeII: '14:00~15:00', timeIII: '17:00~18:00', state: '上架中' },
            { img: './img/activity/horseshow.jpg', name:'馬術秀', timeI: '11:00~12:00', timeII: '13:00~14:00', timeIII: '16:00~17:00', state: '已下架', stateClass: '-off' },
            { img: './img/activity/alpacawalk.jpg', name:'草泥馬散步秀', timeI: '10:30~11:30', timeII: '13:30~14:30', timeIII: '15:30~16:30', state: '上架中' },
        ],
    },
});

new Vue({
    el: '.act-member-overlay',
    data: {
        activity: [
            { name:'我要當牛仔', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00'},  
        ],
        dates: ["2022/04/08", "2022/04/09", "2022/04/10"],
        time: [
            {timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00'},
        ],
    },
});


$(function() {
    checkAvailability();
    //目前頁面
    let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
    pages.forEach(function(page){
        if ( page.innerHTML == "活動管理"){
            page.closest("a").classList.add("-on");
        }
    });
    
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

    //===== 新刪修 =========
    let checkbox = document.querySelectorAll(".check-act");
    function deleteChecked (){
        checkbox.forEach(function(box){
            if (box.checked){
                let del_li = box.closest(".actList");
                $(del_li).addClass("fade_out");

                setTimeout(function(){
                    del_li.remove();
                }, 1000);
            }
        });
    };

    function onChecked (){
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
        alert("已成功上架 " + checked_arr.length + " 個活動！");
    };

    function offChecked (){
        let checked_arr  = [];
        checkbox.forEach(function(box){
            if (box.checked){
                let off_li = box.closest(".actList");
                checked_arr.push(off_li);
                $(off_li).addClass("-off");
                $(off_li).find(".state-text").html("已下架");
                box.checked = false;
            }
        });
        alert("已成功下架 " + checked_arr.length + " 個活動！");
    };

    
    //上架中的活動
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

    function checkShowActivity (){
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
    }




    

    //修改按鈕
    $("ul").on("click", ".modify_btn", function(e){
        window.location.href = "../back_activity_modify.html";
        checkAvailability();
    });

    //新增按鈕
    $(".add-activity").on("click", function(e){
        window.location.href = "../back_activity_add.html";
        checkAvailability();
    });

    //刪除按鈕
    $(".delete-activity").on("click", function(e){
        deleteChecked();
        checkAvailability();
    });

    //上架按鈕
    $(".on-activity").on("click", function(){
        onChecked();
        checkAvailability();
    });

    //下架按鈕
    $(".off-activity").on("click", function(){
        offChecked();
        checkAvailability();
    });

    $(".show-switch-btn").on("click", function(){
        checkShowActivity();
    })
    
});


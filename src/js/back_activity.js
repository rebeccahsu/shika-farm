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

//overlay
$(function() {

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

});


new Vue({
    el: '.actLists',
    data: {
        activities: [
            { img: './img/activity/riding.jpg', name:'我要當牛仔', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '上架中', stateClass: ''},
            { img: './img/activity/pigrun.jpg', name:'小豬賽跑', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '上架中' },
            { img: './img/activity/fur.jpg', name:'剃羊毛秀', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '上架中' },
            { img: './img/activity/horseshow.jpg', name:'馬術秀', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '已下架', stateClass: '-off' },
            { img: './img/activity/alpacawalk.jpg', name:'草泥馬散步秀', timeI: '09:30~11:00', timeII: '13:00~14:30', timeIII: '16:30~18:00', state: '上架中' },
        ],
    },
});